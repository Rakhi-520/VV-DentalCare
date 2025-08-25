import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { api } from "@/lib/api";
import "./checkout.css";

function inr(n) {
  try {
    return n?.toLocaleString?.("en-IN", { style: "currency", currency: "INR" }) ?? `₹${n}`;
  } catch {
    return `₹${n}`;
  }
}

export default function PaymentCheckoutPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const amountParam = searchParams.get("amount");
  const defaultAmount = amountParam ? Number(amountParam) : 500;

  // form state
  const [amount, setAmount] = useState(defaultAmount);
  const [provider, setProvider] = useState("upi");     // 'upi' | 'stripe' | 'razorpay'
  const [method, setMethod] = useState("upi_qr");      // 'upi_qr' | 'card'

  // session / status
  const [creating, setCreating] = useState(false);
  const [session, setSession] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState("idle");        // idle | session | success | failed | error
  const [error, setError] = useState("");

  // dummy card inputs
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // pick correct method whenever provider flips
  useEffect(() => {
    if (provider === "upi") setMethod("upi_qr");
    else setMethod("card");
  }, [provider]);

  const canCreate = useMemo(
    () => Boolean(appointmentId && amount > 0 && provider && method),
    [appointmentId, amount, provider, method]
  );

  async function createSession() {
    setError("");
    if (!canCreate) {
      setError("Validation failed — missing appointmentId, amount, provider or method.");
      setStatus("error");
      return;
    }
    setCreating(true);
    try {
      const res = await api.post("/payments/session", {
        appointmentId,
        amount,
        provider,
        method,
      });
      const data = res.data?.data || res.data;
      setSession(data);
      setStatus("session");
    } catch (e) {
      setError(e?.response?.data?.message || "Could not create payment session.");
      setStatus("error");
    } finally {
      setCreating(false);
    }
  }

  async function confirmPayment(succeed = true) {
    if (!session?._id) return;
    setConfirming(true);
    setError("");
    try {
      await api.post(`/payments/${session._id}/confirm`, { succeed });
      setStatus(succeed ? "success" : "failed");
    } catch (e) {
      setError(e?.response?.data?.message || "Could not confirm payment.");
      setStatus("error");
    } finally {
      setConfirming(false);
    }
  }

  const showQR = provider === "upi" && method === "upi_qr" && session?.upiString;

  return (
    <div className="pay-wrap">
      <div className="pay-card">
        <header className="pay-header">
          <div>
            <h1 className="pay-title">Complete Your Payment</h1>
            <p className="pay-subtitle">
              Appointment <code className="pay-code">{appointmentId || "N/A"}</code>
            </p>
          </div>
          <div className="pay-badge">VV Dental Care</div>
        </header>

        {/* creator */}
        <section className="pay-section">
          <div className="pay-grid">
            <label className="pay-field">
              <span>Amount (INR)</span>
              <input
                type="number"
                min={1}
                className="pay-input"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
              />
            </label>

            <div className="pay-field">
              <span>Provider</span>
              <div className="pay-choice">
                <label className={`choice ${provider === "upi" ? "is-active" : ""}`}>
                  <input
                    type="radio"
                    name="provider"
                    checked={provider === "upi"}
                    onChange={() => setProvider("upi")}
                  />
                  <span>UPI (Google Pay / Paytm)</span>
                </label>
                <label className={`choice ${provider === "stripe" ? "is-active" : ""}`}>
                  <input
                    type="radio"
                    name="provider"
                    checked={provider === "stripe"}
                    onChange={() => setProvider("stripe")}
                  />
                  <span>Stripe</span>
                </label>
                <label className={`choice ${provider === "razorpay" ? "is-active" : ""}`}>
                  <input
                    type="radio"
                    name="provider"
                    checked={provider === "razorpay"}
                    onChange={() => setProvider("razorpay")}
                  />
                  <span>Razorpay</span>
                </label>
              </div>
            </div>

            <div className="pay-field">
              <span>Method</span>
              <div className="pay-choice">
                {provider === "upi" ? (
                  <label className="choice is-active">
                    <input type="radio" name="method" checked readOnly />
                    <span>UPI QR</span>
                  </label>
                ) : (
                  <label className="choice is-active">
                    <input type="radio" name="method" checked readOnly />
                    <span>Card</span>
                  </label>
                )}
              </div>
            </div>

            <div className="pay-field pay-cta">
              <button
                className="pay-btn"
                disabled={!canCreate || creating}
                onClick={createSession}
              >
                {creating
                  ? "Creating session…"
                  : provider === "upi"
                  ? "Create UPI session"
                  : `Create ${provider === "stripe" ? "Stripe" : "Razorpay"} session`}
              </button>
            </div>
          </div>

          {error && (
            <div className="pay-alert pay-alert--error" role="alert">
              {error}
            </div>
          )}
        </section>

        {/* session UI */}
        {status === "session" && (
          <section className="pay-section pay-session">
            <div className="pay-session__head">
              <h2>Pay {inr(amount)}</h2>
              <div className="pill">{provider.toUpperCase()}</div>
            </div>

            {/* UPI QR */}
            {showQR && (
              <div className="upi">
                <div className="upi__qr">
                  <QRCodeSVG value={session.upiString} size={220} />
                </div>
                <div className="upi__meta">
                  <p className="muted">Scan in Google Pay / Paytm and complete the payment.</p>
                  <div className="code">{session.upiString}</div>
                  <div className="actions">
                    <button
                      className="pay-btn success"
                      disabled={confirming}
                      onClick={() => confirmPayment(true)}
                    >
                      {confirming ? "Confirming…" : "I’ve Paid (Confirm)"}
                    </button>
                    <button
                      className="pay-btn ghost"
                      disabled={confirming}
                      onClick={() => confirmPayment(false)}
                    >
                      Payment Failed
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card (dummy) */}
            {provider !== "upi" && method === "card" && (
              <div className="card">
                <div className="card__form">
                  <div className="row">
                    <input
                      className="pay-input"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <input
                      className="pay-input"
                      placeholder="Card number (dummy)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="row duo">
                    <input
                      className="pay-input"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                    <input
                      className="pay-input"
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="pay-btn success"
                    disabled={confirming || !session?._id}
                    onClick={() => confirmPayment(true)}
                  >
                    {confirming ? "Processing…" : `Pay ${inr(amount)}`}
                  </button>
                  <button
                    className="pay-btn ghost"
                    disabled={confirming || !session?._id}
                    onClick={() => confirmPayment(false)}
                  >
                    Fail Payment
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {status === "success" && (
          <section className="pay-result success">
            <h3>Payment successful 🎉</h3>
            <p>Your appointment is now marked as paid and confirmed.</p>
          </section>
        )}

        {status === "failed" && (
          <section className="pay-result failed">
            <h3>Payment failed</h3>
            <p>You can try again, or choose another method.</p>
          </section>
        )}

        {status === "error" && (
          <section className="pay-result error">
            <p>{error}</p>
          </section>
        )}
      </div>
    </div>
  );
}

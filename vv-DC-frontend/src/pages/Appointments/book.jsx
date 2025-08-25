import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import "./book.css";

function toArray(x, keys = []) {
  let v = x ?? [];
  if (Array.isArray(v)) return v;
  for (const k of ["data", ...keys]) {
    if (v && Array.isArray(v[k])) return v[k];
  }

  for (const k of ["items", "results", "services", "doctors"]) {
    if (v && Array.isArray(v[k])) return v[k];
  }
  return [];
}

function buildSlots(start = 9, end = 18) {
  const out = [];
  for (let h = start; h <= end; h++) {
    for (const m of [0, 30]) {
      out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return out;
}

let SERVICES_CACHE = null;
let DOCTORS_CACHE = null;
const LS_KEY_SVCS = "bk_services_v1";
const LS_KEY_DOCS = "bk_doctors_v1";

export default function BookAppointmentPage() {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState(500);

  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reserved, setReserved] = useState([]);

  const [svcLoading, setSvcLoading] = useState(true);
  const [docLoading, setDocLoading] = useState(true);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const allSlots = useMemo(() => buildSlots(9, 18), []);
  const reservedSet = useMemo(() => new Set(reserved), [reserved]);
  const slotsUI = useMemo(
    () =>
      allSlots.map((t) => ({
        t,
        disabled: reservedSet.has(t),
        active: t === time,
      })),
    [allSlots, reservedSet, time]
  );

  const todayISO = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const svcAbort = new AbortController();
    const docAbort = new AbortController();

    try {
      if (!SERVICES_CACHE) {
        const saved = localStorage.getItem(LS_KEY_SVCS);
        const parsed = saved ? JSON.parse(saved) : null;
        if (Array.isArray(parsed)) SERVICES_CACHE = parsed;
        else localStorage.removeItem(LS_KEY_SVCS);
      }
      if (Array.isArray(SERVICES_CACHE) && SERVICES_CACHE.length) {
        setServices(SERVICES_CACHE);
        setSvcLoading(false);
      }
    } catch {
      localStorage.removeItem(LS_KEY_SVCS);
    }

    try {
      if (!DOCTORS_CACHE) {
        const saved = localStorage.getItem(LS_KEY_DOCS);
        const parsed = saved ? JSON.parse(saved) : null;
        if (Array.isArray(parsed)) DOCTORS_CACHE = parsed;
        else localStorage.removeItem(LS_KEY_DOCS);
      }
      if (Array.isArray(DOCTORS_CACHE) && DOCTORS_CACHE.length) {
        setDoctors(DOCTORS_CACHE);
        setDocLoading(false);
      }
    } catch {
      localStorage.removeItem(LS_KEY_DOCS);
    }

    // 2) refresh in background
    (async () => {
      try {
        const res = await api.get("/services", { signal: svcAbort.signal });
        const svcs = toArray(res?.data, ["services"]);
        SERVICES_CACHE = svcs;
        setServices(svcs);
        localStorage.setItem(LS_KEY_SVCS, JSON.stringify(svcs));
      } catch (e) {
        if (e?.name !== "CanceledError" && e?.name !== "AbortError") {
          console.error("services error:", e);
          if (!SERVICES_CACHE) setError("Failed to load services.");
        }
      } finally {
        setSvcLoading(false);
      }
    })();

    (async () => {
      try {
        const res = await api.get("/doctors", { signal: docAbort.signal });
        const docs = toArray(res?.data, ["doctors"]);
        DOCTORS_CACHE = docs;
        setDoctors(docs);
        localStorage.setItem(LS_KEY_DOCS, JSON.stringify(docs));
      } catch (e) {
        if (e?.name !== "CanceledError" && e?.name !== "AbortError") {
          console.error("doctors error:", e);
          if (!DOCTORS_CACHE) setError((p) => p || "Failed to load doctors.");
        }
      } finally {
        setDocLoading(false);
      }
    })();

    return () => {
      svcAbort.abort();
      docAbort.abort();
    };
  }, []);

  useEffect(() => {
    const aborter = new AbortController();
    async function loadReserved() {
      setTime("");
      if (!date) {
        setReserved([]);
        return;
      }
      setFetchingSlots(true);
      try {
        const params = { doctorId: doctorId || "", date };
        const res = await api.get("/appointments/booked", {
          params,
          signal: aborter.signal,
        });
        const list =
          res?.data?.data?.reserved ??
          res?.data?.reserved ??
          res?.data ??
          [];
        setReserved(Array.isArray(list) ? list : []);
      } catch (e) {
        if (e?.name !== "CanceledError" && e?.name !== "AbortError") {
          console.error("reserved error:", e);
          setError("Failed to load reserved time slots.");
        }
      } finally {
        setFetchingSlots(false);
      }
    }
    loadReserved();
    return () => aborter.abort();
  }, [doctorId, date]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setSubmitting(true);
    try {
      const body = {
        patientName,
        email,
        phone,
        serviceId,
        doctorId: doctorId || null,
        date,
        time,
        notes,
      };
      const res = await api.post("/appointments", body);
      const appt = res?.data?.data ?? res?.data;
      setSuccessMsg("Appointment created. Redirecting to payment…");
      setTimeout(() => {
        navigate(`/payments/checkout?appointmentId=${appt._id}&amount=${amount}`);
      }, 600);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to create appointment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bk-wrap">
      <div className="bk-card">
        <header className="bk-header">
          <div>
            <h1 className="bk-title">Book an Appointment</h1>
            <p className="bk-subtitle">
              Select your service, preferred doctor and time. You’ll pay securely on the next step.
            </p>
          </div>
          <div className="bk-badge">VV Dental Care</div>
        </header>

        <form onSubmit={submit} className="bk-form" aria-busy={svcLoading || docLoading}>
          {successMsg && <div className="bk-alert bk-alert--success">{successMsg}</div>}
          {error && <div className="bk-alert bk-alert--error">{error}</div>}

          {/* Patient */}
          <div className="bk-section">
            <h2 className="bk-section__title">Patient Details</h2>
            <div className="bk-grid">
              <label className="bk-field">
                <span>Full Name</span>
                <input
                  className="bk-input"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label className="bk-field">
                <span>Phone</span>
                <input
                  type="tel"
                  className="bk-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </label>

              <label className="bk-field">
                <span>Email</span>
                <input
                  type="email"
                  className="bk-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </label>
            </div>
          </div>

          <div className="bk-section">
            <h2 className="bk-section__title">Visit Details</h2>
            <div className="bk-grid">
              <label className="bk-field">
                <span>Service</span>
                <select
                  className="bk-input"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  required
                  disabled={svcLoading}
                  aria-busy={svcLoading}
                >
                  {!svcLoading && <option value="">Select a service</option>}
                  {svcLoading ? (
                    <option value="">Loading services…</option>
                  ) : Array.isArray(services) && services.length ? (
                    services.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.title || s.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No services available</option>
                  )}
                </select>
              </label>

              <label className="bk-field">
                <span>Doctor</span>
                <select
                  className="bk-input"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  disabled={docLoading}
                  aria-busy={docLoading}
                >
                  {!docLoading && <option value="">Any available</option>}
                  {docLoading ? (
                    <option value="">Loading doctors…</option>
                  ) : Array.isArray(doctors) && doctors.length ? (
                    doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.fullName || d.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No doctors found</option>
                  )}
                </select>
              </label>

              <label className="bk-field">
                <span>Date</span>
                <input
                  type="date"
                  className="bk-input"
                  value={date}
                  min={todayISO}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="bk-field">
              <span>Time</span>
              <div className="bk-slots">
                {fetchingSlots && <div className="bk-slots__loading">Checking availability…</div>}
                {!fetchingSlots &&
                  slotsUI.map(({ t, disabled, active }) => (
                    <button
                      type="button"
                      key={t}
                      className={`bk-slot ${active ? "is-active" : ""} ${disabled ? "is-disabled" : ""}`}
                      disabled={disabled}
                      onClick={() => setTime(t)}
                      aria-pressed={active}
                      aria-label={`Time ${t}${disabled ? " (Booked)" : ""}`}
                      title={disabled ? "Booked" : `Choose ${t}`}
                    >
                      {t}
                    </button>
                  ))}
              </div>
              <input type="hidden" value={time} readOnly />
              {!time && <div className="bk-hint">Select a time slot above</div>}
            </div>
          </div>

          <div className="bk-section">
            <h2 className="bk-section__title">Additional Info</h2>
            <label className="bk-field">
              <span>Notes (optional)</span>
              <textarea
                className="bk-input"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know before your visit?"
              />
            </label>
          </div>

          <div className="bk-summary">
            <label className="bk-field bk-field--amount">
              <span>Amount (₹)</span>
              <input
                type="number"
                min={1}
                className="bk-input"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
                required
              />
            </label>

            <button
              type="submit"
              className="bk-btn"
              disabled={
                submitting ||
                !patientName ||
                !email ||
                !phone ||
                !serviceId ||
                !date ||
                !time ||
                amount <= 0
              }
            >
              {submitting ? "Booking…" : "Book & Continue to Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

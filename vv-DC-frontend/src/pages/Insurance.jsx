import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Insurance.module.css";

const INSURERS = [
  "Star Health",
  "HDFC ERGO",
  "ICICI Lombard",
  "Care Health",
  "Niva Bupa",
  "Aditya Birla",
  "Tata AIG",
  "Medi Assist",                              
];

const COVERAGE = [
  {
    title: "Preventive Care",
    percent: "80–100%",
    items: ["Consultation",                                    "    Exam & X-rays", "Cleaning & Fluoride"],
  },
  {
    title: "Basic Restorative",
    percent: "60–80%",
    items: ["Fillings", "Simple Extractions", "Root Canal (anterior)"],
  },
  {
    title: "Major Procedures",
    percent: "40–60%",
    items: ["Crowns & Bridges", "Surgical Extractions", "Dentures"],
  },
  {
    title: "Orthodontics",
    percent: "Plan-specific",
    items: ["Braces", "Clear Aligners", "Retainers"],
  },
];

function Field({ label, htmlFor, children, hint, required }) {
  return (
    <label className={styles.field} htmlFor={htmlFor}>
      <span className={styles.label}>
        {label} {required && <em className={styles.req} aria-hidden="true">*</em>}
      </span>
      {children}
      {hint && <small className={styles.hint}>{hint}</small>}
    </label>
  );
}

export default function Insurance() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    insurer: "",
    memberId: "",
    dob: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const disabled = useMemo(
    () => !form.fullName || !form.phone || !form.insurer || !form.memberId,
    [form]
  );

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function onCheck(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    // Simulate a quick client-side check; wire this to your API later
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setResult({
      ok: true,
      text:
        "Your policy looks eligible for direct claim assistance. Our desk will verify limits and waiting periods and follow up via phone/SMS.",
    });
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Insurance & Payments</h1>
            <p className={styles.subtitle}>
              We work with leading insurers and provide direct claim assistance. Get a quick
              eligibility check in under a minute.
            </p>
            <div className={styles.heroCtas}>
              <a className={styles.btnPrimary} href="/appointment">Book an Appointment</a>
              <a className={styles.btnGhost} href="tel:+91XXXXXXXXXX">Call Insurance Desk</a>
            </div>
          </div>
          <div className={styles.heroCard} aria-label="Quick eligibility checker">
            <form onSubmit={onCheck} className={styles.cardForm}>
              <h2 className={styles.cardTitle}>Quick Eligibility Check</h2>
              <Field label="Full Name" htmlFor="fullName" required>
                <input
                  id="fullName"
                  className={styles.input}
                  value={form.fullName}
                  onChange={update("fullName")}
                  placeholder="e.g., Rohan Sharma"
                  required
                />
              </Field>

              <Field label="Phone" htmlFor="phone" required>
                <input
                  id="phone"
                  className={styles.input}
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="10-digit number"
                  required
                />
              </Field>

              <Field label="Insurer" htmlFor="insurer" required>
                <select
                  id="insurer"
                  className={styles.input}
                  value={form.insurer}
                  onChange={update("insurer")}
                  required
                >
                  <option value="">Select your insurer</option>
                  {INSURERS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Member/Policy ID"
                htmlFor="memberId"
                required
                hint="Find this on your e-card or policy document."
              >
                <input
                  id="memberId"
                  className={styles.input}
                  value={form.memberId}
                  onChange={update("memberId")}
                  placeholder="e.g., AB12C3456"
                  required
                />
              </Field>

              <Field label="Date of Birth" htmlFor="dob">
                <input
                  id="dob"
                  type="date"
                  className={styles.input}
                  value={form.dob}
                  onChange={update("dob")}
                />
              </Field>

              <button
                className={styles.btnPrimary}
                type="submit"
                disabled={submitting || disabled}
                aria-busy={submitting}
              >
                {submitting ? "Checking…" : "Check Eligibility"}
              </button>

              {result && (
                <div
                  className={`${styles.alert} ${result.ok ? styles.alertOk : styles.alertWarn}`}
                  role="alert"
                >
                  {result.text}
                </div>
              )}

              <p className={styles.disclaimer}>
                This is a preliminary check. Final approval depends on your insurer’s policy terms.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* INSURERS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>We Work With Major Insurers</h2>
          <p className={styles.sectionLead}>
            Cashless/claim assistance available. If your insurer isn’t listed, call us — we’ll guide
            you through reimbursements.
          </p>
          <ul className={styles.badges}>
            {INSURERS.map((n) => (
              <li key={n} className={styles.badge} aria-label={`Insurer: ${n}`}>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COVERAGE */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Typical Coverage Snapshot</h2>
          <div className={styles.grid}>
            {COVERAGE.map((c) => (
              <article key={c.title} className={styles.card}>
                <header className={styles.cardHeader}>
                  <h3>{c.title}</h3>
                  <span className={styles.pill}>{c.percent}</span>
                </header>
                <ul className={styles.list}>
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.note}>
            Note: Coverage varies by policy, sub-limits, waiting periods and exclusions. We’ll verify
            benefits before treatment and share an estimate.
          </p>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Documents You’ll Need</h2>
          <div className={styles.docs}>
            <div className={styles.docItem}>🪪 Photo ID</div>
            <div className={styles.docItem}>🪪 Insurance e-card / Policy copy</div>
            <div className={styles.docItem}>📄 Recent prescriptions / reports</div>
            <div className={styles.docItem}>🧾 Previous bills (if any)</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Insurance FAQ</h2>
          <Accordion
            items={[
              {
                q: "Do you support cashless treatment?",
                a: "Yes, for supported insurers and procedures. For others, we provide end-to-end reimbursement assistance.",
              },
              {
                q: "Will I know my out-of-pocket cost before treatment?",
                a: "Absolutely. After verification, we’ll share a written estimate with expected insurer contribution and your co-pay.",
              },
              {
                q: "Are orthodontics covered?",
                a: "Coverage is plan-specific. Many retail policies exclude orthodontics or cap it. We’ll check your policy and advise options.",
              },
              {
                q: "How long does claim approval take?",
                a: "Cashless pre-auth typically takes 1–2 business days once documents are complete; reimbursements vary by insurer.",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaWrap}>
        <div className={styles.containerCta}>
          <h2 className={styles.ctaTitle}>Need help with your policy?</h2>
          <p className={styles.ctaSub}>
            Our Insurance Desk can check benefits and handle paperwork for you.
          </p>
          <div className={styles.ctaBtns}>
            <a className={styles.btnPrimary} href="tel:+91XXXXXXXXXX">Call Now</a>
            <Link className={styles.btnGhost} to="/appointment">Book & Verify</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Simple, accessible accordion */
function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.accordion}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`${styles.accItem} ${isOpen ? styles.accOpen : ""}`}>
            <button
              className={styles.accBtn}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.q}</span>
              <span className={styles.accIcon}>{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <div className={styles.accPanel}>{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

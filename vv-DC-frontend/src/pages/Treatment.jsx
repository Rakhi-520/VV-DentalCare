import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Treatment.css";

const INR = (n) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/* -----------------------
   DATA: Easily extendable
   ----------------------- */
const INDIVIDUAL = [
  {
    id: "cleaning-polish",
    title: "Scaling + Polishing",
    tagline: "Sparkling clean in 30–45 mins",
    price: 1499,
    cutPrice: 1999,
    save: "Save 25%",
    features: [
      "Ultrasonic scaling (full mouth)",
      "Stain removal & polishing",
      "Oral hygiene kit",
      "Free consultation",
    ],
    icon: "🪥",
    popular: false,
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening (Clinic)",
    tagline: "Brighter smile, instantly",
    price: 4999,
    cutPrice: 6500,
    save: "Save ₹1,500",
    features: [
      "In-clinic whitening session",
      "Shade improvement up to 2–4 levels",
      "Sensitivity control gel",
      "Post-care guidance",
    ],
    icon: "✨",
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "root-canal",
    title: "Single-Sitting RCT",
    tagline: "Painless modern endodontics",
    price: 3999,
    cutPrice: 5500,
    save: "Save ₹1,500",
    features: [
      "Single-sitting root canal",
      "X-rays included",
      "Temporary filling",
      "Crown advice & plan",
    ],
    icon: "🦷",
    popular: false,
  },
  {
    id: "child-checkup",
    title: "Kids’ Dental Check-up",
    tagline: "Friendly care for little smiles",
    price: 799,
    cutPrice: 1200,
    save: "Save 33%",
    features: [
      "Comprehensive check-up",
      "Fluoride application",
      "Diet & habit counseling",
      "Toothbrushing training",
    ],
    icon: "🧸",
    popular: false,
  },
];

const COMBOS = [
  {
    id: "bride-groom",
    title: "Bride / Groom Smile Makeover",
    tagline: "Photoshoot-ready in 10–14 days",
    price: 12999,
    cutPrice: 16999,
    save: "Save ₹4,000",
    features: [
      "Scaling + polishing",
      "Teeth whitening (clinic)",
      "Minor shaping & cosmetic bonding",
      "Smile kit + touch-up",
    ],
    icon: "💍",
    popular: true,
    badge: "Wedding Special",
  },
  {
    id: "ortho-starter",
    title: "Aligner Starter Pack",
    tagline: "Clear aligners — easy start",
    price: 19999,
    cutPrice: 24999,
    save: "Save ₹5,000",
    features: [
      "Ortho consultation + scans",
      "Treatment planning",
      "Starter trays (retain/align)",
      "EMI options available",
    ],
    icon: "🧩",
    popular: false,
  },
  {
    id: "family-care",
    title: "Family Preventive Pack (2 Adults + 1 Kid)",
    tagline: "Annual care for the whole family",
    price: 5999,
    cutPrice: 7999,
    save: "Save ₹2,000",
    features: [
      "2× adult scaling + polish",
      "1× kids’ check-up + fluoride",
      "Diet & hygiene coaching",
      "Priority appointment slots",
    ],
    icon: "👨‍👩‍👧",
    popular: false,
  },
  /* NEW COMBO */
  {
    id: "implant-crown-value",
    title: "Implant + Crown Value Pack",
    tagline: "Stable bite & natural look",
    price: 44999,
    cutPrice: 52999,
    save: "Save ₹8,000",
    features: [
      "Single implant placement",
      "Crown (PFM/zirconia as advised)",
      "X-rays & planning",
      "Follow-up & maintenance guide",
    ],
    icon: "⚙️",
    popular: false,
  },
];

/* -----------------------
   PRESENTATION
   ----------------------- */
function PackageCard({ p }) {
  const hasCut = p.cutPrice && p.cutPrice > p.price;
  return (
    <article className={`pk_card ${p.popular ? "is-popular" : ""}`}>
      {p.badge && <div className="pk_badge">{p.badge}</div>}
      <div className="pk_icon" aria-hidden="true">{p.icon}</div>
      <h3 className="pk_title">{p.title}</h3>
      <p className="pk_tagline">{p.tagline}</p>

      <div className="pk_priceRow">
        <div className="pk_price">{INR(p.price)}</div>
        {hasCut && <div className="pk_cut">{INR(p.cutPrice)}</div>}
        {p.save && <div className="pk_save">{p.save}</div>}
      </div>

      <ul className="pk_features">
        {p.features.map((f, i) => (
          <li key={i}>
            <span className="dot" aria-hidden="true">•</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="pk_ctaRow">
        <Link
          to={`/appointments/book`}
          className="pk_btn"
          state={{ presetService: p.title }}
        >
          Book Now
        </Link>
        <Link to={`/appointments/book`} className="pk_btn pk_btn--ghost">
          Talk to Doctor
        </Link>
      </div>

      <div className="pk_meta">
        <span>UPI / Cards accepted</span>
        <span>Easy EMI available*</span>
      </div>
    </article>
  );
}

export default function Treatment() {
  const indRef = useRef(null);
  const comboRef = useRef(null);

  const scrollByCard = useCallback((ref, dir = 1) => {
    const row = ref.current;
    if (!row) return;
    // Compute one cell width + gap
    const cell = row.querySelector(".tp_cell");
    const styles = getComputedStyle(row);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 16;
    const width = cell ? cell.getBoundingClientRect().width : 320;
    row.scrollBy({ left: dir * (width + gap), behavior: "smooth" });
  }, []);

  return (
    <main className="tp_wrap">
      <header className="tp_head">
        <h1 className="tp_h1">Treatment Packages</h1>
        <p className="tp_sub">
          Explore our most-loved packages designed for comfort, results and value.
          Prices in INR. Inclusive of basic consultations unless noted.
        </p>
      </header>

      {/* INDIVIDUAL — slider row */}
      <section className="tp_section">
        <div className="tp_sectionHead">
          <h2>Individual Packages</h2>
          <div className="tp_rule" />
        </div>

        <div className="tp_scroller">
          <button
            className="tp_nav tp_nav--prev"
            aria-label="Scroll left"
            onClick={() => scrollByCard(indRef, -1)}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <ul ref={indRef} className="tp_row" role="list" aria-label="Individual packages">
            {INDIVIDUAL.map((p) => (
              <li key={p.id} className="tp_cell">
                <PackageCard p={p} />
              </li>
            ))}
          </ul>

          <button
            className="tp_nav tp_nav--next"
            aria-label="Scroll right"
            onClick={() => scrollByCard(indRef, 1)}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </section>

      {/* COMBO — slider row */}
      <section className="tp_section">
        <div className="tp_sectionHead">
          <h2>Combo Packages</h2>
          <div className="tp_rule" />
        </div>

        <div className="tp_scroller">
          <button
            className="tp_nav tp_nav--prev"
            aria-label="Scroll left"
            onClick={() => scrollByCard(comboRef, -1)}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <ul ref={comboRef} className="tp_row" role="list" aria-label="Combo packages">
            {COMBOS.map((p) => (
              <li key={p.id} className="tp_cell">
                <PackageCard p={p} />
              </li>
            ))}
          </ul>

          <button
            className="tp_nav tp_nav--next"
            aria-label="Scroll right"
            onClick={() => scrollByCard(comboRef, 1)}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </section>

      {/* FAQ (unchanged) */}
      <section className="tp_faq">
        <details>
          <summary>Are these prices all-inclusive?</summary>
          <p>
            Most packages include consultation. Complex cases may need extra diagnostics or add-ons
            (we’ll discuss before proceeding).
          </p>
        </details>
        <details>
          <summary>Do you offer EMI / UPI?</summary>
          <p>
            Yes. We support UPI (Google Pay / Paytm), cards and easy EMI on select treatments.
          </p>
        </details>
        <details>
          <summary>Can I customize a combo?</summary>
          <p>
            Absolutely. Speak to our doctor and we’ll tailor a plan that fits your goals and budget.
          </p>
        </details>
      </section>
    </main>
  );
}

import React from "react";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="wcu">
      <div className="wcu__container">
        <header className="wcu__header">
          <p className="wcu__eyebrow">Patient-first dentistry</p>
          <h2 className="wcu__title">Why Choose Us</h2>
          <p className="wcu__subtitle">
            Modern treatments, rigorous safety, and a calm experience—every visit.
          </p>
        </header>

        <ul className="wcu__grid" aria-label="Reasons patients choose our clinic">
          {/* Specialist Doctors */}
          <li className="wcu__card" tabIndex={0}>
            <div className="wcu__accent" aria-hidden="true"></div>

            <div className="wcu__iconWrap" aria-hidden="true">
              {/* Stethoscope icon */}
              <svg viewBox="0 0 24 24" className="wcu__icon">
                <path d="M7 3v6a4 4 0 1 0 8 0V3M7 9a5 5 0 0 1-5-5M15 9a5 5 0 0 0 5-5M12 13v5a4 4 0 0 0 8 0v-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3 className="wcu__cardTitle">Specialist Doctors</h3>
            <p className="wcu__cardText">
              Expert-led care using advanced diagnostics and modern technology.
            </p>

            <div className="wcu__chiprow" aria-hidden="true">
              <span className="wcu__chip">200+ reviews</span>
              <span className="wcu__chip">15+ yrs</span>
            </div>

            <span className="wcu__chevron" aria-hidden="true">→</span>
          </li>

          {/* Painless Dentistry */}
          <li className="wcu__card" tabIndex={0}>
            <div className="wcu__accent" aria-hidden="true"></div>

            <div className="wcu__iconWrap" aria-hidden="true">
              {/* Feather icon */}
              <svg viewBox="0 0 24 24" className="wcu__icon">
                <path d="M20 7c-3 0-7 2-9 4l-7 7h7l6-6c1-1 3-3 3-5 0-1-0-2 0-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 10l-8 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </div>

            <h3 className="wcu__cardTitle">Painless Dentistry</h3>
            <p className="wcu__cardText">
              Gentle techniques and advanced anesthesia for real comfort.
            </p>

            <div className="wcu__chiprow" aria-hidden="true">
              <span className="wcu__chip">Needle-light</span>
              <span className="wcu__chip">Calming care</span>
            </div>

            <span className="wcu__chevron" aria-hidden="true">→</span>
          </li>

          {/* Sterilization Protocols */}
          <li className="wcu__card" tabIndex={0}>
            <div className="wcu__accent" aria-hidden="true"></div>

            <div className="wcu__iconWrap" aria-hidden="true">
              {/* Shield check icon */}
              <svg viewBox="0 0 24 24" className="wcu__icon">
                <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3 className="wcu__cardTitle">Sterilization Protocols</h3>
            <p className="wcu__cardText">
              Hospital-grade disinfection with sealed, tracked instruments.
            </p>

            <div className="wcu__chiprow" aria-hidden="true">
              <span className="wcu__chip">ISO-grade</span>
              <span className="wcu__chip">UV + Autoclave</span>
            </div>

            <span className="wcu__chevron" aria-hidden="true">→</span>
          </li>

          {/* Same Day Implants */}
          <li className="wcu__card" tabIndex={0}>
            <div className="wcu__accent" aria-hidden="true"></div>

            <div className="wcu__iconWrap" aria-hidden="true">
              {/* Lightning/clock icon */}
              <svg viewBox="0 0 24 24" className="wcu__icon">
                <path d="M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3 className="wcu__cardTitle">Same Day Implants</h3>
            <p className="wcu__cardText">
              Immediate placement options for confident, same-day smiles.
            </p>

            <div className="wcu__chiprow" aria-hidden="true">
              <span className="wcu__chip">3D guided</span>
              <span className="wcu__chip">Fast recovery</span>
            </div>

            <span className="wcu__chevron" aria-hidden="true">→</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

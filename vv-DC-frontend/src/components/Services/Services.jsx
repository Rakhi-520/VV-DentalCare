import React, { useRef, useEffect, useCallback } from "react";
import "./Services.css";

import imgImplants from "../../assets/images/Our Services/dentalimplants.webp";
import imgInvisalign from "../../assets/images/Our Services/Invisalign.webp";
import imgRootCanal from "../../assets/images/Our Services/Rootcanals.webp";
import imgPediatric from "../../assets/images/Our Services/PaediatricDentistry.webp";
import imgOrthoDentistry from "../../assets/images/Our Services/OrthodonticDentistry.webp";
import imgSurgical from "../../assets/images/Our Services/SurgicalProcedures.webp";

export default function Services() {
  const trackRef = useRef(null);

  const services = [
    {
      id: "implants",
      title: "Dental Implants",
      blurb: "All-in replacement solutions for strong, natural-looking teeth.",
      img: imgImplants,
      alt: "Dental implant procedure equipment close-up",
      href: "/services/implants",
    },
    {
      id: "invisalign",
      title: "Invisalign / Aligners",
      blurb:
        "Practically invisible aligners for precise, comfortable straightening.",
      img: imgInvisalign,
      alt: "Person smiling with clear aligners",
      href: "/services/invisalign",
    },
    {
      id: "rootcanal",
      title: "Root Canals",
      blurb:
        "Gentle, modern endodontic therapy to save painful or infected teeth.",
      img: imgRootCanal,
      alt: "Dentist treating patient during root canal",
      href: "/services/root-canal",
    },
    {
      id: "pediatric",
      title: "Pediatric Dentistry",
      blurb: "Kid-friendly, preventive care that keeps little smiles healthy.",
      img: imgPediatric,
      alt: "Child at a pediatric dental checkup",
      href: "/services/pediatric",
    },
    {
      id: "orthodontic",
      title: "Orthodontic Dentistry",
      blurb: "Braces and modern appliances for confident, aligned smiles.",
      img: imgOrthoDentistry,
      alt: "Orthodontic dentistry with braces and appliances",
      href: "/services/orthodontic-dentistry",
    },
    {
      id: "surgical",
      title: "Surgical Procedures",
      blurb: "Safe, specialist surgeries using advanced techniques.",
      img: imgSurgical,
      alt: "Dental surgical procedure",
      href: "/services/surgical-procedures",
    },
  ];

  const scrollByOneCard = useCallback((dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".svc_card");
    const styles = getComputedStyle(el);
    const gap =
      parseFloat(styles.columnGap || styles.gap || "0") || 24;
    const width = card ? card.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (width + gap), behavior: "smooth" });
  }, []);

 
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") scrollByOneCard(1);
      if (e.key === "ArrowLeft") scrollByOneCard(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [scrollByOneCard]);

  return (
    <section id="services" className="svc_section" aria-labelledby="svc_title">

      <div className="svc_inner">
        <header className="svc_header">
          <p className="svc_eyebrow">Gentle Care for All Ages</p>
          <h2 id="svc_title" className="svc_title">
            Our Services
          </h2>
        </header>

        <div className="svc_carousel">
          <button
            className="svc_nav svc_nav--prev"
            aria-label="Scroll left"
            onClick={() => scrollByOneCard(-1)}
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <ul
            ref={trackRef}
            className="svc_track"
            aria-label="Dental services"
            role="list"
            tabIndex={0}
          >
            {services.map((s, idx) => (
              <li
                key={s.id}
                className="svc_card"
                tabIndex={-1}
                aria-posinset={idx + 1}
                aria-setsize={services.length}
              >
                <div className="svc_imgwrap" aria-hidden="true">
                  <img src={s.img} alt={s.alt} loading="lazy" />
                </div>

                <div className="svc_body">
                  <div className="svc_accent" aria-hidden="true" />
                  <h3 className="svc_cardTitle">{s.title}</h3>
                  <p className="svc_cardText">{s.blurb}</p>

                  <a className="svc_cta" href={s.href}>
                    <span>View </span>
                    <svg
                      className="svc_chev"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <button
            className="svc_nav svc_nav--next"
            aria-label="Scroll right"
            onClick={() => scrollByOneCard(1)}
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

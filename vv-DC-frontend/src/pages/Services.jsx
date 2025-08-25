import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Services.css";


import imgImplants from "../assets/images/Our Services/dentalimplants.webp";
import imgInvisalign from "../assets/images/Our Services/Invisalign.webp";
import imgRootCanal from "../assets/images/Our Services/Rootcanals.webp";
import imgPediatric from "../assets/images/Our Services/PaediatricDentistry.webp";
import imgOrthoDentistry from "../assets/images/Our Services/OrthodonticDentistry.webp";
import imgSurgical from "../assets/images/Our Services/SurgicalProcedures.webp";


const CATEGORIES = [
  {
    id: "cosmetic-care",
    title: "Cosmetic Care",
    items: [
      {
        title: "Invisalign / Aligners",
        blurb:
          "Practically invisible aligners for precise, comfortable straightening.",
        img: imgInvisalign,
        alt: "Person smiling with clear aligners",
        href: "/services/invisalign",
      },
      {
        title: "Orthodontic Dentistry",
        blurb:
          "Braces and modern appliances for confident, aligned smiles.",
        img: imgOrthoDentistry,
        alt: "Orthodontic dentistry with braces and appliances",
        href: "/services/orthodontic-dentistry",
      },
      {
        title: "Dental Implants",
        blurb:
          "All-in replacement solutions for strong, natural-looking teeth.",
        img: imgImplants,
        alt: "Dental implant procedure equipment close-up",
        href: "/services/implants",
      },
    ],
  },
  {
    id: "general-checkup",
    title: "General Check-up",
    items: [
      {
        title: "Root Canals",
        blurb:
          "Gentle, modern endodontic therapy to save painful or infected teeth.",
        img: imgRootCanal,
        alt: "Dentist treating patient during root canal",
        href: "/services/root-canal",
      },
      {
        title: "Surgical Procedures",
        blurb:
          "Safe, specialist surgeries using advanced techniques.",
        img: imgSurgical,
        alt: "Dental surgical procedure",
        href: "/services/surgical-procedures",
      },
    ],
  },
  {
    id: "kids-dentistry",
    title: "Kids' Dentistry",
    items: [
      {
        title: "Pediatric Dentistry",
        blurb:
          "Kid-friendly, preventive care that keeps little smiles healthy.",
        img: imgPediatric,
        alt: "Child at a pediatric dental checkup",
        href: "/services/pediatric",
      },
    ],
  },
];

function ServiceCard({ item }) {
  return (
    <article className="svcP_card">
      <div className="svcP_imgwrap" aria-hidden="true">
        <img src={item.img} alt={item.alt} loading="lazy" />
      </div>
      <div className="svcP_body">
        <h3 className="svcP_title">{item.title}</h3>
        <p className="svcP_text">{item.blurb}</p>
        <a className="svcP_cta" href={item.href}>
          Learn more
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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
    </article>
  );
}

export default function Services() {
  const { hash } = useLocation();

  // Smooth-scroll to the section when visited with /services#section
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <main className="servicesPage">
      <header className="svcP_header">
        <p className="svcP_eyebrow">Gentle Care for All Ages</p>
        <h1 className="svcP_h1">Our Services</h1>
        <p className="svcP_sub">
          Explore treatments by category. Click a card to learn more about a specific procedure.
        </p>
      </header>

      {CATEGORIES.map((cat) => (
        <section id={cat.id} key={cat.id} className="servicesSection">
          <div className="svcP_sectionHead">
            <h2 className="svcP_h2">{cat.title}</h2>
            <div className="svcP_rule" />
          </div>

          <div className="svcP_grid">
            {cat.items.map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

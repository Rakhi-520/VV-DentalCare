import React from "react";
import { useParams, Link } from "react-router-dom";
import { cases } from "../cases.js";                
import BeforeAfter from "../components/CaseGallery/CaseCarousel.jsx";
import "./CaseDetail.css";

export default function CaseDetail() {
  const { id } = useParams();
  const item = cases.find((c) => c.id === id && c.consent);

  if (!item) {
    return (
      <section className="cd_section">
        <div className="cd_inner">
          <h2 className="cd_title">Case not found</h2>
          <Link className="cd_back" to="/cases">← Back to Gallery</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cd_section" aria-labelledby="cd_title">
      <div className="cd_inner">
        <Link className="cd_back" to="/cases">← Back to Gallery</Link>
        <h1 id="cd_title" className="cd_title">{item.title}</h1>
        <p className="cd_meta"><strong>Procedure:</strong> {item.procedure}</p>
        {item.date && <p className="cd_meta"><strong>Date:</strong> {item.date}</p>}
        <div className="cd_compare">
          <BeforeAfter
            before={item.beforeSrc}
            after={item.afterSrc}
            altBefore={item.altBefore}
            altAfter={item.altAfter}
            initial={55}
          />
        </div>
        {item.blurb && <p className="cd_blurb">{item.blurb}</p>}
        <p className="cd_disclaimer">Published with patient consent. Results vary per patient.</p>
      </div>
    </section>
  );
}

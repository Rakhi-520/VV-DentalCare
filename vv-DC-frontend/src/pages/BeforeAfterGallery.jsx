import React, { useMemo, useState } from "react";
import { cases } from "../cases.js"; 
import CaseCard from "../components/CaseGallery/CaseCard.jsx";
import "./BeforeAfterGallery.css";

export default function BeforeAfterGallery() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  // --- SMOKE TEST: show that we received data
  const got = Array.isArray(cases) ? cases.length : 0;

  const categories = useMemo(() => {
    const src = (cases || []).filter((c) => c.consent);
    return ["All", ...Array.from(new Set(src.map((c) => c.category)))];
  }, []);

  const list = useMemo(() => {
    const base = (cases || []).filter((c) => c.consent);
    return base.filter(
      (c) =>
        (cat === "All" || c.category === cat) &&
        (q.trim() === "" ||
          (c.title + c.procedure + (c.blurb || ""))
            .toLowerCase()
            .includes(q.toLowerCase()))
    );
  }, [q, cat]);

  return (
    <section className="bag_section" aria-labelledby="bag_title">
      <div className="bag_inner">
        <h2 id="bag_title" className="bag_title">Before &amp; After Gallery</h2>
        <p className="bag_sub">Real patient outcomes (with consent). Individual results vary.</p>

        {/* --- SMOKE BAR: this should always show something */}
        <div style={{
          background:"#eef6ff", border:"1px solid #cfe3ff", padding:8,
          borderRadius:8, margin:"8px 0 16px", fontSize:12, color:"#1d4c82"
        }}>
          Route OK · cases loaded: <b>{got}</b> · filter: <b>{cat}</b>
        </div>

        <div className="bag_controls">
          <input
            className="bag_search"
            type="search"
            placeholder="Search cases (e.g., implant, aligners)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search cases"
          />
          <select
            className="bag_select"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* --- If nothing to render, show a helpful note */}
        {list.length === 0 && (
          <div style={{padding:"12px 0", color:"#475569"}}>
            No cases match the current filters. Ensure your <code>cases</code> data has
            <code> consent: true</code> and correct categories.
          </div>
        )}

        {/* --- Quick titles list (always renders if data exists) */}
        {got > 0 && (
          <ul style={{margin:"4px 0 12px", paddingLeft:18, color:"#334155", fontSize:13}}>
            {list.slice(0, 5).map((c) => <li key={`t_${c.id}`}>{c.title}</li>)}
          </ul>
        )}

        <ul className="bag_grid" role="list">
          {list.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

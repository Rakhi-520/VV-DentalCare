import React, { useEffect, useRef, useState } from "react";
import "./BeforeAfter.css";

export default function BeforeAfter({ before, after, altBefore, altAfter, initial = 50 }) {
  const [pos, setPos] = useState(initial);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let dragging = false;

    const start = () => (dragging = true);
    const end = () => (dragging = false);
    const move = (e) => {
      if (!dragging) return;
      const rect = el.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, pct)));
    };

    el.addEventListener("mousedown", start);
    window.addEventListener("mouseup", end);
    el.addEventListener("mousemove", move);
    el.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end);
    el.addEventListener("touchmove", move, { passive: true });

    return () => {
      el.removeEventListener("mousedown", start);
      window.removeEventListener("mouseup", end);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
      el.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <div className="ba_wrap" ref={wrapRef} aria-label="Before and after comparison">
      <img className="ba_img" src={before} alt={altBefore || "Before"} loading="lazy" />
      <div className="ba_after" style={{ width: `${pos}%` }}>
        <img className="ba_img" src={after} alt={altAfter || "After"} loading="lazy" />
      </div>

      <div className="ba_handle" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="ba_bar" />
        <span className="ba_knob" />
      </div>

      <input
        className="ba_range"
        type="range"
        min="0"
        max="100"
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal after image"
      />

      <div className="ba_labels" aria-hidden="true">
        <span>Before & After</span> 
      </div>
    </div>
  );
}

import React, { useRef, useCallback, useMemo } from "react";
import "./CaseCarousel.css";

const files = import.meta.glob(
  "/src/assets/images/**/*.{webp,jpg,jpeg,png}",
  { eager: true, query: "?url", import: "default" }
);

const allowedFilenames = new Set([
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "7.webp",
  "8.webp",
]);


const imageMeta = {
  "1.webp": {
  title: "Full Mouth Rehabilitation",
  subtitle: "Before: Damaged teeth\nAfter: Restored smile",
},
  "2.webp": {
    title: "Dental Implants",
    subtitle: "Before: Missing front teeth\nAfter: Natural implant restoration",
  },
  "3.webp": {
    title: "Teeth Whitening",
    subtitle: "Before: Severe discoloration\nAfter: Bright white smile",
  },
  "4.webp": {
    title: "Orthodontic Correction",
    subtitle: "Before: Misaligned teeth\nAfter: Straightened bite",
  },
  "5.webp": {
    title: "Gum Treatment",
    subtitle: "Before: Inflamed gums\nAfter: Healthy gums",
  },
  "6.webp": {
    title: "Crown & Bridge",
    subtitle: "Before: Broken teeth\nAfter: Functional crowns",
  },
  "7.webp": {
    title: "Smile Makeover",
    subtitle: "Before: Uneven smile\nAfter: Harmonized aesthetics",
  },
  "8.webp": {
    title: "Root Canal Therapy",
    subtitle: "Before: Infected tooth\nAfter: Pain-free restoration",
  },
};

function buildItems() {

  const list = Object.entries(files)
    .map(([path, url], idx) => {
      const filename = path.split("/").pop() || `Image-${idx + 1}`;
      return { path, url, filename };
    })
    .filter((f) => allowedFilenames.has(f.filename))
    .map((f, idx) => {
      const meta = imageMeta[f.filename] || {
        title: `Case ${idx + 1}`,
        subtitle: f.filename,
      };
      return {
        id: idx + 1,
        title: meta.title,
        subtitle: meta.subtitle,
        src: f.url,
        alt: f.filename,
        filename: f.filename,
      };
    });

  
  return list.sort((a, b) => a.filename.localeCompare(b.filename));
}

export default function CaseCarousel() {
  const trackRef = useRef(null);
  const items = useMemo(() => buildItems(), []);

  const scrollByOneCard = useCallback((dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".cc_card");
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 20;
    const width = card ? card.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (width + gap), behavior: "smooth" });
  }, []);

  return (
    <section className="cc_section" aria-labelledby="cc_title">
      <div className="cc_wrapper">
        <header className="cc_header">
          <div>
            <p className="cc_eyebrow">Real Results</p>
            <h2 id="cc_title" className="cc_title">Before &amp; After</h2>
          </div>
          <div className="cc_nav">
            <button
              className="cc_btn"
              aria-label="Previous"
              onClick={() => scrollByOneCard(-1)}
              type="button"
            >
              ‹
            </button>
            <button
              className="cc_btn"
              aria-label="Next"
              onClick={() => scrollByOneCard(1)}
              type="button"
            >
              ›
            </button>
          </div>
        </header>

        {items.length === 0 ? (
          <div style={{ padding: "20px 8px", color: "#6b7280" }}>
            No images found. Make sure your files are under <code>src/assets/images/</code>.
          </div>
        ) : (
          <ul
            ref={trackRef}
            className="cc_track"
            role="list"
            aria-label="Image carousel"
          >
            {items.map((it, i) => (
              <li
                key={it.id}
                className="cc_card"
                tabIndex={0}
                aria-posinset={i + 1}
                aria-setsize={items.length}
              >
                <div className="cc_media">
                  <img src={it.src} alt={it.alt} loading="lazy" />
                </div>
                <div className="cc_body">
                  <h3 className="cc_cardTitle">{it.title}</h3>
                  <p className="cc_note">{it.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Services/Services.css";

export default function BlogCarousel({ blogs = [], linkBase = "/blogs" }) {
  const trackRef = useRef(null);
  const items = Array.isArray(blogs) ? blogs : [];

  
  const scrollByOneCard = useCallback((dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".svc_card");
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 24;
    const width = card ? card.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (width + gap), behavior: "smooth" });
  }, []);

  // Keyboard support
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

  if (items.length === 0) {
    return (
      <div className="svc_carousel">
        <div className="svc_track" style={{ padding: 24 }}>
          <div className="svc_card" style={{ minWidth: 320 }}>
            <div className="svc_body">
              <div className="svc_accent" aria-hidden="true" />
              <h3 className="svc_cardTitle">No posts yet</h3>
              <p className="svc_cardText">
                Add blogs to <code>@/utils/blogs</code> or pass a non-empty
                <code> blogs </code> prop.
              </p>
              <span className="svc_cta" aria-hidden="true">
                <span>Read</span>
                <svg className="svc_chev" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="svc_carousel">
      {/* Left arrow */}
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

      {/* Track */}
      <ul
        ref={trackRef}
        className="svc_track"
        aria-label="Blog posts"
        role="list"
        tabIndex={0}
      >
        {items.map((p, idx) => {
          const img = p.image || p.img;
          const alt = p.alt || p.title || "Blog cover";
          const slugOrId = p.slug || p.id;
          const to = slugOrId ? `${linkBase}/${slugOrId}` : "#";
          const blurb = p.excerpt || p.blurb || "";

          return (
            <li
              key={p.id ?? idx}
              className="svc_card"
              tabIndex={-1}
              aria-posinset={idx + 1}
              aria-setsize={items.length}
            >
           
              <div className="svc_imgwrap" aria-hidden="true">
                {to !== "#" ? (
                  <Link to={to} aria-label={`Open ${p.title}`}>
                    {img ? (
                      <img src={img} alt={alt} loading="lazy" />
                    ) : (
                      <div style={{ height: "100%", background: "#eef2ff" }} />
                    )}
                  </Link>
                ) : img ? (
                  <img src={img} alt={alt} loading="lazy" />
                ) : (
                  <div style={{ height: "100%", background: "#eef2ff" }} />
                )}
              </div>

              <div className="svc_body">
                <div className="svc_accent" aria-hidden="true" />
              
                {to !== "#" ? (
                  <Link to={to} className="svc_cardTitle">
                    {p.title}
                  </Link>
                ) : (
                  <h3 className="svc_cardTitle">{p.title}</h3>
                )}

                {blurb && <p className="svc_cardText">{blurb}</p>}

                {/* CTA */}
                {to !== "#" ? (
                  <Link className="svc_cta" to={to}>
                    <span>Read</span>
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
                  </Link>
                ) : (
                  <span className="svc_cta" aria-hidden="true">
                    <span>Read</span>
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
                  </span>
                )}
              </div>
            </li>
          );
        })}
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
  );
}

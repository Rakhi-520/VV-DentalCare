import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import heroImage from "../../assets/images/Hero.png";
import "./Hero.css";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const nav = el.querySelector(".hero__topNav");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) nav.classList.add("is-solid");
        else nav.classList.remove("is-solid");
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero hero--fullbleed" ref={heroRef}>
      <div className="hero__overlay">
        <img src={heroImage} alt="Hero section" className="hero__img" />

        {/* Top nav inside hero */}
        <div className="hero__topNav">
          <Link to="/" className="heroBrand" onClick={() => setOpen(false)}>
            <span className="heroBrand__icon" aria-hidden="true">🦷</span>
            <span className="heroBrand__name">VV Dental Care</span>
          </Link>

          <button
            className="heroNav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span></span><span></span><span></span>
          </button>

          <nav className={`heroNav ${open ? "heroNav--open" : ""}`}>
            <Link
              to="/"
              className={`heroNav__link ${location.pathname === "/" ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/treatment-packages"
              className={`heroNav__link ${location.pathname === "/treatment-packages" ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Treatment Packages
            </Link>
            <Link
              to="/services"
              className={`heroNav__link ${location.pathname === "/services" ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
           <Link
           to="/blog"
           className={`heroNav__link ${location.pathname === "/blog" ? "is-active" : ""}`}
           onClick={() => setOpen(false)}
           >
           Blogs
          </Link>            
            <Link
              to="/doctors"
              className={`heroNav__link ${location.pathname === "/doctors" ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Doctors
            </Link>
          </nav>
        </div>

        {/* Left title */}
        <div className="hero__topLeft">
          <h1 className="hero__title">
            Specialist care <br /> for a
            Confident, <br /> Smile
          </h1>
        </div>

        {/* Left actions */}
        <div className="hero__bottomLeft">
          <div className="hero__actions">
            <div className="hero__buttons">
              {/* Route to the booking page we created */}
              <Link to="/appointments/book" className="btn-primary">
                Book an Appointment
              </Link>
              <Link to="/emergency" className="btn-secondary">
                Emergency Care
              </Link>
            </div>

            <div className="spacer" />

            <a
              className="website"
              href="https://www.vvdentalcare.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="website__icon" aria-hidden="true">🌐</span>
              <div className="website__text">
                <div className="website__label">Visit Website</div>
                <div className="website__url">www.vvdentalcare.com</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right services quick-links */}
        <div className="hero__bottomRight">
          <h2 className="services__title">Our Services:</h2>
          <div className="services__grid">
            <Link to="/services#cosmetic-care" className="service-card" onClick={() => setOpen(false)}>
              <div className="service-card__check" aria-hidden="true">✔</div>
              <span className="service-card__text">Cosmetic<br />Care</span>
            </Link>
            <Link to="/services#general-checkup" className="service-card" onClick={() => setOpen(false)}>
              <div className="service-card__check" aria-hidden="true">✔</div>
              <span className="service-card__text">General<br />Check-up</span>
            </Link>
            <Link to="/services#kids-dentistry" className="service-card" onClick={() => setOpen(false)}>
              <div className="service-card__check" aria-hidden="true">✔</div>
              <span className="service-card__text">Kids'<br />Dentistry</span>
            </Link>
          
          </div>
        </div>
      </div>
    </section>
  );
}

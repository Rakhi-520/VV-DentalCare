import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      {/* Inline styling: page-scoped, no external files needed */}
      <style>{`
        :root{
          --brand:#0f4c81;      /* Deep dental blue */
          --brand-2:#1e88e5;    /* Accent blue */
          --ink:#1f2937;        /* Neutral heading/body */
          --muted:#6b7280;      /* Muted text */
          --bg:#f7f9fc;         /* Soft background */
          --card:#ffffff;       /* Cards */
          --ring: rgba(30,136,229,.15);
          --radius: 18px;
          --shadow: 0 10px 30px rgba(15,76,129,.10);
        }
        *{box-sizing:border-box}
        .about-wrap{
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
          color:var(--ink);
          background:linear-gradient(180deg, var(--bg), #fff);
          min-height:100dvh;
        }
        .container{max-width:1100px;margin:0 auto;padding:56px 20px;}
        .hero{
          background: radial-gradient(1200px 400px at 20% -10%, var(--ring), transparent),
                      linear-gradient(90deg, var(--brand) 0%, var(--brand-2) 100%);
          color:#fff;border-radius:var(--radius);
          padding:56px 28px;position:relative;overflow:clip;
          box-shadow:var(--shadow);
        }
        .hero h1{font-size:40px;line-height:1.1;margin:0 0 10px;font-weight:800;letter-spacing:.2px}
        .hero p{max-width:760px;opacity:.95;font-size:18px;margin:0}
        .badge{
          display:inline-flex;align-items:center;gap:8px;
          background:#fff;color:var(--brand);padding:8px 14px;border-radius:999px;
          font-weight:600;box-shadow:0 6px 18px rgba(255,255,255,.25);margin-bottom:16px
        }
        .grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;margin-top:28px}
        .card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:26px}
        .section-title{font-size:22px;font-weight:800;margin:0 0 10px}
        .text{color:var(--muted);line-height:1.75;margin:0 0 12px;font-size:16px}
        .list{display:grid;gap:10px;margin:16px 0 0;padding:0;list-style:none}
        .list li{display:flex;gap:10px;align-items:flex-start}
        .dot{height:10px;width:10px;border-radius:999px;background:var(--brand-2);flex:0 0 auto;transform:translateY(6px)}
        .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:6px}
        .stat{background:linear-gradient(180deg,#fff, #f3f7ff);border-radius:16px;padding:18px;text-align:center;border:1px solid #edf2ff}
        .stat h3{margin:0;font-size:28px;font-weight:800;color:var(--brand)}
        .stat p{margin:6px 0 0;color:var(--muted);font-size:13px}
        .pill{display:inline-block;background:#ecf5ff;color:var(--brand);padding:6px 12px;border-radius:999px;font-weight:600;font-size:13px;margin-right:8px}
        .cta{
          margin-top:22px;display:flex;flex-wrap:wrap;gap:12px
        }
        .btn{
          appearance:none;border:0;border-radius:12px;padding:12px 18px;font-weight:700;cursor:pointer;
          background:var(--brand);color:#fff;box-shadow:0 8px 18px rgba(15,76,129,.25);
          text-decoration:none;display:inline-block;
        }
        .btn.secondary{background:#fff;color:var(--brand);border:1px solid #dbe8ff}
        .aside{
          display:grid;gap:16px
        }
        .quote{
          background:linear-gradient(180deg,#ffffff,#f6fbff);
          border:1px solid #e6f0ff;border-radius:var(--radius);padding:20px
        }
        .quote p{margin:0 0 8px;color:#0b2e4d;font-weight:700}
        .sig{font-size:13px;color:var(--muted)}
        .divider{height:1px;background:#eef3fb;margin:26px 0;border-radius:2px}
        @media (max-width: 920px){
          .grid{grid-template-columns:1fr}
          .hero h1{font-size:34px}
        }
      `}</style>

      <main className="about-wrap">
        <div className="container">
          {/* HERO */}
          <header className="hero">
            <span className="badge" aria-label="Trusted dental clinic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 7l-9 9-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Trusted Family Dentistry
            </span>
            <h1>About VV Dental Care</h1>
            <p>
              A healthy smile is more than teeth—it’s confidence, wellbeing, and a better quality of life.
              VV Dental Care blends compassionate clinicians, modern technology, and transparent care to
              make dentistry a calm, positive experience for every patient.
            </p>
          </header>

          {/* BODY */}
          <section className="grid">
            {/* Left column */}
            <article className="card">
              <h2 className="section-title">Our Story & Promise</h2>
              <p className="text">
                VV Dental Care was founded to redefine what a visit to the dentist feels like:
                warm welcomes, clear explanations, and treatment that respects your time and budget.
                From a child’s first check-up to complex full-mouth rehabilitation, we tailor every
                plan to your goals and long-term oral health.
              </p>
              <p className="text">
                We offer comprehensive services—preventive care, cosmetic smile design, orthodontics,
                periodontics, endodontics, oral surgery, and pediatric dentistry—delivered with
                evidence-based protocols and a gentle touch. Our clinicians favor minimally invasive
                approaches that protect healthy tooth structure while achieving beautiful, durable results.
              </p>
              <ul className="list">
                <li><span className="dot" /> <span className="text"><strong>Patient-first care:</strong> We listen, explain options, and obtain informed consent before any procedure.</span></li>
                <li><span className="dot" /> <span className="text"><strong>Technology that matters:</strong> Digital X-rays, intra-oral imaging, and precision instruments for safer, faster visits.</span></li>
                <li><span className="dot" /> <span className="text"><strong>Safety & sterility:</strong> Stringent sterilization and single-use disposables where appropriate.</span></li>
              </ul>

              <div className="stats">
                <div className="stat">
                  <h3>10k+</h3>
                  <p>Smiles Cared For</p>
                </div>
                <div className="stat">
                  <h3>98%</h3>
                  <p>Patient Satisfaction</p>
                </div>
                <div className="stat">
                  <h3>7 Days</h3>
                  <p>Accessible Appointments</p>
                </div>
              </div>

              <div className="divider" />

              <h3 className="section-title">What Sets Us Apart</h3>
              <p className="text">
                We measure success by comfort, clarity, and outcomes. Expect honest recommendations,
                transparent pricing, and follow-up support that keeps you smiling long after the visit.
                Beyond the clinic, our team runs school programs and community camps to promote oral hygiene.
              </p>
              <div className="cta">
                <span className="pill">Minimally Invasive Care</span>
                <span className="pill">Transparent Plans</span>
                <span className="pill">Family-Friendly</span>
              </div>
            </article>

            {/* Right column */}
            <aside className="aside">
              <div className="card quote" aria-label="Clinical Director message">
                <p>“Great dentistry is equal parts science, artistry, and empathy.”</p>
                <div className="sig">— Clinical Director, VV Dental Care</div>
              </div>

              <div className="card">
                <h4 className="section-title">Our Mission</h4>
                <p className="text">
                  Deliver outstanding, comfortable dental care that preserves natural teeth,
                  elevates confidence, and makes prevention a lifelong habit.
                </p>
                <h4 className="section-title">Our Vision</h4>
                <p className="text">
                  To be the community’s most trusted destination for modern dentistry—where every patient
                  feels heard, every smile is celebrated, and every outcome is designed to last.
                </p>
                <h4 className="section-title">Our Values</h4>
                <ul className="list">
                  <li><span className="dot" /> <span className="text"><strong>Compassion:</strong> Kind, judgment-free care for all ages.</span></li>
                  <li><span className="dot" /> <span className="text"><strong>Excellence:</strong> Evidence-based practice and continuous learning.</span></li>
                  <li><span className="dot" /> <span className="text"><strong>Integrity:</strong> Clear options, fair pricing, and no pressure.</span></li>
                </ul>
              </div>

              <div className="card">
                <h4 className="section-title">Ready to Meet Us?</h4>
                <p className="text">
                  Whether you need a routine check-up or a complete smile makeover, our team is here for you.
                  Book an appointment and experience dentistry that feels refreshingly human.
                </p>
                <div className="cta">
                  <Link to="/appointments/book" className="btn">
                    Book Appointment
                  </Link>
                  <Link to="/services" className="btn secondary">
                    Explore Services
                  </Link>
                  {/* Removed: Meet Our Doctors button */}
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}

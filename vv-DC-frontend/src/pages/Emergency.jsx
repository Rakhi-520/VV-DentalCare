import React, { useMemo } from "react";
import "./Emergency.css";

export default function Emergency() {

  const phoneNumber = "+91XXXXXXXXXX";     
  const whatsappNumber = "91XXXXXXXXXX";   
  const clinicName = "VVDentalCare";
  const mapsQuery = encodeURIComponent(clinicName);
  const email = "help@vvdentalcare.com";

  const prefill = useMemo(
    () => encodeURIComponent("Hi, this is an emergency. Please respond ASAP."),
    []
  );

  const telLink = `tel:${phoneNumber}`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${prefill}`;
  const smsLink = `sms:${phoneNumber}`;
  const mapsLink = `https://maps.google.com/?q=${mapsQuery}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Emergency assistance")}`;

  const track = (label) => {
  
  };

  return (
    <main className="emg-root" role="main">
      <div className="emg-bg" aria-hidden="true"></div>

      <header className="emg-header">
        <a href="/" className="emg-breadcrumb" aria-label="Back to home">
        
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Home
        </a>
      </header>

      <section className="emg-card" aria-labelledby="emg-title">
        <div className="emg-card-header">
          <div className="emg-badge">Priority</div>
          <h1 id="emg-title" className="emg-title">Emergency Care</h1>
          <p className="emg-subtitle">
            If this is life-threatening, call your local emergency number (India: <strong>112</strong>, Ambulance: <strong>108</strong>).
          </p>
        </div>

        <div className="emg-actions">
          <a
            href={telLink}
            onClick={() => track("call_now")}
            className="emg-btn emg-btn-primary"
            aria-label={`Call emergency number ${phoneNumber} now`}
          >
            <span className="emg-btn-ico" aria-hidden="true">
            
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.86 6.86l1.27-1.27a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92z" fill="currentColor"/>
              </svg>
            </span>
            Call now
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp")}
            className="emg-btn emg-btn-whatsapp"
            aria-label="Open WhatsApp chat"
          >
            <span className="emg-btn-ico" aria-hidden="true">
             
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M20.5 3.5A10 10 0 0 0 3 16.9L2 22l5.3-1a10 10 0 1 0 13.2-17.5z" fill="currentColor" opacity="0.9"/>
                <path d="M8.5 7.5c.3-.3.8-.4 1.2-.2.4.2.7.6.8 1 0 .3 0 .7-.1 1-.1.3-.2.6-.1.9.2.5.8 1.3 1.3 1.7.6.5 1.5 1.1 2 .9.3-.1.6-.3.9-.4.3-.2.7-.2 1-.1.4.1.8.4 1 .8.2.4.1.9-.2 1.2-.7.7-1.7 1.2-2.8 1.1-1.3-.1-2.7-.8-4-1.9-1.3-1.1-2.3-2.5-2.7-3.8-.4-1.1-.2-2.1.7-3z" fill="#fff"/>
              </svg>
            </span>
            WhatsApp us
          </a>

          <div className="emg-meta">Typical response: under 5 minutes</div>
        </div>

        <div className="emg-divider" role="separator" aria-hidden="true"></div>

        <div className="emg-grid">
          <a href={smsLink} className="emg-tile" onClick={() => track("sms")}>
            <div className="emg-tile-ico" aria-hidden="true">💬</div>
            <div>
              <div className="emg-tile-title">Send SMS</div>
              <div className="emg-tile-desc">We’ll reply as soon as possible</div>
            </div>
          </a>

          <a href={mapsLink} target="_blank" rel="noreferrer" className="emg-tile" onClick={() => track("maps")}>
            <div className="emg-tile-ico" aria-hidden="true">📍</div>
            <div>
              <div className="emg-tile-title">Get directions</div>
              <div className="emg-tile-desc">{clinicName}</div>
            </div>
          </a>

          <a href={mailto} className="emg-tile" onClick={() => track("email")}>
            <div className="emg-tile-ico" aria-hidden="true">✉️</div>
            <div>
              <div className="emg-tile-title">Email us</div>
              <div className="emg-tile-desc">Send medical details securely</div>
            </div>
          </a>
        </div>

        <footer className="emg-footer">
         
        </footer>
      </section>
    </main>
  );
}

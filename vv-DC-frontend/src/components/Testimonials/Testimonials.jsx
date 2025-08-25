import React from "react";
import { testimonialsData } from "../../utils/data";
import styles from "./Testimonials.module.css";

import jenniferImg from "../../assets/images/patient-jennifer.jpg";
import williamImg from "../../assets/images/patient-william.jpg";
import chloeImg from "../../assets/images/patient-chloe.jpg";
import maliniImg from "../../assets/images/patient-malini.jpg";

const imageMap = {
  "Jennifer S.": jenniferImg,
  "William T.": williamImg,
  "Chloe M.": chloeImg,
  "Malini K.": maliniImg,
};

function Testimonials() {
  return (
    <section
      id="testimonials" 
      className={styles.testimonials}
      aria-labelledby="testimonials_title"
    >
      <div className={styles.inner}>
        <h2 id="testimonials_title" className={styles.sectionTitle}>
          What Our Patients Say?
        </h2>

        <div className={styles.grid}>
          {testimonialsData.map((t) => (
            <article
              key={t.id}
              className={styles.card}
              aria-label={`Testimonial from ${t.name}`}
            >
              <div className={styles.quoteMark} aria-hidden="true">“</div>

              <header className={styles.header}>
                <div className={styles.avatar}>
                  <img
                    src={getPatientImage(t.name)}
                    alt={`${t.name} profile`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = avatarPlaceholder; }}
                  />
                </div>

                <div className={styles.meta}>
                  <h3 className={styles.name}>{t.name}</h3>
                  <StarRating value={t.rating} />
                </div>
              </header>

              <p className={styles.text}>{t.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getPatientImage(name) {
  return imageMap[name] ?? avatarPlaceholder;
}

function StarRating({ value = 5 }) {
  return (
    <div className={styles.rating} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value ? styles.starActive : styles.star}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Testimonials;

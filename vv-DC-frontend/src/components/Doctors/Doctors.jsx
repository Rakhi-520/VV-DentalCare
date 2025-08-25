import React from "react";
import { doctorsData } from "../../utils/data";
import styles from "./Doctors.module.css";       
import { Link } from "react-router-dom";

function Doctors() {
  return (
    <section className={styles.doctors} aria-labelledby="doctors_title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The gentle hands guiding your smile.</p>

        <h2 id="doctors_title" className={styles.sectionTitle}>Our Doctors</h2>

        <div className={styles.grid}>
          {doctorsData.map((doctor) => (
            <article key={doctor.id} className={styles.card}>
              <div className={styles.image}>
                <img src={getDoctorImage(doctor.name)} alt={doctor.name} loading="lazy" />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{doctor.name}</h3>
                <p className={styles.spec}>{doctor.specialty}</p>
                <p className={styles.exp}>{doctor.experience}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link className={styles.cta} to="/doctors">Meet the Team</Link>
        </div>
      </div>
    </section>
  );
}

function getDoctorImage(name) {
  const map = {
    "Dr. Maya Sharma":
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1470&q=80",
    "Dr. Neha Verma":
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1470&q=80",
    "Dr. Arjun Patel":
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1374&q=80",
  };
  return map[name] || "https://via.placeholder.com/800x600?text=Doctor";
}

export default Doctors;

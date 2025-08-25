
import React, { useEffect, useState } from "react";
import styles from "../components/Doctors/Doctors.module.css"; 
import { doctorsData as seedDoctors } from "../utils/data";

export default function DoctorsPage() {
  const STORAGE_KEY = "vv_doctors";
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDoctors(parsed);
          return;
        }
      }
    } catch {
      // ignore and use seed
    }
    setDoctors(seedDoctors);
  }, []);

  return (
    <section className={styles.doctors} aria-labelledby="our_team_title">
      <div className={styles.inner}>
   <p className={styles.eyebrow}>
  {"THE GENTLE HANDS GUIDING YOUR SMILE.".toUpperCase()}
</p>

        <h2 id="our_team_title" className={styles.sectionTitle}>Our Doctors</h2>

        {doctors.length === 0 ? (
          <p style={{ marginTop: 8 }}>No doctors to display yet.</p>
        ) : (
          <div className={styles.grid}>
            {doctors.map((d) => (
              <article key={d.id || d._id || d.name} className={styles.card}>
                <div className={styles.image}>
                  <img
                    src={d.photoUrl || getDoctorImage(d.name)}
                    alt={d.name}
                    loading="lazy"
                  />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{d.name}</h3>
                  <p className={styles.spec}>{d.specialty}</p>
                  <p className={styles.exp}>
                    {typeof d.experience === "number"
                      ? `${d.experience} years of experience`
                      : d.experience}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
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

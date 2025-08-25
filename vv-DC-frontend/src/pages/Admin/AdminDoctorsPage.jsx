import React, { useEffect, useMemo, useState } from "react";
import styles from "../../components/Doctors/Doctors.module.css";
import { doctorsData as seedDoctors } from "../../utils/data";

export default function AdminDoctorsPage() {
  const STORAGE_KEY = "vv_doctors";

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    specialty: "",
    experience: "",
    photoUrl: "",
  });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDoctors(JSON.parse(saved));
    } else {
      // Initialize from seed (utils/data)
      setDoctors(seedDoctors);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDoctors));
    }
  }, []);

  const nextId = useMemo(() => {
    const maxId = doctors.reduce((m, d) => Math.max(m, Number(d.id) || 0), 0);
    return maxId + 1;
  }, [doctors]);

  function persist(next) {
    setDoctors(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleEdit(d) {
    setEditingId(d.id);
    setForm({
      id: d.id,
      name: d.name,
      specialty: d.specialty,
      experience:
        typeof d.experience === "number" ? String(d.experience) : (d.experience || "").replace(/[^0-9]/g, ""),
      photoUrl: d.photoUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancel() {
    setEditingId(null);
    setForm({ id: "", name: "", specialty: "", experience: "", photoUrl: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      id: editingId ?? nextId,
      name: form.name.trim(),
      specialty: form.specialty.trim(),
      experience: Number(form.experience || 0),
      photoUrl: form.photoUrl.trim(),
    };

    if (!payload.name || !payload.specialty) {
      alert("Name and Specialty are required.");
      return;
    }

    if (editingId != null) {
      const updated = doctors.map((d) => (String(d.id) === String(editingId) ? { ...d, ...payload } : d));
      persist(updated);
      handleCancel();
    } else {
      persist([payload, ...doctors]);
      handleCancel();
    }
  }

  function handleDelete(id) {
    if (!confirm("Delete this doctor?")) return;
    const next = doctors.filter((d) => String(d.id) !== String(id));
    persist(next);
  }

  return (
    <section className={styles.doctors} aria-labelledby="admin_doctors_title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Manage your clinic team</p>
        <h2 id="admin_doctors_title" className={styles.sectionTitle}>Doctors (Admin)</h2>

        {/* Admin form */}
        <form onSubmit={handleSubmit} className={styles.card} style={{ padding: 18, marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            <input
              name="name"
              placeholder="Doctor name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="specialty"
              placeholder="Specialty (e.g., Orthodontist)"
              value={form.specialty}
              onChange={handleChange}
              required
            />
            <input
              name="experience"
              type="number"
              min="0"
              placeholder="Experience (years)"
              value={form.experience}
              onChange={handleChange}
              required
            />
            <input
              name="photoUrl"
              placeholder="Photo URL (optional)"
              value={form.photoUrl}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className={styles.cta} type="submit">
              {editingId != null ? "Update Doctor" : "Add Doctor"}
            </button>
            {editingId != null && (
              <button
                type="button"
                className={styles.cta}
                onClick={handleCancel}
                style={{ borderColor: "#999", color: "#333" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className={styles.grid}>
          {doctors.map((d) => (
            <article key={d.id} className={styles.card}>
              <div className={styles.image}>
                <img src={d.photoUrl || getDoctorImage(d.name)} alt={d.name} loading="lazy" />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{d.name}</h3>
                <p className={styles.spec}>{d.specialty}</p>
                <p className={styles.exp}>
                  {typeof d.experience === "number" ? `${d.experience} years of experience` : d.experience}
                </p>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 8 }}>
                  <button className={styles.cta} onClick={() => handleEdit(d)}>Edit</button>
                  <button className={styles.cta} onClick={() => handleDelete(d.id)} style={{ borderColor: "#c62828", color: "#c62828" }}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
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

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/layout/Footer";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Treatment from "./pages/Treatment";
import DoctorsPage from "./pages/DoctorsPage";
import ServicesPage from "./pages/Services";
import Emergency from "./pages/Emergency";
import BeforeAfterGallery from "./pages/BeforeAfterGallery";
import CaseDetail from "./pages/CaseDetail";
import DoctorsListPage from "./pages/DoctorsListPage";
import AdminDoctorsPage from "./pages/Admin/AdminDoctorsPage";
import Insurance from "./pages/Insurance";

// blogs
import BlogsPage from "./pages/BlogsPage.jsx";
import BlogsDetails from "./pages/BlogsDetails.jsx";

// payments & appointments
import PaymentCheckoutPage from "./pages/payments/checkout.jsx";
import BookAppointmentPage from "./pages/Appointments/book.jsx";
import CancelAppointmentPage from "./pages/Appointments/cancel.jsx";

export default function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/treatment-packages" element={<Treatment />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/cases" element={<BeforeAfterGallery />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
          <Route path="/emergency" element={<Emergency />} />

          {/* Blogs */}
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blogs/:slug" element={<BlogsDetails />} />

          <Route path="/appointments/book" element={<BookAppointmentPage />} />
          <Route path="/appointments/cancel" element={<CancelAppointmentPage />} />
          <Route path="/book" element={<Navigate to="/appointments/book" replace />} />

          {/* Payments */}
          <Route path="/payments/checkout" element={<PaymentCheckoutPage />} />

          {/* Admin */}
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/doctors-list" element={<DoctorsListPage />} />
          <Route path="/insurance" element={<Insurance />} />

          {/* 404 fallthrough (keep last) */}
          <Route path="*" element={<div style={{ padding: 24 }}>404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

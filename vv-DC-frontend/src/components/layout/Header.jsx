import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link to="/" className="text-xl font-semibold">
        VV Dental Care
      </Link>

      <nav className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-semibold" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-semibold" : ""}`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-semibold" : ""}`
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-semibold" : ""}`
          }
        >
          Doctors
        </NavLink>

        {/* Primary CTA */}
        <Link
          to="/appointments/book"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Book Appointment
        </Link>
      </nav>
    </header>
  );
}

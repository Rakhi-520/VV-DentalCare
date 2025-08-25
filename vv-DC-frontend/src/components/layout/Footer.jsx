import React from 'react'
import { Link } from "react-router-dom"; 
import { HashLink } from "react-router-hash-link";
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerList}>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/doctors">Doctors</a></li>
              <li>
    <Link to="/blogs" className="text-gray-700 hover:text-blue-600">Blogs</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Resources</h3>
            <ul className={styles.footerList}>
              <li><Link to="/appointments/book">Appointment</Link></li>
              <li><HashLink smooth to="/#faq">FAQ</HashLink></li>
              <li><Link to="/insurance">Insurance</Link></li>
              <HashLink smooth to="#testimonials">Reviews</HashLink>
            
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Services</h3>
            <ul className={styles.footerList}>
            <li><HashLink smooth to="/#services">General Dentistry</HashLink></li>
            <li><HashLink smooth to="/#services">Cosmetic Dentistry</HashLink></li>
            <li><HashLink smooth to="/#services">Orthodontics</HashLink></li>
            <li><HashLink smooth to="/#services">Oral Surgery</HashLink></li>
            <li><HashLink smooth to="/#services">Pediatric Dentistry</HashLink></li>
            <li><HashLink smooth to="/#services">Periodontics</HashLink></li>
           <li><HashLink smooth to="/#services">Endodontics</HashLink></li>

            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <p>📞 +91XXXXXXXXXX</p>
              <p>📧 info@wdental.com</p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="LinkedIn">💼</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2025 VV Dental. All rights reserved.</p>
        
        </div>
      </div>
    </footer>
  )
}

export default Footer
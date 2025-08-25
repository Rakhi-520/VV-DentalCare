
import React, { useState } from 'react';
import { faqData } from '../../utils/data';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((curr) => (curr === id ? null : id));

  const fluid = {
    width: '100%',
    maxWidth: '100%',
    paddingLeft: 'var(--spacing-xl)',
    paddingRight: 'var(--spacing-xl)',
  };

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq_title">

     
      <div style={fluid}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      </div>

      
      <div style={fluid}>
        <div className={styles.faqList}>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                >
                  {item.question}
                  <span
                    className={`${styles.faqIcon} ${
                      isOpen ? styles.faqIconOpen : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  hidden={!isOpen}
                  className={styles.faqAnswer}
                >
                  <p className="description">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

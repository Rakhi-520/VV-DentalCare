import React from 'react'
import { technologyFeatures } from '../../utils/data'
import styles from './Technology.module.css'

function Technology() {
  return (
    <section className={`${styles.technology} section-padding`}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>Advanced Technology & Expert Care</h2>
          <ul className={styles.featuresList}>
            {technologyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className={styles.certifications}>
            <div className={styles.cert}>NABH</div>
            <div className={styles.cert}>ADA</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technology
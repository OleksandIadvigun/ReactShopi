import React from 'react';
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <div>
            <section className={styles.footerSocialMedia}>
                <a href="/" target="_blank" rel="noopener noreferrer" className={styles.linked} >LinkedIn</a>
            </section>
            <section className={styles.footerInfo}>
                <section className={styles.footerInfoLeft}>
                    <section className={styles.footerInfoName}>
                        Software Engineer By Alex Iadvigun
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Returns Policy
                    </section>
                </section>
                <section className={styles.footerInfoCenter}>
                    <section className={styles.footerInfoEmail}>
                        shopi.info@gmail.com
                    </section>
                    <section className={styles.footerInfoTerms}>
                        All rights reserved
                    </section>
                </section>
                <section className={styles.footerInfoRight}>
                    <section className={styles.footerInfoContact}>
                        Contact Us
                    </section>
                    <section className={styles.footerInfoNumber}>
                        +380986371056
                    </section>

                </section>
            </section>
    </div>
  );
}
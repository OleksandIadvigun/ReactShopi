import React from 'react';
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <div >
            <section className={styles.footerSocialMedia}>
                <a href="https://www.linkedin.com/in/oleksandriadvigun/" target="_blank" rel="linked" className={styles.linked} >LinkedIn</a>
            </section>
            <section className={styles.footerInfo}>
                <section className={styles.footerInfoLeft}>
                    <section className={styles.footerInfoReturns}>
                        Software Engineer By Alex Iadvigun
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Returns Policy
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Customers
                    </section>
                    <section className={styles.footerInfoReturns}>
                        News
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Events
                    </section>
                </section>
                <section className={styles.footerInfoCenter}>
                    <section className={styles.footerInfoEmail}>
                        <div className={styles.footerStartContainer}>
                            <div className={styles.elementCenter}> FAQ</div>
                            <div className={styles.elementCenter}> Live connect</div>
                            <div className={styles.elementCenter}> Support</div>
                            <div className={styles.elementCenter}> Stream</div>
                            <div className={styles.elementCenter}> Web Assurance</div>
                            <div className={styles.elementCenter}> All rights reserved </div>
                        </div>
                    </section>
                </section>
                <section className={styles.footerInfoRight}>
                    <section className={styles.footerEndContainer}>
                        <section className={styles.footerStartContainer}>
                            <section className={styles.footerInfoContact}>
                                Contact Us
                            </section>
                            <section className={styles.elementCenter}>
                                +380986371056
                            </section>
                            <section className={styles.elementCenter}>
                                projectshopi.info@gmail.com
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    );
}

import React from 'react';
import styles from './Header.module.css'
import {Navbar} from "../navbar";


export default function Header() {
    return (
        <div>
        <section className={styles.headerTop}>
                <img  className={styles.headerTopLogo} src={process.env.PUBLIC_URL + "/logoshopinew2.png"} height="70px"/>
            <Navbar/>
        </section>
    <section className={styles.username}>Alex Iad</section>
        </div>
    );
}

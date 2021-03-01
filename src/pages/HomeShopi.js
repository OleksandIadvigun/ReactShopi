import styles from './HomeShopi.module.css';
import {TextContent} from "./TextContent";


export const  HomeShopi =()=>{



  return (
    <div >
        <div className={styles.welcomeText}>Welcome to SHOPI</div>
        <div className={styles.title}>What is shopi?</div>
        <section className={styles.mainContainer}>
            <div className={styles.phonePhoto}><img src={process.env.PUBLIC_URL + "/photos/3ph.jpg"}/></div>
            <div className={styles.text}><TextContent/>
                <div className={styles.title2}>Functions:</div>
                <ul>
                    <li className={styles.li}> add product or shop;</li>
                    <li className={styles.li}> delete product or shop;</li>
                    <li className={styles.li}>update product or shop;</li>
                    <li className={styles.li}>click DONE in alarm list, means continue expiration for one cycle.</li>
                </ul>

                <section className={styles.download} > &nbsp;&nbsp;
                    <a href="http://localhost:8080/download/shopi.zip" className={styles.href}>Click</a>
                    to download the apk file.</section>
            </div>
        </section>

    </div>
  );
}
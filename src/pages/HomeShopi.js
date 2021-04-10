import styles from './HomeShopi.module.css';
import {TextContent} from "./TextContent";
import Vidos from './video/Floor.mp4';
import {Link} from "react-router-dom";

export const HomeShopi = () => {
    const isLogged = () => {
        if (localStorage.getItem('user') != null) {
            return true;
        }
    }
    return (
        <div>
            <video className={styles.videoWrapper} autoPlay muted loop>
                <source src={Vidos} type="video/mp4"/>
            </video>

            {isLogged() ? <div className={styles.startButton}><Link to={'/loggedIn'} className={styles.shopi}
                >Get started </Link></div> :
                <div className={styles.startButton}><Link to={'/logIn'} className={styles.shopi}
                >Get started </Link></div>}

            <div className={styles.title}>What is SHOPI?</div>
            <div className={styles.mainContainer}>
                {/*<div className={styles.containerImages}>*/}
                <div className={styles.phonePhoto}><img src={process.env.PUBLIC_URL + `/photos/77.png`}
                                                        className={styles.imgMain}/></div>
                {/*<div className={styles.phonePhoto}><img src={process.env.PUBLIC_URL + `/photos/blok.png`}*/}
                {/*                                        className={styles.imgMain}/></div>*/}
                {/*</div>*/}
                <div className={styles.text}><TextContent/>
                    <div className={styles.title2}>Functions:</div>
                    <ul>
                        <li className={styles.li}> add product or shop;</li>
                        <li className={styles.li}> delete product or shop;</li>
                        <li className={styles.li}>update product or shop;</li>
                        <li className={styles.li}>click DONE in alarm list, means continue expiration for one cycle.
                        </li>
                    </ul>
                    <section className={styles.download}> &nbsp;&nbsp;
                        <a href="http://localhost:8080/download/shopi.zip" className={styles.href}>Click</a>
                        to download the apk file.
                    </section>
                </div>
            </div>
        </div>
    );
}

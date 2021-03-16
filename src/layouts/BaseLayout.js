import styles from './BaseLayout.module.css'
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";


export default function BaseLayout({children, unSetUser}) {
  return (
   <div className={styles.mainWrapper}>
       <header>  <Header unSetUser={unSetUser}/> </header>
       <main> {children}
       </main>
       <footer> <Footer /> </footer>
       </div>
  );
}

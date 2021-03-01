import styles from './BaseLayout.module.css'
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";


export default function BaseLayout({children}) {
  return (
   <div className={styles.mainWrapper}>
       <header>  <Header/> </header>
       <main> {children}
       <footer> <Footer /> </footer>
       </main>
       </div>
  );
}

import styles from "./Alarm.module.css";

export default function Alarm({item, done,index}) {

    const doneHandler = (e) =>{
        e.preventDefault();
        done(item);
    }
    return (
        <div className={styles.containerP}>
            <span className={styles.itemNumber}> {index+1} </span>
            <span className={styles.item}> {item.name} </span>
            <span className={styles.itemAmount}>  {item.amount}</span>
            <span className={styles.itemDateExp}> expired on: {item.overdueDate}</span>
            <span className={styles.itemExpiration}>{item.expiration} day(s)</span>
            <div className={styles.contButtons}>
                <button className={styles.navLinkClose} onClick={doneHandler} >V</button>
            </div>
        </div>
    );
}

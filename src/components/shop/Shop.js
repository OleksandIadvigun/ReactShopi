import styles from "./Shop.module.css";

export default function Shop({item,edit,del,index}) {
    const editHandler = (e) =>{
        e.preventDefault();
        edit(item);
    }

    const deleteHandler = (e) =>{
        e.preventDefault();
        del(item);
    }
    return (
        <div className={styles.containerP}>
            <span className={styles.itemNumber}> {index+1} </span>
            <span className={styles.item}> {item.name} </span>
            <span className={styles.item}> latitude: {item.latitude}</span>
            <span className={styles.item}> longitude: {item.longitude}</span>
            <span className={styles.item}> areaSize: {item.areaSize} (m)</span>
            <div className={styles.contButtons}>
                <button className={styles.navLinkClose} onClick={deleteHandler} >X</button>
                <button className={styles.navLinkEdit} onClick={editHandler}>edit</button>
            </div>
        </div>
    );
}

import styles from './Product.module.css'

export default function Product({item,edit, del,index}) {
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
        <span className={styles.item}> {index+1} </span>
        <span className={styles.item}> {item.name} </span>
        <span className={styles.item}> amount: {item.amount}</span>
        <span className={styles.item}> expiration: {item.expiration} day(s)</span>
        <div className={styles.contButtons}>
            <button className={styles.navLinkClose} onClick={deleteHandler} >X</button>
            <button className={styles.navLinkEdit} onClick={editHandler}>edit</button>
         </div>
    </div>
  );
}

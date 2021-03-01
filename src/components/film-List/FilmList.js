import React from 'react';
import {FilmItem} from "../film-Item";
import styles from './FilmList.module.css'

export const FilmList = ({items}) => {
    console.log(items)
    return (
    <div className={styles.ListWrapper} >
        {items.map( (value) =><div className={styles.itemWrapper} key={value.id}> <FilmItem  item={value}/> </div>)}
    </div>

    )
}
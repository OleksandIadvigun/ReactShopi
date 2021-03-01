import React from 'react';
import styles from'./FilmItem.module.css'

export const  FilmItem = ({item}) => {
  // adult: false
  // backdrop_path: "/h9DIlghaiTxbQbt1FIwKNbQvEL.jpg"
  // genre_ids: (3) [28, 12, 53]
  // id: 581387
  // original_language: "ko"
  // original_title: "백두산"
  // overview: "Stagnant since 1903, at an elevation of 9000', a volcano erupts on the mythical and majestic Baekdu Mountain."
  // popularity: 1355.356
  // poster_path: "/zoeKREZ2IdAUnXISYCS0E6H5BVh.jpg"
  // release_date: "2019-12-19"
  // title: "Ashfall"
  // video: false
  // vote_average: 6.8
  // vote_count: 166



  const{title, overview, release_date, vote_average, vote_count, poster_path, backdrop_path   } = item;
  return (
    <div className={styles.itemWrapper}>
      <div><img style={{padding: "2%"}} src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={`${title} poster`}/></div>
      <div>
       <h2>{title}</h2>
          <span>Rating: {vote_average} (total votes: {vote_count})</span>
          {/*<p>{overview}</p>*/}
          <p style={{
              paddingBottom: "2px"
          }}>Release date: {release_date}</p>
      </div>
    </div>
  );
}
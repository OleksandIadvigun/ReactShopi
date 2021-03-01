import React, {useEffect, useState} from "react";
import {movieService} from "../../services/MovieService";
import {getFe, getProducts} from "../../services/ProductService";
import styles from "../../pages/Home.module.css";
import {FilmList} from "../film-List";
import Product from "../product/Product";

export default function Products() {
    const[products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    const fetchMovies = async () => {
        try {
            console.log("In fetch")
            setIsLoading(true)
             const results = await getProducts();
          //  const results = await getFe();
            console.log(results + "data");
            setProducts(results.data);
        } catch (e) {
            console.error(e);
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
       fetchMovies();
    },[])
    const renderLoadingIndicator = () => {
        return <div className={styles.loading}>
            Loading...
        </div>;
    };
    return (
        <div>
            Products
            {isLoading || isLoading===null ? renderLoadingIndicator():
                products.map(item =><div key={item.id}><Product item={item}/></div> )
                 }
        </div>
    );
}

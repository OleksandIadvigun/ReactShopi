import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Alarms.module.css";
import Product from "../product/Product";
import Alarm from "../alarm/Alarm";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MySpinner from "../spinner/MySpinner";
import '../products/trans.css';
import SpinnerInside from "../spinner/SpinnerInside";

export default function Alarms() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingInside, setIsLoadingInside] = useState(null);
    const [expiration, setExpiration] = useState('');
    const [idForDone, setIdForDone] = useState(0);

    const AXIOS = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })

    const fetchAlarms = async () => {
        if (localStorage.getItem('token')) {
            try {
                setIsLoading(true)
                await AXIOS.get('alarms').then(results => {
                   if(results.data!=null) {
                       setProducts(results.data);
                       setIsLoading(false);
                   }else{
                       setIsLoading(false);
                   }
                })
            } catch (e) {
                console.error(e);
            }
        }
    }

    const done = (item) => {
        setExpiration(item.expiration);
        setIdForDone(item.id);
    }

    const doneFunc = async () => {
        const data = {
            expiration: expiration,
            id: idForDone
        }
        try {
            setIsLoadingInside(true)
            const newProducts = [...products];
            AXIOS.put('alarms/done', data).then(res => {
               if(res.data!=null) {
                   newProducts.forEach((e, index) => {
                       if (e.id === res.data.id) {
                           newProducts.splice(index, 1);
                       }
                   })
                   setProducts(newProducts);
                   setExpiration('');
                   setIsLoadingInside(false);
               }else{
                   setIsLoadingInside(false);
               }
            });
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        console.log("effect deleting...")// todo? render with component
        if (idForDone > 0 && expiration > 0) {
            console.log("Inside done")
            doneFunc().then(res => res);
        }
    }, [idForDone]);

    useEffect(() => {
        console.log(' effect fetch product')
        fetchAlarms();
    }, [])

    return (
        isLoading ? MySpinner :
            <div className={styles.container}>
                <div>
                    {isLoadingInside? SpinnerInside: <div></div> }
                    <TransitionGroup>
                        {
                            products.map((item, index) =>
                                <CSSTransition
                                    key={item.id}
                                    timeout={1000}
                                    classNames="example"
                                >
                                    <Alarm item={item}
                                           done={done}
                                           key={item.id}
                                           index={index}
                                    />
                                </CSSTransition>
                            )
                        }
                    </TransitionGroup>
                </div>
            </div>
    );
}

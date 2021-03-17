import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Alarms.module.css";
import Product from "../product/Product";
import Alarm from "../alarm/Alarm";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export default function Alarms() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
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
        console.log(' function fetch product')
        if (localStorage.getItem('token')) {
            try {
                setIsLoading(true)
                //const results = await getProducts();
                await AXIOS.get('alarms').then(results => {
                    console.log(results.data + "data");
                    setProducts(results.data);
                    results.data.map(value => {
                        console.log(value.id + " id " + value.name + " name")
                    })
                })
            } catch (e) {
                console.error(e);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                },)
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
            console.log(data.id + " my data")
            AXIOS.put('alarms/done', data).then(res => {
                console.log(res.data.id + " editedProdFromResp");
                newProducts.forEach((e, index) => {
                    if (e.id === res.data.id) {
                        newProducts.splice(index, 1);
                    }
                })
            }).then(r => {
                setProducts(newProducts);
                setExpiration('');
            });
        } catch (e) {
            console.error(e)
        } finally {
            setTimeout(() => {
                setIsLoadingInside(false);
            },)
        }
    }


    useEffect(() => {
        console.log("effect deleting...")
        console.log(idForDone, "id for del")// todo? render with component
        if (idForDone > 0 && expiration > 0) {
            console.log("Inside done")
            doneFunc().then(res => res);
        }
    }, [idForDone]);

    useEffect(() => {
        console.log(' effect fetch product')
        fetchAlarms();
    }, [])
    const renderLoadingIndicator = () => {
        return <div className="loading">
            Loading...
        </div>;
    };
    return (
        isLoading ? renderLoadingIndicator() :
            <div className={styles.container}>
                <div>
                    <TransitionGroup>
                        {
                            products.map((item, index) =>
                                <CSSTransition
                                    key={item.id}
                                    timeout={500}
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

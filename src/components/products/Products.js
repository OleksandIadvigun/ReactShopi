import React, {useEffect, useState} from "react";
import styles from "./Products.module.css";
import Product from "../product/Product";
import axios from "axios";
import './trans.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MySpinner from "../spinner/MySpinner";
import SpinnerInside from "../spinner/SpinnerInside";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingInside, setIsLoadingInside] = useState(null);
    const [name, setName] = useState('');
    const [expiration, setExpiration] = useState('');
    const [ErrorExpiration, setErrorExpiration] = useState('');
    const [amount, setAmount] = useState('');
    const [ErrorAmount, setErrorAmount] = useState('');
    const [id, setId] = useState(null);
    const [idForDel, setIdForDel] = useState(0);
    const [AddOrEdit, setAddOrEdit] = useState(false);

    const AXIOS = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })

    const fetchProducts = async () => {
        console.log(' function fetch product')
        if (localStorage.getItem('token')) {
            try {
                setIsLoading(true)
                await AXIOS.get('products').then(results => {
                    if (results.data != null) {
                        console.log(results.data + "data");
                        setProducts(results.data);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }
                })
            } catch (e) {
                console.error(e);
            }
        }
    }
    const validateAmount =()=>{
        return amount < 1000000 && amount > 0;
    }
    const validateExpiration =()=>{
        return expiration < 365 && expiration >= 0;
    }
    const addProduct = async (e) => {
        e.preventDefault();
        setErrorAmount('');
        setErrorExpiration('');
        console.log(' effect add product')
        const data = {
            name: name,
            expiration: expiration,
            amount: amount
        }
        if (localStorage.getItem('token') && validateAmount() && validateExpiration()) {

            try {
                setIsLoadingInside(true);
                await AXIOS.post('products', data).then((results => {
                    if (results.data != null) {
                        setProducts(prev => new Array(1).fill(results.data).concat(prev));
                        setIsLoadingInside(false);
                    } else {
                        setIsLoadingInside(false);
                    }
                })).then(v => {
                    setName('');
                    setExpiration('');
                    setAmount('')
                })
            } catch (e) {
                console.log(e + ' exception');
            }
        }else{
            if(!validateExpiration()){
                setErrorExpiration('Must be from 1 to 365 days!')
            }if(!validateAmount()){
                setErrorAmount('Must be from 1 to 1000000!')
            }
        }
    }

    const cancel = (e) => {
        e.preventDefault();
        setName('');
        setExpiration('');
        setAmount('');
        setAddOrEdit(false)

    }
    const edit = (item) => {
        setName(item.name);
        setExpiration(item.expiration);
        setAmount(item.amount);
        setId(item.id);
        setAddOrEdit(true);
        window.scrollTo(0, 0)
    }

    const editProd = async (e) => {
        e.preventDefault();
        setErrorExpiration('');
        setErrorAmount('');
        const data = {
            name: name,
            expiration: expiration,
            amount: amount,
            id: id
        }
        if (localStorage.getItem('token') && validateAmount() && validateExpiration()) {

        try {
            setIsLoadingInside(true)
            const newProducts = [...products];
            console.log(data.id + " my data")
            AXIOS.put('products/edit', data).then(res => {
                if (res.data != null) {
                    newProducts.forEach((e, index) => {
                        if (e.id === res.data.id) {
                            newProducts[index] = res.data;
                        }
                    })
                    setProducts(newProducts);
                    setName('');
                    setExpiration('');
                    setAmount('');
                    setAddOrEdit(false);
                    setIsLoadingInside(false);
                } else {
                    setIsLoadingInside(false);
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
    else{
            if(!validateExpiration()){
                setErrorExpiration('Must be from 1 to 365 days!')
            }if(!validateAmount()){
                setErrorAmount('Must be from 1 to 1000000!')
            }
        }
    }
    const del = (item) => {
        setIdForDel(item.id);
    }

    const deleteProd = async () => {
        const newProducts = [...products];
        try {
            setIsLoadingInside(true)
            const data = {
                id: idForDel
            }
            await AXIOS.delete('products/delete', {data: data}).then(resp => {
                    if (resp.data != null) {
                        newProducts.forEach((e, index) => {
                            if (e.id === idForDel) {
                                newProducts.splice(index, 1);
                            }
                        })
                        setProducts(newProducts);
                        setIsLoadingInside(false);
                    } else {
                        setIsLoadingInside(false);
                    }
                }
            )
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        console.log("effect deleting...") // todo? render with component
        if (idForDel > 0) {
            deleteProd().then(res => res);
        }
    }, [idForDel]);

    useEffect(() => {
        console.log(' effect fetch product')
        fetchProducts();
    }, [])

    return (
        isLoading ? MySpinner :
            <div className={styles.container}>
                <div className={styles.addProdCont}>
                    <form className="form card-body">
                        <div className="form-group">
                            <label htmlFor='name'>New product</label>
                            <input className="form-control my"
                                   id='name'
                                   type='text'
                                   placeholder="Input name"
                                   name="name"
                                   value={name}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                            />
                            <br/>
                            <input className="form-control my"
                                   id='expiration'
                                   type='number'
                                   placeholder="Input expiration (in days)"
                                   name="expiration"
                                   value={expiration}
                                   onChange={(e) => {
                                       setExpiration(e.target.value)
                                   }}
                            />
                            {ErrorExpiration ? <div className="error">{ErrorExpiration}
                                </div>
                                : null}
                            <br/>
                            <input className="form-control my"
                                   id='amount'
                                   type='number'
                                   placeholder="Input amount (how much)"
                                   name="amount"
                                   value={amount}
                                   onChange={(e) => {
                                       setAmount(e.target.value)
                                   }}
                            />
                            {ErrorAmount ? <div className="error">{ErrorAmount}
                                </div>
                                : null}
                            <TransitionGroup>

                                {!AddOrEdit ?
                                    <div className={styles.buttonAdd}>
                                        <button className={styles.navLink} onClick={addProduct}>Add</button>
                                    </div>
                                    :
                                    <CSSTransition
                                        in={AddOrEdit}
                                        timeout={1000}
                                        classNames="example"
                                    >
                                        <section className={styles.buttonAdd2}>
                                            <button className={styles.navLinkCancel} onClick={cancel}>Cancel</button>
                                            <button className={styles.navLink} onClick={editProd}>Edit</button>
                                        </section>
                                    </CSSTransition>
                                }
                            </TransitionGroup>
                            {isLoadingInside ? SpinnerInside : <div></div>}
                        </div>
                    </form>

                </div>
                <div>
                    <TransitionGroup>
                        {
                            products.map((item, index) =>
                                <CSSTransition
                                    key={item.id}
                                    timeout={500}
                                    classNames="example"
                                >
                                    <Product item={item}
                                             edit={edit}
                                             del={del}
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

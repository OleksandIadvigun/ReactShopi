import React, {useEffect, useMemo, useState} from "react";
import styles from "./Products.module.css";
import Product from "../product/Product";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingInside, setIsLoadingInside] = useState(null);
    const [name, setName] = useState('');
    const [expiration, setExpiration] = useState('');
    const [amount, setAmount] = useState('');
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
        if(localStorage.getItem('token')) {
            try {
                setIsLoading(true)
                //const results = await getProducts();
                await AXIOS.get('products').then(results => {
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

    const addProduct = async (e) => {
        e.preventDefault();
        console.log(' effect add product')
        const data = {
            name: name,
            expiration: expiration,
            amount: amount
        }
        if(localStorage.getItem('token')) {
            try {
                setIsLoadingInside(true);
                await AXIOS.post('products', data).then((results => {
                    console.log(results.data.id + "post res from add");
                    setProducts(prev => new Array(1).fill(results.data).concat(prev));
                })).then(v => {
                    setName('');
                    setExpiration('');
                    setAmount('')
                })

            } catch (e) {
                console.log(e + ' exception');
            } finally {
                setTimeout(() => {
                    setIsLoadingInside(false);
                },)
            }
        }
    }

    const cancel = (e)=>{
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
        const data = {
            name: name,
            expiration: expiration,
            amount: amount,
            id: id
        }
        try {
            setIsLoadingInside(true)
            const newProducts = [...products];
            console.log(data.id + " my data")
            AXIOS.put('products/edit', data).then(res => {
                console.log(res.data.id + " editedProdFromResp");
                newProducts.forEach((e, index) => {
                    if (e.id === res.data.id) {
                        newProducts[index] = res.data;
                    }
                })
            }).then(r => {
                setProducts(newProducts);
                setName('');
                setExpiration('');
                setAmount('');
                setAddOrEdit(false)
            });
        } catch (e) {
            console.error(e)
        } finally {
            setTimeout(() => {
                setIsLoadingInside(false);
            },)
        }
    }
    const del = (item) => {
        console.log("In del const" + item.id + " item id")
        setIdForDel(item.id);
    }

    const deleteProd = async () => {
        console.log(idForDel + " deletedProd")
        const newProducts = [...products];
        try {
            setIsLoadingInside(true)
            const data = {
                id: idForDel
            }
            await AXIOS.delete('products/delete', {data: data}).then((resp) =>
                newProducts.forEach((e, index) => {
                    if (e.id === idForDel) {
                        newProducts.splice(index, 1);
                    }
                })
            ).then(() => setProducts(newProducts))
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => {
                setIsLoadingInside(false);
            },)
        }
    }

    useEffect(() => {
        console.log("effect deleting...")
        console.log(idForDel ,"id for del")// todo? render with component
        if (idForDel > 0) {
            console.log("Inside delete")
            deleteProd().then(res => res);
        }
    }, [idForDel]);

    useEffect(() => {
        console.log(' effect fetch product')
        fetchProducts();
    }, [])
    const renderLoadingIndicator = () => {
        return <div className="loading">
            Loading...
        </div>;
    };
    return (
        isLoading ? renderLoadingIndicator() :
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
                            {!AddOrEdit ?
                            <div className={styles.buttonAdd}>
                                    <button className={styles.navLink} onClick={addProduct}>Add</button>
                            </div>:
                            <div className={styles.buttonAdd2}> <button className={styles.navLinkCancel} onClick={cancel}>Cancel</button>
                                <button className={styles.navLink} onClick={editProd}>Edit</button></div>
                                    }
                        </div>
                    </form>

                </div>
                <div>
                    {
                        products.map((item,index) => <div key={item.id}><Product item={item}
                                                                         edit={edit}
                                                                         del={del}
                                                                         key={item.id}
                                                                                 index={index}
                        /></div>)
                    }
                </div>
            </div>
    );
}

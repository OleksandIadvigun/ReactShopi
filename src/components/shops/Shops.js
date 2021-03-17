import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Shops.module.css";
import Shop from "../shop/Shop";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import '../products/trans.css';

export default function Shops() {
    const [shops, setShops] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingInside, setIsLoadingInside] = useState(null);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [areaSize, setSize] = useState('');
    const [id, setId] = useState(null);
    const [idForDel, setIdForDel] = useState(0);
    const [AddOrEdit, setAddOrEdit] = useState(false);

    const AXIOS = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })

    const fetchShops = async () => {
        console.log(' function fetch shops')
        if(localStorage.getItem('token')) {
            try {
                setIsLoading(true)
                //const results = await getProducts();
                await AXIOS.get('shops').then(results => {
                    console.log(results.data + "shops");
                    setShops(results.data);
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
        console.log(' effect add shop')
        const data = {
            name: name,
            latitude: latitude,
            longitude: longitude,
            areaSize: areaSize
        }
        if(localStorage.getItem('token')) {
            try {
                setIsLoadingInside(true);
                await AXIOS.post('shops', data).then((results => {
                    console.log(results.data.id + "post res from add");
                    setShops(prev => new Array(1).fill(results.data).concat(prev));
                })).then(v => {
                    setName('');
                    setLatitude('');
                    setLongitude('');
                    setSize('')
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
        setLatitude('');
        setLongitude('');
        setSize('')
        setAddOrEdit(false)

    }
    const edit = (item) => {
        setName(item.name);
        setLongitude(item.longitude);
        setLatitude(item.latitude);
        setSize(item.areaSize);
        setId(item.id);
        setAddOrEdit(true);
        window.scrollTo(0, 0)
    }

    const editProd = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            latitude: latitude,
            longitude: longitude,
            areaSize: areaSize,
            id: id
        }
        try {
            setIsLoadingInside(true)
            const newShops = [...shops];
            console.log(data.id + " my data")
            AXIOS.put('shops/edit', data).then(res => {
                console.log(res.data.id + " editedShopsFromResp");
                newShops.forEach((e, index) => {
                    if (e.id === res.data.id) {
                        newShops[index] = res.data;
                    }
                })
            }).then(r => {
                setShops(newShops);
                setName('');
                setLatitude('');
                setLongitude('');
                setSize('');
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

    const deleteShop = async () => {
        console.log(idForDel + " deletedProd")
        const newShops = [...shops];
        try {
            setIsLoadingInside(true)
            const data = {
                id: idForDel
            }
            await AXIOS.delete('shops/delete', {data: data}).then((resp) =>
                newShops.forEach((e, index) => {
                    if (e.id === idForDel) {
                        newShops.splice(index, 1);
                    }
                })
            ).then(() => setShops(newShops))
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
            deleteShop().then(res => res);
        }
    }, [idForDel]);

    useEffect(() => {
        console.log(' effect fetch product')
        fetchShops();
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
                            <label htmlFor='name'>New shop</label>
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
                                   id='latitude'
                                   type='number'
                                   placeholder="Input latitude"
                                   name="latitude"
                                   value={latitude}
                                   onChange={(e) => {
                                       setLatitude(e.target.value)
                                   }}
                            />
                            <br/>
                            <input className="form-control my"
                                   id='longitude'
                                   type='number'
                                   placeholder="Input longitude"
                                   name="longitude"
                                   value={longitude}
                                   onChange={(e) => {
                                       setLongitude(e.target.value)
                                   }}
                            />
                            <br/>
                            <input className="form-control my"
                                   id='areaSize'
                                   type='number'
                                   placeholder="Input areaSize"
                                   name="areaSize"
                                   value={areaSize}
                                   onChange={(e) => {
                                       setSize(e.target.value)
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
                    <TransitionGroup>
                    {
                        shops.map((item,index) =>
                            <CSSTransition
                                key={item.id}
                                timeout={500}
                                classNames="example"
                            >
                            <Shop item={item}
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

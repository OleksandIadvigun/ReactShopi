import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Shops.module.css";
import Shop from "../shop/Shop";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import '../products/trans.css';
import MyGoogleMap from "../googleMap/MyGoogleMap";
import MySpinner from "../spinner/MySpinner";
import SpinnerInside from "../spinner/SpinnerInside";


export default function Shops() {
    const [shops, setShops] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingInside, setIsLoadingInside] = useState(null);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [areaSize, setSize] = useState('');
    const [ErrorAreaSize, setErrorSize] = useState('');
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
        if (localStorage.getItem('token')) {
            try {
                setIsLoading(true)
                //const results = await getProducts();
                await AXIOS.get('shops').then(results => {
                    if (results.data != null) {
                        console.log(results.data + "shops");
                        setShops(results.data);
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
    const validateAreaSize = () => {
        return areaSize < 10000 && areaSize > 0;
    }

    const addProduct = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            latitude: latitude,
            longitude: longitude,
            areaSize: areaSize
        }
        if (localStorage.getItem('token') && validateAreaSize()) {
            setErrorSize('');
            try {
                setIsLoadingInside(true);
                await AXIOS.post('shops', data).then((results => {
                    if (results.data != null) {
                        setShops(prev => new Array(1).fill(results.data).concat(prev));
                        setName('');
                        setLatitude('');
                        setLongitude('');
                        setSize('')
                        setIsLoadingInside(false);
                    } else {
                        setIsLoadingInside(false);
                    }
                }))

            } catch (e) {
                console.log(e + ' exception');
            }
        }else{
            setErrorSize("Must be from 1 to 10000!")
        }
    }

    const cancel = (e) => {
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
        if (localStorage.getItem('token') && validateAreaSize()) {
            setErrorSize('');
            try {
                setIsLoadingInside(true)
                const newShops = [...shops];
                AXIOS.put('shops/edit', data).then(res => {
                    if (res.data != null) {
                        newShops.forEach((e, index) => {
                            if (e.id === res.data.id) {
                                newShops[index] = res.data;
                            }
                        })
                        setShops(newShops);
                        setName('');
                        setLatitude('');
                        setLongitude('');
                        setSize('');
                        setIsLoadingInside(false);
                        setAddOrEdit(false)
                    } else {
                        setIsLoadingInside(false);
                    }
                });
            } catch (e) {
                console.error(e)
            }
        }else{
            setErrorSize("Must be from 1 to 10000!")
        }
    }

    const del = (item) => {
        setIdForDel(item.id);
    }

    const deleteShop = async () => {
        const newShops = [...shops];
        try {
            setIsLoadingInside(true)
            const data = {
                id: idForDel
            }
            await AXIOS.delete('shops/delete', {data: data}).then(resp => {
                    if (resp.data != null) {
                        newShops.forEach((e, index) => {
                            if (e.id === idForDel) {
                                newShops.splice(index, 1);
                            }
                        })
                        setShops(newShops);
                        setIsLoadingInside(false);
                    } else {
                        setIsLoadingInside(false);
                    }
                }
            );
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        console.log("effect deleting...") // todo? render with component
        if (idForDel > 0) {
            deleteShop().then(res => res);
        }
    }, [idForDel]);

    useEffect(() => {
        console.log(' effect fetch product')
        fetchShops();
    }, [])


    return (
        isLoading ? MySpinner :
            <div className={styles.container}>
                <div className={styles.googleMaps}>
                    {/*<MyGoogleMap/>*/}
                    <a href='https://www.latlong.net/' target="_blank" rel="linked" className={styles.coord}>Get
                        coordinates</a>
                </div>
                <div className={styles.addProdCont}>
                    <div className={styles.contForm}>
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
                                       placeholder="Input area size"
                                       name="areaSize"
                                       value={areaSize}
                                       onChange={(e) => {
                                           setSize(e.target.value)
                                       }}
                                />
                                {ErrorAreaSize ? <div className="error">{ErrorAreaSize}
                                    </div>
                                    : null}

                                <TransitionGroup>
                                    {isLoadingInside ? SpinnerInside : <div></div>}
                                    {!AddOrEdit ?
                                        <div className={styles.buttonAdd}>
                                            <button className={styles.navLink} onClick={addProduct}>Add</button>
                                        </div> :
                                        <CSSTransition
                                            in={AddOrEdit}
                                            timeout={1000}
                                            classNames="example"
                                        >
                                            <div className={styles.buttonAdd2}>
                                                <button className={styles.navLinkCancel} onClick={cancel}>Cancel
                                                </button>
                                                <button className={styles.navLink} onClick={editProd}>Edit</button>
                                            </div>
                                        </CSSTransition>
                                    }</TransitionGroup>
                            </div>
                        </form>
                    </div>

                </div>
                <div>
                    <TransitionGroup>
                        {
                            shops.map((item, index) =>
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

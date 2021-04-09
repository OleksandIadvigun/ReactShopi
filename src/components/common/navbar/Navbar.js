import React from 'react';
import styles from './Navbar.module.css'
import {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import {Redirect} from "react-router";
import LoginService from "../../../services/LoginService";
import ContexLoggedUser from "../../../ContexLoggedUser";
import MyContext from "../../../MyContext";

export const Navbar = ({unSetUser}) => {

    const [activeStep, setMenuClick] = useState(0);
    const [loggedUser, setLogged] = useState(false);
    const [burger, setBurger] = useState(false);
    useEffect(() => {
    }, [activeStep])
    useEffect(() => {
        if(localStorage.getItem('user')){
            console.log(localStorage.getItem('user') , " in useEsf logged user")
            setLogged(true);
        }
    }, [loggedUser])
    const {deleteUserFromLocalStorage,deleteTokenFromLocalStorage} = LoginService();
    return (
            <div className={styles.navbarItems} >
                <ContexLoggedUser.Consumer>
                    {value=>{if(value){
                        setLogged(true)
                    }}}
                </ContexLoggedUser.Consumer>

                <ul className={burger? styles.navBarActive: styles.navBarClosed } >
                    <div className={burger? styles.navLinkClose: styles.disabled} onClick={()=>{
                        setBurger(false);
                    }}>X</div>
                    <Link to="/" className={activeStep === 1 ? styles.navLinkClicked : styles.navLink
                    }
                          onClick={() => {
                              console.log("IN clicked...")
                              setMenuClick(1)
                              setBurger(false);
                          }}>Home</Link>
                    <Link to="/alarms" className={activeStep === 2 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(2)
                           setBurger(false);
                       }}>Alarms</Link>
                    <Link to="/products" className={activeStep === 3 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(3)
                           setBurger(false);
                       }}>Products</Link>
                    <Link to="/shops" className={activeStep === 4 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(4)
                           setBurger(false);
                       }}>Shops</Link>
                    <Link to="/login" className={ loggedUser ? styles.disabled : styles.navLink &&

                        activeStep === 5 ? styles.navLinkClicked : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(5)
                           setBurger(false);
                       }}>Log in</Link>
                    <Link to="/login" className={activeStep === 6 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN log out...")
                           deleteUserFromLocalStorage();
                           deleteTokenFromLocalStorage();
                           unSetUser();
                           setMenuClick(5)
                           setLogged(false);
                           setBurger(false);
                           // console.log(JSON.parse(localStorage.getItem('user')) , " user From LOCAL")



                       }}>Logout</Link>
                    <Link to="/registration" className={activeStep === 7 ? styles.navLinkClicked : styles.navLink &&
                    loggedUser ? styles.disabled : styles.navLink
                    }
                          onClick={() => {
                              console.log("IN clicked...")
                              setMenuClick(7)
                              setBurger(false);
                          }}

                    >Sing up</Link>
                    {loggedUser?
                        <MyContext.Consumer>
                            {value => {if(value){
                                // console.log(value + "VALUEEEEEE")
                                return <Link to={'loggedIn'} className={styles.navLink} onClick={()=>{
                                    setMenuClick(0)
                                    setBurger(false);}
                                }>{value}</Link>}}}
                        </MyContext.Consumer>
                        :""}
                </ul>
                    <div className={!burger? styles.menuBtn: styles.menuBtnClosed} onClick={()=>{
                        setBurger(!burger);
                    }}>
                    <span></span>
                    </div>
         </div>
    );
}

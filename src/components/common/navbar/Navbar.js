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
    useEffect(() => {
        // console.log("active step effect used")
    }, [activeStep])
    useEffect(() => {
        if(localStorage.getItem('user')){
            // console.log(localStorage.getItem('user') , " in useEsf logged user")
            setLogged(true);
        }
    }, [loggedUser])
    const {deleteUserFromLocalStorage} = LoginService();
    return (
        <div>
            <ContexLoggedUser.Consumer>
                {value=>{if(value){
                    // console.log("Set Status true in Nav Bar")
                    setLogged(true)
                }}}
            </ContexLoggedUser.Consumer>
            <div className={styles.navbarItems}>
                <ul className={styles.navBarActive}>
                    <Link to="/" className={activeStep === 1 ? styles.navLinkClicked : styles.navLink
                    // && loggedUser ? styles.disabled : styles.navLink
                    }
                          onClick={() => {
                              console.log("IN clicked...")
                              setMenuClick(1)
                          }}>Home</Link>
                    <a href="/about" className={activeStep === 2 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(2)
                       }}>Alarms</a>
                    <Link to="/products" className={activeStep === 3 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(3)
                       }}>Products</Link>
                    <Link to="/shops" className={activeStep === 4 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(4)
                       }}>Shops</Link>
                    <Link to="/login" className={ loggedUser ? styles.disabled : styles.navLink &&

                        activeStep === 5 ? styles.navLinkClicked : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(5)
                       }}>Log in</Link>
                    <Link to="/login" className={activeStep === 6 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN log out...")
                           deleteUserFromLocalStorage();
                           unSetUser();
                           setMenuClick(5)
                           setLogged(false);
                           // console.log(JSON.parse(localStorage.getItem('user')) , " user From LOCAL")



                       }}>Log out</Link>
                    <Link to="/registration" className={activeStep === 7 ? styles.navLinkClicked : styles.navLink &&
                    loggedUser ? styles.disabled : styles.navLink
                    }
                          onClick={() => {
                              console.log("IN clicked...")
                              setMenuClick(7)
                          }}

                    >Sing up</Link>
                </ul>
                {loggedUser?
                    <MyContext.Consumer>
                        {value => {if(value){
                            // console.log(value + "VALUEEEEEE")
                            return <Link to={'loggedIn'} className={styles.username} onClick={()=>{
                                setMenuClick(0)}
                            }>{value}</Link>}}}
                    </MyContext.Consumer>
                    :""}
            </div>
        </div>
    );
}

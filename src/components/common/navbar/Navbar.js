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

export const Navbar = () => {

    const [activeStep, setMenuClick] = useState(1);
    const [loggedUser, setLogged] = useState(true);
    useEffect(() => {
        console.log("effect used")
    }, [activeStep])
    useEffect(() => {
        console.log("effect used")
    }, [loggedUser])
    return (
        <div>
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
                    <a href="/blog" className={activeStep === 5 ? styles.navLinkClicked : styles.navLink &&
                    loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(5)
                       }}>Log in</a>
                    <a href="/blog" className={activeStep === 6 ? styles.navLinkClicked : styles.navLink &&
                    !loggedUser ? styles.disabled : styles.navLink
                    }
                       onClick={() => {
                           console.log("IN clicked...")
                           setMenuClick(6)
                       }}>Log out</a>
                    <Link to="/registration" className={activeStep === 7 ? styles.navLinkClicked : styles.navLink &&
                    loggedUser ? styles.disabled : styles.navLink
                    }
                          onClick={() => {
                              console.log("IN clicked...")
                              setMenuClick(7)
                          }}

                    >Sing up</Link>
                </ul>
            </div>

        </div>
    );
}

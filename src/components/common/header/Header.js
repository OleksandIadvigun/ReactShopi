import React, {Component, useContext, useState} from 'react';
import styles from './Header.module.css'
import {Navbar} from "../navbar";
import MyContext from "../../../MyContext";
import ContexLoggedUser from "../../../ContexLoggedUser";
import {Link} from "react-router-dom";





// todo ????? try to insert Provider here, to sent data into Navbar , userStatus after login from App
export default function  Header({unSetUser}) {

        return (
            <div>
                <section className={styles.headerTop}>
                    <img className={styles.headerTopLogo} src={process.env.PUBLIC_URL + "/photos/spinner.png"}
                         height="70px"/>
                    <Navbar  unSetUser={unSetUser}/>
                </section>
                {/*<div className={styles.headerTopSeparator}></div>*/}
            </div>
        );
}


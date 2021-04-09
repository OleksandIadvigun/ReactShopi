import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import BaseLayout from "./layouts/BaseLayout";
import {Home} from "./pages";
import {HomeShopi} from "./pages/HomeShopi";
import MainFormReg from "./components/formRegistration/MainFormReg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter, BrowserRouter, NavLink
} from 'react-router-dom';
import Products from "./components/products/Products";
import Shops from "./components/shops/Shops";
import ConfirmAccount from "./components/confirmAccount/ConfirmAccount";
import LogIn from "./components/log-in/LogIn";
import UserInfo from "./components/log-in/UserInfo";
import MyContext from "./MyContext";
import ContexLoggedUser from "./ContexLoggedUser";
import EditForm from "./components/formRegistration/EditForm";
import Alarms from "./components/alarms/Alarms";
import {CSSTransition} from "react-transition-group";

export default class App extends React.Component {
    username = JSON.parse(localStorage.getItem('user'))?.username
    state = {
        logIn: this.username,
        status: false
    }

    setUserName = (data) => {
        this.setState({status: true})
        this.setState({logIn: data});
    }

    unSetUserName = () => {
        this.setState({logIn: null});
        this.setState({status: false})
    }

render()

{
    return (

        <MyContext.Provider value={this.state.logIn}>
            <ContexLoggedUser.Provider value={this.state.status}>
                <Router>
                        <BaseLayout unSetUser={this.unSetUserName}>
                            <Switch>
                                <Route path={'/'} exact={true} render={() => <HomeShopi/>}/>
                                <Route path={'/registration'} exact={true} render={() => <MainFormReg/>}/>
                                <Route path={'/products'} render={() => <Products/>}/>
                                <Route path={'/shops'} render={() => <Shops/>}/>
                                <Route path={'/alarms'} render={() => <Alarms/>}/>
                                <Route path={'/confirm/:id'} render={() => <ConfirmAccount/>}/>
                                <Route path={'/login'} render={() => <LogIn setUserName={this.setUserName}/>}/>
                                <Route path={'/loggedIn'} render={() => <UserInfo/>}/>
                                <Route path={'/editUser'} render={() => <EditForm />}/>
                            </Switch>
                        </BaseLayout>
                </Router>
            </ContexLoggedUser.Provider>
        </MyContext.Provider>
    );
}
}


import React, {Component} from 'react';
import Field from "../formRegistration/Field";
import AuthService from "../../services/AuthService";
import './Login.css';
import {Redirect} from "react-router";
import LoginService from "../../services/LoginService";

class LogIn extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            responseError: '',
            login: false,
            errors: {
                username: false,
                password: false,
                repeatPassword: false,
            },
        }
    }


    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({responseError:""})
        let obj = {
            username: this.state.username,
            password: this.state.password
        }
        // this.validation();
        if (Object.keys(this.validation()).length === 0) {
            console.log(obj);
            const {LogIn} = AuthService();
            const{saveUserToLocalStorage, saveTokenToLocalStorage} = LoginService();
            LogIn(obj).then(value => {
                if (!value.data) {
                    this.setState({responseError: "Login or password is incorrect!"})
                    console.log(this.state.responseError);
                } else {
                    const{setUserName} = this.props;
                    saveUserToLocalStorage(value.data);
                    saveTokenToLocalStorage(value.data.token);
                    setUserName(value.data.username);
                    console.log(value.data.id+" id user")
                }
            }).catch(
                error => {
                    console.log(error, "error!!!!  + ")
                    if (error.toString().includes('401')) {
                        this.setState({responseError: "Your account is not activated!!"}
                        )
                    } else {
                        this.setState({responseError: "Error, check your network connection!"})
                    }
                }
            ).then(value => {
                console.log(this.state.responseError,"response ereror state")
                console.log(this.state.errors, 'this errors st')
                if(!this.state.responseError ){
                    this.setState({login: true})
                }
            });
        }
    }
    validation = () => {
        const {
            username,
            password,
            repeatPassword

        } = this.state;

        const errors = {};
        if
        (username.length < 5) {
            errors.username = "Minimum 5 charters required";
        }
        if (!password) {
            errors.password = "Required";
        }
        if (repeatPassword !== password) {
            errors.repeatPassword = "Must be the same as password!";
        }

        this.setState({errors: errors})

        // if (Object.keys(errors).length === 0) {
        // }

        return errors;

    }

    render() {
        if(this.state.login){
          return  <Redirect to={'/loggedIn'}  />
        }

        return (

            <div className="M ">
                <form className="form card-body">
                    <div>{this.state.responseError ?
                        <div className="error">{this.state.responseError}</div> : ""}
                    </div>
                    <Field
                        id="username"
                        labelText="Username"
                        type="text"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={this.onChange}
                        name="username"
                        error={this.state.errors.username}
                    />
                    <Field
                        id="password"
                        labelText="Password"
                        type="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        error={this.state.errors.password}

                    />
                    <Field
                        id="repeatPassword"
                        labelText="Repeat password"
                        type="password"
                        placeholder="Repeat password"
                        value={this.state.repeatPassword}
                        onChange={this.onChange}
                        name="repeatPassword"
                        error={this.state.errors.repeatPassword}
                    />
                    <button type="submit" id="sub" className="btn btn-primary w-50" onClick={this.onSubmit}>Log in
                    </button>
                </form>
            </div>
        );
    }
}

export default LogIn;

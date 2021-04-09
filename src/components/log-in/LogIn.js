import React, {Component} from 'react';
import Field from "../formRegistration/Field";
import AuthService from "../../services/AuthService";
import './Login.css';
import {Redirect} from "react-router";
import LoginService from "../../services/LoginService";
import MySpinner from "../spinner/MySpinner";
import RespAfterEdit from "../formRegistration/RespAfterEdit";
import SpinnerInside from "../spinner/SpinnerInside";

class LogIn extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            responseError: '',
            email: '',
            response: '',
            login: false,
            loader: false,
            forgot: false,
            successForgotPass: false,
            errors: {
                username: false,
                password: false,
                email: false
            },
        }
    }


    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    }

    resetPassword = (obj) => {
        try {
            console.log(obj);
            this.setState({loader: true});
            const {resetPassword} = LoginService();
            resetPassword(obj).then(value => {
                if (!value.data) {
                    this.setState({responseError: "This email is not registered!"})
                    console.log(this.state.responseError);
                } else {
                    console.log(value.data.toString() + " Email from server")
                    this.setState({response: value.data.toString})
                }
            }).catch(
                error => {
                    console.log(error, "error!!!!  + ")
                    this.setState({responseError: "Error, check your network connection!"})
                }
            ).then(value => {
                if (!this.state.responseError) {
                    this.setState({loader: false});
                    this.setState({successForgotPass: true})
                    setTimeout(() => {
                        this.setState({successForgotPass: false})
                        this.setState({forgot: false})
                    }, 5000)
                } else {
                    this.setState({loader: false});
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    submitLogin = (obj) => {
        try {
            console.log(obj);
            this.setState({loader: true});
            const {LogIn} = AuthService();
            const {saveUserToLocalStorage, saveTokenToLocalStorage} = LoginService();
            LogIn(obj).then(value => {
                if (!value.data) {
                    this.setState({responseError: "Login or password is incorrect!"})
                    console.log(this.state.responseError);
                } else {
                    const {setUserName} = this.props;
                    saveUserToLocalStorage(value.data);
                    saveTokenToLocalStorage(value.data.token);
                    setUserName(value.data.username);
                    console.log(value.data.id + " id user")
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
                if (!this.state.responseError) {
                    this.setState({loader: false});
                    this.setState({login: true})
                } else {
                    this.setState({loader: false});
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({responseError: ""})
        if (this.state.forgot) {
            this.setState({errors: ''});
            console.log("inside Rest")
            let obj = {
                email: this.state.email
            }
            let IsError = false;
            if (!this.state.email.includes("@")) {
                this.setState({errors: {email: "Please, input correct email address"}});
                IsError = true;
            }
            console.log("isError: " + IsError)
            if (!IsError) {
                console.log("Inside before resfunc")
                this.resetPassword(obj);
            }
        } else {
            let obj = {
                username: this.state.username,
                password: this.state.password
            }
            if (Object.keys(this.validation()).length === 0) {
                this.submitLogin(obj)
            }
        }
    }

    validation = () => {
        const {
            username,
            password

        } = this.state;

        const errors = {};
        if
        (username.length < 5) {
            errors.username = "Minimum 5 charters required";
        }
        if (!password) {
            errors.password = "Required";
        }

        this.setState({errors: errors})

        // if (Object.keys(errors).length === 0) {
        // }

        return errors;

    }

    render() {
        if (this.state.login) {
            return <Redirect to={'/loggedIn'}/>
        }
        let message = "New password has been sent to your email"
        return (
            this.state.successForgotPass ?

                <div className="responseLog"><RespAfterEdit data={this.state.response} message={message}
                /></div> :
                <div className="M ">
                    <div className="center ">
                        <form className="form card-body">
                            <div>{this.state.responseError ?
                                <div className="error">{this.state.responseError}</div> : ""}
                            </div>
                            {!this.state.forgot ?
                                <div><Field
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
                                    <div className="containerForgotPass">
                                        <div className="forgotPass" onClick={() => {
                                            this.setState({forgot: true})
                                            this.setState({responseError: ''})
                                        }
                                        }>Forgot password?
                                        </div>
                                    </div>
                                    <br/></div> :
                                <div>
                                    <div className="titlePassword">Forgot password?</div>
                                    <Field
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name="email"
                                        error={this.state.errors.email}
                                    />
                                    <br/>
                                </div>

                            }


                            {this.state.loader ? SpinnerInside : <div></div>}
                            {this.state.forgot ?
                                <div className="containerButtons">
                                    <div className="back" onClick={() => {
                                        this.setState({forgot: false});
                                        this.setState({responseError: ''})
                                    }}>
                                        <div className="arrow-left">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <button type="submit" id="sub" className="btn btn-primary w-50"
                                            onClick={this.onSubmit}>Reset password
                                    </button>
                                </div>
                                :
                                <button type="submit" id="sub" className="btn btn-primary w-50"
                                        onClick={this.onSubmit}>Log
                                    in</button>
                            }
                        </form>
                    </div>
                </div>
        );
    }
}

export default LogIn;

import './FormReg.css';
import React from "react";
import Basic from "./Basic";
import Contacts from "./Contacts";
import Avatar from "./Avatar";
import Finish from "./Finish";
import Steps from "./Steps";
import RegisterService from "../../services/RegisterService";
import ResponseAfterReg from "./ResponseAfterReg";
import MySpinner from "../spinner/MySpinner";
import SpinnerInside from "../spinner/SpinnerInside";

export default class MainFormReg extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            repeatPassword: "",
            loader: false,
            address: {
                country: "",
                city: ""
            },
            sex: "male",
            agree: false,
            logo: null,
            age: 16,
            step: 1,
            doneStep: 0,
            email: '',
            mobile: '',
            response: '',
            errors: {
                username: false,
                firstname: false,
                lastname: false,
                password: false,
                repeatPassword: false,
                age: false,
                email: false,
                mobile: false

            }
        };
    }


    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.agree) {
            try {
                this.setState({loader: true});
                const {sendNewUser} = RegisterService();
                sendNewUser(this.state).then(value => {
                        if (value.data != null) {
                            this.setState({response: value.data})
                            this.setState({loader: false});
                            this.setState({step: 4})
                            this.setState({doneStep: 0})
                        } else {
                            this.setState({loader: false});
                            this.setState({response: "No response from server"})
                        }
                    }
                );
                console.log("Success!!! Added to DB", this.state)
            } catch (e) {
                console.log(e)
            }
        }
    }

    validation = () => {
        const {
            step,
            username,
            password,
            repeatPassword,
            email,
            mobile,
            age,
            agree,
            firstname,
            lastname

        } = this.state;

        const errors = {};

        switch (step) {
            case 1:
                if
                (username.length < 5 || username.length > 10) {
                    errors.username = "Required from 5 to 10 charters";
                }
                if
                (firstname.length < 2 || firstname.length > 15) {
                    errors.firstname = "Required from 2 to 15 charters";
                }
                if
                (lastname.length < 2 || lastname.length > 15) {
                    errors.lastname = "Required from 2 to 15 charters";
                }
                if (!password) {
                    errors.password = "Required";
                }
                if (repeatPassword !== password) {
                    errors.repeatPassword = "Must be the same as password!";
                }
                if (age < 16) {
                    errors.age = "Your age should be under 16!";
                }
                break;
            case 2:
                if
                (mobile.length < 10) {
                    errors.mobile = "Minimum 10 numbers required";
                }
                if
                (!email.includes("@")) {
                    errors.email = "Please, input correct email address";
                }
                break;

            case 4:
                if
                (!agree) {
                    errors.mobile = "Please accept the rules!";
                }
                break;
            default:
        }

        this.setState({errors: errors})


        return errors;

    }


    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    }

    onSelectCountry = (event) => {
        console.log(event.target.name, "ev t n");
        console.log(event.target.value);
        const address = {};
        if (event.target.name === "country") {
            address.country = event.target.value;
            address.city = '';
        } else {
            address.country = this.state.address.country;
            address.city = event.target.value;
        }
        this.setState({address: address})
    }


    decrementAge = () => {
        this.setState((prevState, prevProps) => ({age: prevState.age - 1}),
            () => {
                this.setState({
                    errors: {
                        age: this.state.age >= 16 ? false : "Must be more than 16"
                    }
                });
            }
        )
    };

    incrementAge = () => {
        this.setState((prestate) => ({age: prestate.age + 1}),
            () => {
                this.setState({
                    errors: {
                        age: this.state.age >= 16 ? false : "Must be more than 16"
                    }
                });
            })
    };

    nextPage = (e) => {          // todo ???
        e.preventDefault();
        const errors = this.validation();
        this.setState({response: ''})
        const isError = Object.keys(errors).length;
        const err = {};
        if (isError === 0) {
            if (this.state.doneStep <= 1 && this.state.step <= 2) {
                console.log("in method check")
                const {checkLoginAndEmail} = RegisterService();
                let data = {
                    username: this.state.username,
                    email: this.state.email
                }
                checkLoginAndEmail(data).then(value => {
                    console.log("checkong log.." + data.username, data.email)
                    if (value.data.toString().includes('Username') || value.data.toString().includes('Email')) {
                        console.log("val:", value.data.toString(), "dataVal")
                        // this.setState({response: value.data})
                        this.setState({
                            errors: {
                                email: "Email is already exist!",
                                username: "Username is already exist!"
                            }
                        })

                    } else {
                        console.log("next")
                        this.setState({doneStep: this.state.doneStep + 1})
                        this.setState({step: this.state.step + 1})
                    }
                }).catch(error => {
                    console.log(error + " er from server")
                })
            }
        }
    }

    prevPage = () => {
        if (this.state.step >= 2) {
            this.setState({doneStep: this.state.doneStep - 1})
            this.setState({step: this.state.step - 1})
        }
    }

    render() {

        return (
            this.state.step === 4 ?
                <div className="response">
                    <ResponseAfterReg data={this.state.response}
                    />
                </div>
                :
                <div className="MyContainer">
                    {this.state.loader ? SpinnerInside : <div></div>}
                    <div className="pagination">
                        <button type="button"
                                className={` ${this.state.doneStep === 0 ? 'navLinkPrevClicked' : 'navLinkPrev'} `}
                                onClick={this.prevPage}
                        >
                        </button>
                    </div>
                    <div className={this.state.step < 4 ? "form-container card" : " empty"}>
                        <Steps step={this.state.step} doneStep={this.state.doneStep}/>
                        <form className="form card-body">
                            {this.state.step === 1 && (
                                <Basic
                                    username={this.state.username}
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    password={this.state.password}
                                    repeatPassword={this.state.repeatPassword}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                    gender={this.state.sex}
                                    age={this.state.age}
                                    decrementAge={this.decrementAge}
                                    incrementAge={this.incrementAge}
                                    response={this.state.response}

                                />)}
                            {this.state.step === 2 && (
                                <Contacts
                                    country={this.state.address.country}
                                    onChange={this.onChange}
                                    onSelect={this.onSelectCountry}
                                    getOptions={this.getOptions}
                                    city={this.state.address.city}
                                    mobile={this.state.mobile}
                                    errors={this.state.errors}
                                    email={this.state.email}
                                    response={this.state.response}

                                />
                            )}
                            {this.state.step === 3 && (
                                <Finish
                                    onChange={this.onChange}
                                    avatar={this.state.logo}
                                    name={this.state.username}
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    age={this.state.age}
                                    email={this.state.email}
                                    mobile={this.state.mobile}
                                    country={this.state.address.country}
                                    city={this.state.address.city}
                                    agree={this.state.agree}
                                    onSubmit={this.onSubmit}
                                    edit={false}
                                />
                            )}
                        </form>
                    </div>
                    <div className="pagination">
                        <button type="button" id="id-w"
                                className={` ${this.state.doneStep === 2 ? 'navLinkNextClicked' : 'navLinkNext'} `}
                                onClick={this.nextPage}
                        >
                        </button>
                    </div>
                </div>

        );
    }
}

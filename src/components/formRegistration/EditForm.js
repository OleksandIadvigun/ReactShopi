import './FormReg.css';
import React from "react";
import Basic from "./Basic";
import Contacts from "./Contacts";
import Finish from "./Finish";
import Steps from "./Steps";
import RespAfterEdit from "./RespAfterEdit";
import UserService from "../../services/UserService";
import MySpinner from "../spinner/MySpinner";
import SpinnerInside from "../spinner/SpinnerInside";

export default class EditForm extends React.Component {
    constructor() {
        super();
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromStorage != null) {
            console.log(userFromStorage, " userFromStorage")
            this.state = {
                username: userFromStorage.username,
                firstname: userFromStorage.firstname,
                lastname: userFromStorage.lastname,
                password: "",
                repeatPassword: "",
                loader: false,
                address: {
                    country: userFromStorage.address.country,
                    city: userFromStorage.address.city
                },
                sex: userFromStorage.sex,
                agree: false,
                logo: null,
                age: userFromStorage.age,
                step: 1,
                doneStep: 0,
                email: userFromStorage.email,
                mobile: userFromStorage.mobile,
                response: '',
                errors: {
                    username: false,
                    password: false,
                    repeatPassword: false,
                    age: false,
                    email: false,
                    mobile: false

                }
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.agree) {
            try {
                this.setState({loader: true})
                const {editUser} = UserService();
                editUser(this.state).then(value => {
                        if (value.data != null) {
                            localStorage.setItem('user', JSON.stringify(value.data));
                            this.setState({step: 4})
                            this.setState({doneStep: 0})
                            this.setState({loader: false})
                        } else {
                            this.setState({loader: false})
                        }
                    }
                );
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
                (username.length < 5) {
                    errors.username = "Minimum 5 charters required";
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
                    errors.email = "Enter correct email with @";
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

    nextPage = (e) => {
        e.preventDefault();
        const errors = this.validation();
        const isError = Object.keys(errors).length;
        if (isError === 0) {
            console.log("next")
            this.setState({doneStep: this.state.doneStep + 1})
            this.setState({step: this.state.step + 1})
        }
    }

    prevPage = () => {
        if (this.state.step >= 2) {
            this.setState({doneStep: this.state.doneStep - 1})
            this.setState({step: this.state.step - 1})
        }
    }

    render() {
        const message = 'Success! The user has been edited.';
        return (
            this.state.step === 4 ?
                <div>
                    <RespAfterEdit data={this.state.response} message={message}
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
                                    edit={true}
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

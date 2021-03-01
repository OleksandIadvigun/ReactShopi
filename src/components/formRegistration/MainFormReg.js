
import './FormReg.css';
import React from "react";
import Basic from "./Basic";
import Contacts from "./Contacts";
import Avatar from "./Avatar";
import Finish from "./Finish";
import Steps from "./Steps";

export default class MainFormReg extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
            country: "",
            city: "",
            gender: "male",
            agree: false,
            avatar: "",
            age: 16,
            step: 1,
            doneStep: 0,
            email: '',
            mobile: '',
            errors: {
                username: false,
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
            console.log("Success!!! Added to DB" , this.state)
            alert("Success!!!")
        }
    }

    validation = () => {
        const{
            step,
            username,
            password,
            repeatPassword,
            email,
            mobile,
            age,
            agree

        }=this.state;

        const errors = {};

        switch (step) {
            case 1:
                if
                (username.length < 5)
                {
                    errors.username = "Minimum 5 charters required";
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
                (mobile.length < 10)
                {
                    errors.mobile = "Minimum 10 numbers required";
                }
                if
                (!email.includes("@"))
                {
                    errors.email = "Enter correct email with @";
                }
                break;

            case 4:
                if
                (!agree)
                {
                    errors.mobile = "Please accept the rules!";
                }
                break;
            default:
        }

        this.setState({errors: errors})

        if (Object.keys(errors).length === 0) {
        }

        return errors;

    }


    onChange = (event) => {
        if(event.target.name==="country"){
            this.setState({city:""})
        }

        this.setState({[event.target.name]: event.target.value})

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
        if (Object.keys(errors).length === 0) {
            this.setState({doneStep: this.state.doneStep + 1 })
            this.setState({step: this.state.step + 1 })
        }
    }

    prevPage = () => {
        if(this.state.step >=2) {
            this.setState({doneStep: this.state.doneStep - 1})
            this.setState({step: this.state.step - 1})
        }
    }

    render() {

        return (

            <div className="form-container card">
                <Steps step={this.state.step} doneStep={this.state.doneStep}/>
                <form className="form card-body">
                    {this.state.step === 1 && (
                        <Basic
                            username={this.state.username}
                            password={this.state.password}
                            repeatPassword={this.state.repeatPassword}
                            onChange={this.onChange}
                            errors={this.state.errors}
                            gender={this.state.gender}
                            age={this.state.age}
                            decrementAge={this.decrementAge}
                            incrementAge={this.incrementAge}

                        />)}
                    {this.state.step === 2 && (
                        <Contacts
                            country={this.state.country}
                            onChange={this.onChange}
                            getOptions={this.getOptions}
                            city={this.state.city}
                            mobile={this.state.mobile}
                            errors={this.state.errors}
                            email={this.state.email}

                        />
                    )}
                    {this.state.step === 3 && (
                        <Avatar
                            avatar={this.state.avatar}
                            onChange={this.onChange}

                        />
                    )}
                    {this.state.step === 4 && (
                        <Finish
                            onChange={this.onChange}
                            avatar={this.state.avatar}
                            name={this.state.username}
                            age={this.state.age}
                            email={this.state.email}
                            mobile = {this.state.mobile}
                            country= {this.state.country}
                            city={this.state.city}
                            agree={this.state.agree}
                            onSubmit={this.onSubmit}
                        />
                    )}

                </form>
                <div className="pagination">
                    <button type="button" className={` ${this.state.doneStep===0 ? 'navLink navLinkClicked'  : 'navLink'} `}
                            onClick={this.prevPage}
                    >Previous</button>
                    <button type="button" id="id-w" className={` ${this.state.doneStep===3 ? ' navLink navLinkClicked ' : 'navLink'} `}
                            onClick={this.nextPage}
                    >Next</button>
                </div>
            </div>
        );
    }
}

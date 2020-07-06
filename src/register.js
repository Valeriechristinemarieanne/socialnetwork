import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        /* console.log("this.state: ", this.state); */
    }
    registerMe(e) {
        e.preventDefault();
        /* console.log("I want to register"); */
        /* console.log("this in post register: ", this); */
        /* console.log("state in post register: ", state); */
        axios
            .post("/register", this.state)
            .then(function (response) {
                /* console.log("response from POST/Register", response); */
                location.replace("/");
            })
            .catch(function (err) {
                console.log("err in POST/Register:", err);
            });
    }
    render() {
        return (
            <div className="registercontainer">
                <img src="/my-logo.png" />

                <input
                    name="first"
                    placeholder="First name"
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="Last name"
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={(e) => this.registerMe(e)}>Register</button>
                <Link to="/login">Login</Link>
            </div>
        );
    }
}

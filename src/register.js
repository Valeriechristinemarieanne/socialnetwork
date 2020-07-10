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
            error: false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        /* console.log("this.state: ", this.state); */
    }
    registerMe(e) {
        const self = this;
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
                console.log("this in axios post register: ", self);
                self.setState({ error: true });
            });
    }
    render() {
        return (
            <div className="registercontainer">
                <img src="/my-logo.png" />
                <p>
                    <strong>
                        Meet new friends & create meaningful relations.
                    </strong>
                </p>
                <div>{this.state.error && <p>Something went wrong</p>}</div>
                <div className="registerinputcontainer">
                    <input
                        name="first"
                        placeholder="First name"
                        type="text"
                        autocomplete="off"
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                    <input
                        name="last"
                        placeholder="Last name"
                        type="text"
                        autocomplete="off"
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        type="text"
                        autocomplete="off"
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        autocomplete="off"
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                    <button onClick={(e) => this.registerMe(e)}>
                        Sign up!
                    </button>
                    <p>
                        Already a part of our community? Go to{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

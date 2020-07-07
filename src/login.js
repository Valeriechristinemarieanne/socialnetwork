import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    logMe(e) {
        e.preventDefault();
        /* console.log("I want to log in"); */
        /* console.log("this in post log in: ", this); */
        /* console.log("state in post login: ", state); */
        axios
            .post("/login", this.state)
            .then(function (response) {
                /* console.log("response from POST/Login", response); */
                location.replace("/");
            })
            .catch(function (err) {
                console.log("err in POST/Login:", err);
            });
    }
    render() {
        return (
            <div className="logincontainer">
                <img src="/my-logo.png" />

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
                <button onClick={(e) => this.logMe(e)}>Login</button>
                <Link to="/resetpassword">Forgot your Password?</Link>
                <Link to="/register">Register first</Link>
            </div>
        );
    }
}

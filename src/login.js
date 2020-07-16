import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    logMe(e) {
        e.preventDefault();

        axios
            .post("/login", this.state)
            .then(function (response) {
                location.replace("/");
            })
            .catch(function (err) {
                console.log("err in POST/Login:", err);
                setState({ error: true });
            });
    }
    render() {
        return (
            <div className="logincontainer">
                <img src="/my-logo.png" />
                <div>{this.state.error && <p>Something went wrong</p>}</div>
                <div className="logincontainerinput">
                    {" "}
                    <input
                        autoComplete="off"
                        name="email"
                        placeholder="Email"
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        autoComplete="off"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.logMe(e)}>Login</button>
                    <p>
                        {" "}
                        Forgot your Password?{" "}
                        <Link to="/resetpassword">Reset</Link>
                    </p>
                    <p>
                        <Link to="/">Register first</Link>{" "}
                    </p>
                </div>
            </div>
        );
    }
}

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
        this.logMe = this.logMe.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    logMe(e) {
        e.preventDefault();
        console.log("this.state: ", this.state);
        axios
            .post("/login", this.state)
            .then((response) => {
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                    console.log("response:", response);
                    console.log("this.state: ", this.state);
                }
            })
            .catch(function (err) {
                console.log("this.state: ", this.state);
                console.log("err in POST/Login:", err);
                this.setState({ error: true });
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
                        required
                    />
                    <input
                        autoComplete="off"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        required
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

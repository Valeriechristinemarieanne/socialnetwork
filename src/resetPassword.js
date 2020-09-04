import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = { apple: 10, email: "", code: "", password: "" };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick(e) {
        e.preventDefault();
        const self = this;
        axios
            .post("/resetpassword", self.state)
            .then(function (response) {
                self.setState({ apple: 11 });
            })
            .catch(function (err) {
                console.log("err in POST/resetpassword:", err);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this;
        axios
            .post("/verifypassword", self.state)
            .then(function (response) {
                self.setState({ apple: 12 });
            })
            .catch(function (err) {
                console.log("err in POST/verifypassword display2:", err);
            });
    }

    getCurrentDisplay() {
        if (this.state.apple == 10) {
            return (
                <div className="resetpassword">
                    <h3>Reset your Password</h3>
                    <p>
                        Please enter the e-mail address you are registered with
                    </p>
                    <input
                        name="email"
                        placeholder="Email"
                        key="email"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.handleClick(e)}>Submit</button>
                </div>
            );
        } else if (this.state.apple == 11) {
            return (
                <div className="resetpasswordcode">
                    <p>
                        Please enter the Code you have just received via email
                    </p>
                    <input
                        name="code"
                        placeholder="Code"
                        autocomplete="off"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        name="password"
                        placeholder="New Password"
                        key="password"
                        type="password"
                        autocomplete="off"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <h3> Your Password has successfully been reset ✌</h3>
                    <p>
                        All set up? Let's get you to{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}

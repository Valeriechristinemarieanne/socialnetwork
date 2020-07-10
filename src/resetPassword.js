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
        // console.log("Tryin' to handle a click here");
        const self = this;
        axios
            .post("/resetpassword", self.state)
            .then(function (response) {
                // console.log(
                //     "response from POST/password/reset/start",
                //     response
                // );
                console.log("self.state in post resetpassword: ", self.state);

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
                // console.log(
                //     "response from POST/password/reset/verify",
                //     response
                // );
                self.setState({ apple: 12 });
            })
            .catch(function (err) {
                console.log("err in POST/verifypassword display2:", err);
            });
    }

    getCurrentDisplay() {
        // we want to put something in state that indicates which display we want to show
        // we'll have to update this property in state whenever we want to show the next display. where in our code should we update this property in state???
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
                        autocomplete="off"
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

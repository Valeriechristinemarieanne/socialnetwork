import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = { apple: 10, email: "" };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick(e) {
        e.preventDefault();
        // console.log("Tryin' to handle a click here");

        axios
            .post("/resetpassword", this.state)
            .then(function (response) {
                console.log(
                    "response from POST/password/reset/start",
                    response
                );
            })
            .catch(function (err) {
                console.log("err in POST/resetpassword:", err);
            });
    }

    getCurrentDisplay() {
        // we want to put something in state that indicates which display we want to show
        // we'll have to update this property in state whenever we want to show the next display. where in our code should we update this property in state???
        if (this.state.apple == 10) {
            return (
                <div>
                    <h3>Reset your Password</h3>
                    <p>
                        Please enter the e-mail address you are registered with
                    </p>
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.handleClick(e)}>Submit</button>
                </div>
            );
            //   } else if () {
            //       return (
            //           <div>
            //               <input name='code' placeholder="Code"></input>
            //               <input name='r_password' placeholder="New Password"></input>
            //               <button onClick={(e) => this.handleClick(e)}>Submit</button>
            //           </div>
            //       )

            //   } else {
            //          <div>
            //               <h3> Your Password has successfully been reset ✌</h3>
            //           </div>
            //   }
        }
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}

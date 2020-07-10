import React from "react";
import Register from "./register";
import Login from "./login";
import resetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        // <div style={style}>
        <div>
            <h1>Let's get social !</h1>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={resetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}

import React from "react";
import Register from "./register";
import Login from "./login";
import resetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    let style = {
        color: "tomato",
    };
    return (
        <div style={style}>
            <h3>Welcome to my Social Network!</h3>
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
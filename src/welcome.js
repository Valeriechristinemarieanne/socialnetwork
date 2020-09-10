import React from "react";
import Register from "./register";
import Login from "./login";
import resetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
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

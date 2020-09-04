import React from "react";
import Registration from "./registerwithhooks";
import Login from "./login";
import resetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <h1>Let's get social !</h1>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={resetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}

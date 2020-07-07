import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;
if (location.pathname === "/welcome") {
    // runs if user is NOT logged in
    elem = <Welcome />;
} else {
    // runs if user IS logged in
    elem = <App />;
}

// ReactDOM.render is going to render our React code in the DOM
// We can only have ReactDOM.render once in our project
ReactDOM.render(elem, document.querySelector("main"));

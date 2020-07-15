import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/welcome") {
    // runs if user is NOT logged in
    elem = <Welcome />;
} else {
    // runs if user IS logged in
    // We are wrapping App in Provider and give it the redux-store so that App has access to redux

    elem = (
        <Provider store={store}>
            {" "}
            <App />
        </Provider>
    );
}

// ReactDOM.render is going to render our React code in the DOM
// We can only have ReactDOM.render once in our project
ReactDOM.render(elem, document.querySelector("main"));

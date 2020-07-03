import React from "react";
import Registration from "./registration";

export default function Welcome() {
    let style = {
        color: "tomato",
        textDecoration: "underline",
    };
    return (
        <div style={style}>
            Welcome to my Social Network!
            <Registration />
        </div>
    );
}

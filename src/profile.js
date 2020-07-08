import React from "react";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    console.log("props in profile: ", props);

    return (
        <div className="profilecontainer">
            <h1>This is the Profile Component</h1>
            <h2>My name is {props.first}</h2>

            <ProfilePic />
        </div>
    );
}

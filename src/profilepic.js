import React from "react";

export default function ProfilePic(props) {
    console.log("props in ProfilePic: ", props);

    return (
        <div>
            <h2>
                {props.first} {props.last}
            </h2>
            <img onClick={props.toggleModal} src={props.profilePic} />
        </div>
    );
}

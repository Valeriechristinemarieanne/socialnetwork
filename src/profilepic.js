import React from "react";

export default function ProfilePic(props) {
    console.log("props in ProfilePic: ", props);

    return (
        <div>
            <p onClick={props.toggleModal}>first name, last name</p>
            <img />
        </div>
    );
}

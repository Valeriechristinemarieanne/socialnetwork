import React from "react";

export default function ProfilePic(props) {
    return (
        <div className="profilepiccontainer">
            <img
                className="profilepic"
                src={props.url}
                onClick={props.toggleModal}
            />
        </div>
    );
}

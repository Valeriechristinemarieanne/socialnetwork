import React from "react";

export default function ProfilePic(props) {
    // console.log("props in ProfilePic: ", props);

    return (
        <div className="profilepiccontainer">
            {/* <h6>This is the profile Pic component</h6> */}
            <img
                className="profilepic"
                src={props.url}
                onClick={props.toggleModal}
            />
        </div>
    );
}

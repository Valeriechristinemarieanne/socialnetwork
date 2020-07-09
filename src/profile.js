import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    // console.log("props in profile: ", props);

    return (
        <div className="profilecontainer">
            <h2>
                Hi {props.first} {props.last} !
            </h2>
            <ProfilePic
                url={props.url}
                toggleModal={() => props.toggleModal()}
                setImage={() => props.setImage()}
            />

            <BioEditor bio={props.bio} setBio={() => props.setBio()} />
        </div>
    );
}

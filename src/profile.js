import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    // console.log("props in profile: ", props);

    return (
        <div className="profilecontainer">
            <ProfilePic
                url={props.url}
                toggleModal={() => props.toggleModal()}
                setImage={() => props.setImage()}
            />

            <div className="profiletext">
                <h2>
                    {props.first} {props.last}
                </h2>
                <BioEditor
                    bio={props.bio}
                    setBio={(newbio) => props.setBio(newbio)}
                />{" "}
            </div>
        </div>
    );
}

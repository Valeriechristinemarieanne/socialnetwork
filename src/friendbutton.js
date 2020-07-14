import React, { useEffect, useState } from "react";
import axios from "./axios";
import { render } from "react-dom";

export default function FriendButton({ id }) {
    console.log("props.id in FriendButton: ", id);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        axios.get(`/get-initial-status/${id}`).then(({ data }) => {
            console.log("data in useEffect is: ", data.rows);
            setButtonText("Send Friend Request");
        });

        return () => {
            console.log(`about to replace ${buttonText} with a new value`);
        };
    }, [id]);

    const handleClick = () => {
        axios.post(`/make-friend-request/${id}`).then(({ data }) => {
            console.log("data in handleClick: ", data);
            setButtonText("Cancel Friend Request");
        });
    };

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}

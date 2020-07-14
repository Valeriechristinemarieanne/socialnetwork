import React, { useEffect, useState } from "react";
import axios from "./axios";
import { render } from "react-dom";

export default function FriendButton({ id }) {
    console.log("props.id in FriendButton: ", id);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        if (id) {
            axios.get(`/get-initial-status/${id}`).then((response) => {
                console.log("response in useEffect is: ", response.data.id);
                if (response.data.id && response.data.accept == false) {
                    setButtonText("Cancel Friend Request");
                } else if (response.data.id && response.data.accept == true) {
                    setButtonText("End Friendship");
                } else if (!response.data.id) {
                    setButtonText("Send Friend Request");
                } else {
                    if (props.id != response.data.id) {
                        setButtonText("Accept Friend Request");
                    }
                }
            });
        } else {
            return;
        }
        return () => {
            console.log(`about to replace ${buttonText} with a new value`);
        };
    }, [id]);

    const handleClick = () => {
        if (buttonText == "Send Friend Request") {
            axios.post(`/make-friend-request/${id}`).then(({ data }) => {
                console.log("data in handleClick: ", data);
                setButtonText("Cancel Friend Request");
            });
        } else if (
            buttonText == "Cancel Friend Request" ||
            buttonText == "End Friendship"
        ) {
            axios.post(`/endfriendship/${id}`).then((data) => {
                console.log("data in handleClick: ", data);
                setButtonText("Send Friend Request");
            });
        } else {
            if (buttonText == "Accept Friend Request") {
                axios.post(`/accept-friend-request/${id}`).then((data) => {
                    console.log("data in handleClick: ", data);
                    setButtonText("End Friendship");
                });
            }
        }
    };

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}

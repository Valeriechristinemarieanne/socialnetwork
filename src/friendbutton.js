import React, { useEffect, useState } from "react";
import axios from "./axios";
import { render } from "react-dom";

export default function FriendButton({ id }) {
    console.log("props.id in FriendButton: ", id);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        axios.get("/get-initial-status/:id").then((response) => {
            console.log("data in first useEffect is: ", response.data.rows[0]);
            setButtonText(data.rows);
        });

        return () => {
            console.log(`about to replace ${buttonText} with a new value`);
        };
    }, []);

    /* useEffect(() => {
        axios.post("/make-friend-request/:id").then((data) => {
            console.log("data in first useEffect is: ", data.rows);
            setButtonText(data);
        });
    }, []); */

    const handleClick = () => {};

    if (buttonText != undefined) {
        return (
            <div>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        );
    } else {
        return (
            <div>
                <button>End Friendship</button>
            </div>
        );
    }
}

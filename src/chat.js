import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);
    /* console.log("Here are my last 10 chat messages", chatMessages);
     */
    // you want to run this function every time you get a new chat message
    useEffect(() => {
        /* console.log("elementRef: ", elemRef);
        console.log("scrollTop: ", elemRef.current.scrollTop);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        console.log("scrollHeight: ", elemRef.current.scrollHeight); */

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        /* console.log("value: ", e.target.value); */
        /* console.log(e.key); */

        if (e.key === "Enter") {
            e.preventDefault();
            /* console.log("our message: ", e.target.value); */
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div>
            <h4 className="chat-title">Welcome to our community chat</h4>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((each) => (
                        <div key={each.message_id}>
                            <p>{each.first} says </p>
                            <p>{each.message}</p>
                            <p>at {each.created_at}</p>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}

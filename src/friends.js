import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsWannabes } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    });
    const allFriends = useSelector((state) => state.first && state.last);
    // Don't forget to do if(there is an array, just like in friendbutton)
    if (allFriends) {
        return (
            <div>
                {allFriends.map((friend) => (
                    <div className="mappedusers" key={friend.id}>
                        <img className="mappedusersimg" src={friend.url} />
                        <h4>
                            <Link to={`/user/${friend.id}`}>
                                {friend.first} {friend.last}
                            </Link>
                        </h4>
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}

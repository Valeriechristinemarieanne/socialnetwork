import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsWannabes } from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    const friends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friend) => friend.accepted == true)
    );
    const wannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((wannabe) => wannabe.accepted == false)
    );

    if (!friends || !wannabes) {
        return null;
    }

    return (
        <div>
            <h4>Your friends</h4>
            {friends.map((friend) => (
                <div className="mappedusers" key={friend.id}>
                    <img className="mappedusersimg" src={friend.url} />
                    <h4>
                        <Link to={`/user/${friend.id}`}>
                            {friend.first} {friend.last}
                        </Link>
                    </h4>
                </div>
            ))}

            <h4>Accept new friends!</h4>

            {wannabes.map((wannabe) => (
                <div className="mappedusers" key={wannabe.id}>
                    <img className="mappedusersimg" src={wannabe.url} />
                    <h4>
                        <Link to={`/user/${wannabe.id}`}>
                            {wannabe.first} {wannabe.last}
                        </Link>
                    </h4>
                </div>
            ))}
        </div>
    );
}

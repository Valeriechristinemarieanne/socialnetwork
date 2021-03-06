// src/actions.js
import axios from "./axios";

// will contain all of our action creator functions
// action creator is just a function that returns an object with a property called TYPE
// object that it returns is called an action

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes/");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data.rows,
    };
}

export async function acceptFriendRequest(id) {
    const { data } = await axios.post(`/accept-friend-request/${id}`);
    console.log("data: ", data, id);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id,
    };
}

export async function unfriend(id) {
    const { data } = await axios.post(`/endfriendship/${id}`);
    console.log("data: ", data);
    return {
        type: "UNFRIEND",
        id,
    };
}

export function chatMessages(msgs) {
    return {
        type: "TEN_LAST_MESSAGES",
        msgs,
    };
}

export function chatMessage(msg) {
    console.log("msg", msg);
    return {
        type: "ADD_NEW_MESSAGE",
        msg,
    };
}

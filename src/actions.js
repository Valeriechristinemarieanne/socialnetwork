// src/actions.js
import axios from "axios";

// will contain all of our action creator functions
// action creator is just a function that returns an object with a property called TYPE
// object that it returns is called an action

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes/");
    console.log("data: ", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data,
    };
}

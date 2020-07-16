// src/reducer.js

// this is one big function with a bunch of conditionals = if action = x, change the state
export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return {
            ...state,
            friendsWannabes: action.friendsWannabes,
        };
    } else if (action.type == "ACCEPT_FRIEND_REQUEST") {
        console.log(state);
        return {
            ...state,
            friends: state.friendsWannabes.map((friend) => ({
                accepted: true,
            })),
        };
    } else if ((action.type = "UNFRIEND")) {
        return {
            ...state,
        };
    }
}

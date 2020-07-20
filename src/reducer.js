// src/reducer.js

// this is one big function with a bunch of conditionals = if action = x, change the state
export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return {
            ...state,
            friendsWannabes: action.friendsWannabes,
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.map((friend) => {
                if (friend.id == action.id) {
                    friend.accepted = true;
                }
                return friend;
            }),
        };
    }

    if (action.type == "UNFRIEND") {
        /*  console.log("state: ", state);
        console.log("action.id: ", action.id);
        console.log("friend.id: ", friend.id); */
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.filter((friend) => {
                return friend.id != action.id;
            }),
        };
    }

    if (action.type == "TEN_LAST_MESSAGES") {
        return {
            ...state,
            chatMessages: action.msgs,
        };
    }

    if (action.type == "ADD_NEW_MESSAGE") {
        const newMsgs = state.chatMessages.concat(action.msg);
        return {
            ...state,
            chatMessages: newMsgs,
        };
    }

    return state;
}

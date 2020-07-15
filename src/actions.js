// src/actions.js

// will contain all of our action creator functions
// action creator is just a function that returns an object with a property called TYPE
// object that it returns is called an action

export function changingState() {
    return {
        type: "CHANGE_STATE",
        // we also need to give it the data that we want changed
    };
}

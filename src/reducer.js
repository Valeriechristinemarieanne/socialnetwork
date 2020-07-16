// src/reducer.js

// this is one big function with a bunch of conditionals = if action = x, change the state
export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return {
            ...state,
            friendsWannabes: action.friendsWannabes,
        };
    }
    return state;
}
//////////// 3 useful methods you can use for making copies of objects and arrays

/* var obj = {
    name: "Valerie",
};
 */
// #1 spread operator (works for objects AND arrays)

// create a clone/copy
/* var newObj = {
    ...obj,
}; */

// add properties to the clone
/* var newObj = {
    ...obj,
    last: "Deguine",
}; */

/* var arr = [1, 2, 3];
var newArr = [...arr]; // makes a clone
var newArr = [...arr, 4]; // adding value to clone
 */
// #2 MAP works ONLY on ARRAYS
// its a loop! Its useful for cloning, looping, and changing each element in the array.

// #3 FILTER - an array method
// great for removing things from an array
// its also a lopp that creates a copy of the array that you're looping on and then removes things from the copy

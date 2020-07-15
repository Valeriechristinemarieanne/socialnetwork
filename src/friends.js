import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsWannabes } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    });
    // Don't forget to do if(there is an array, just like in friendbutton)
    return null;
}

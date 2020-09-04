import React, { useState } from "../../node_modules/react";
import axios from "../axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);

    const handleClick = () => {
        axios.post(url, values);
        axios
            .post(url, values)
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("err in useauthsubmit:", err);
                setError(true);
            });
    };

    return [error, handleClick];
}

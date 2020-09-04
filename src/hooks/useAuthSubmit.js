import React, { useState } from "../../node_modules/react";
import axios from "../axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);

    const submit = () => {
        console.log("handeling click");
        axios
            .post(url, values)
            .then(({ data }) => {
                console.log("data:", data);
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

    return [submit, error];
}

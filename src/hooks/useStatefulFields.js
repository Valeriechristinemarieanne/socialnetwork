import React, { useState } from "../../node_modules/react";

export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        console.log("handeling change");
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    return [values, handleChange];
}

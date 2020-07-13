import React from "react";
import axios from "./axios";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useStatefulFields";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleClick] = useAuthSubmit("/registration", values);
    return (
        <div>
            {error && <p>Something went wrong </p>}
            <input name="first" onChange={handleChange} />
            <input name="last" onChange={handleChange} />
            <input name="email" onChange={handleChange} />
            <input name="password" onChange={handleChange} />
            <button name="submit" onClick={handleClick}>
                Submit
            </button>
        </div>
    );
}

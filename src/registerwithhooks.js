import React from "react";
import axios from "./axios";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
/* import LayoutTextFields from "./layouttextfields"; */
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25ch",
    },
}));

export default function Registration() {
    const classes = useStyles();
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/register", values);

    return (
        <div>
            {error && <p>Something went wrong </p>}
            {/*   <LayoutTextFields /> */}

            {/*   <TextField
                name="first"
                label="First"
                defaultValue=""
                className={classes.textField}
                variant="outlined"
                onChange={handleChange}
                autoComplete="off"
                required
            />
            <TextField
                name="last"
                label="Last"
                defaultValue=""
                className={classes.textField}
                variant="outlined"
                onChange={handleChange}
                autoComplete="off"
                required
            />
            <TextField
                name="email"
                label="E-Mail"
                defaultValue=""
                className={classes.textField}
                variant="outlined"
                onChange={handleChange}
                autoComplete="off"
                required
            />
            <TextField
                name="password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={handleChange}
                required
            />
 */}
            <div className="registerinputcontainer">
                <input
                    name="first"
                    placeholder="First name"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                />
                <input
                    name="last"
                    placeholder="Last name"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                />
                <input name="first" onChange={handleChange} />
                <input name="last" onChange={handleChange} />
                <input name="email" onChange={handleChange} />
                <input name="password" onChange={handleChange} />
                <button name="submit" onClick={submit}>
                    Submit
                </button>
            </div>
            <p>
                Already registered? Go to{" "}
                <Link href="/welcome#/login">Login</Link>
            </p>
        </div>
    );
}

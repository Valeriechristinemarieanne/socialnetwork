import React from "react";
import axios from "./axios";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Link } from "@material-ui/core";
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

export default function Login() {
    const classes = useStyles();
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/login", values);

    return (
        <div>
            {error && <p> Something went wrong </p>}

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

            <Button name="submit" type="submit" onClick={submit}>
                Submit
            </Button>

            <Typography>
                Not yet a member? <Link href="/">Sign up</Link>
            </Typography>
        </div>
    );
}

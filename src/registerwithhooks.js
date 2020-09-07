import React from "react";
import axios from "./axios";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Button, Typography } from "@material-ui/core";
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
            {error && <p> Something went wrong </p>}

            <TextField
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
                sudo
                service
                postgresql
                start
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
                Already registered? Go to{" "}
                <Link href="/welcome#/login">Login</Link>
            </Typography>
        </div>
    );
}

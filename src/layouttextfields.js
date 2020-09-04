import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function LayoutTextFields() {
    const classes = useStyles();

    return (
        <div>
            <div>
                <TextField
                    label="First"
                    defaultValue=""
                    className={classes.textField}
                    variant="outlined"
                />
                <TextField
                    label="Last"
                    defaultValue=""
                    className={classes.textField}
                    variant="outlined"
                />
                <TextField
                    label="E-Mail"
                    defaultValue=""
                    className={classes.textField}
                    variant="outlined"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
            </div>
        </div>
    );
}

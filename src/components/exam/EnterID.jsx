import React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
        minWidth: "20%",
        textAlign: "center",
    },
    textInput: {
        marginBottom: theme.spacing(2),
    },
    noUnderLine: {
        textDecoration: "none"
    }
}));

function EnterID() {
    const classes = useStyles();

    return (
        <form className={classes.form}>
            <TextField
                label="Enter Examination ID"
                variant="outlined"
                className={classes.textInput}
                fullWidth
            />
            <br />
            <Link to="/exam/start" >
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => {
                        var doc = document.documentElement;
                        doc.requestFullscreen();
                    }}
                    endIcon={<Send />}
                >
                    Submit
                </Button>
            </Link>
        </form>
    );
}

export default EnterID;

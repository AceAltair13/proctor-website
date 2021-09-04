import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "20em",
        textAlign: "center",
    },
    textInput: {
        marginBottom: theme.spacing(2),
    },
    noUnderLine: {
        textDecoration: "none",
    },
}));

function EnterID() {
    const classes = useStyles();
    const [examID, setexamID] = useState("");
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        console.log(examID)
        if (examID === "") {
            handleClose()
        }
    }, [examID])

    function setError(error) {
        setErrorMsg(error);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(event) {
        setexamID(event.target.value);
    }

    function onSubmit() {
        if (examID === "") {
            setError("Exam ID cannot be blank!");
            handleClickOpen();
        } else if (examID !== "1234") {
            setError("Invalid Exam ID!");
            handleClickOpen();
        } else {
            setError("");
            history.push("/exam/start");
            var doc = document.documentElement;
            doc.requestFullscreen();
        }
    }

    return (
        <>
            <form
                className={classes.form}
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}
            >
                <TextField
                    error={open}
                    name="Exam"
                    label="Enter Examination ID"
                    variant="outlined"
                    helperText={open ? errorMsg : ""}
                    className={classes.textInput}
                    onChange={handleChange}
                    value={examID}
                    fullWidth
                />
                <br />

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={onSubmit}
                    // component={Link}
                    // to={"/exam/start"}
                    endIcon={<Send />}
                >
                    Submit
                </Button>
            </form>
        </>
    );
}

export default EnterID;

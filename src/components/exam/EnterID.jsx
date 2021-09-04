import React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import { Link } from "react-router-dom";


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

function a()
{
    var ExamId=document.getElementById("Exam").value
    if(ExamId==="")
    {
        return(0);
    }
    else
    {
        return(1);
    }

}

function EnterID() {
    
    const classes = useStyles();

    return (
        <form className={classes.form}>
            <TextField
                name="Exam"
                label="Enter Examination ID"
                variant="outlined"
                className={classes.textInput}
                fullWidth
            />
            <br />

            <Button
                color="primary"
                variant="contained"
                fullWidth
                size="large"
                onClick={() => {
                    var z=a()
                    if(z)
                    {
                        var doc = document.documentElement;
                        doc.requestFullscreen();

                    }
                    else
                    {
                        alert("ExamId daal madarchod")
                    }
                }}
                component={Link}
                to={"/exam/start"}
                endIcon={<Send />}
            >
                Submit
            </Button>
        </form>
    );
}

export default EnterID;

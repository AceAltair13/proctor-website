import { Typography } from "@material-ui/core";
import React from "react";
import MobileDenied from "../../images/mobiledenied.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "50vh",
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(4),
    },
    text: {
        textAlign: "center",
    },
}));

function Unavailable() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img
                src={MobileDenied}
                alt="Mobile Denied"
                className={classes.image}
            />
            <Typography variant="button" className={classes.text}>
                This section is unavailable on <strong>mobile phones</strong>.
                <br />
                Please use a <strong>desktop</strong> instead.
            </Typography>
        </div>
    );
}

export default Unavailable;

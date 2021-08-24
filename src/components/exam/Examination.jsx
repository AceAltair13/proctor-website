import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EnterID from "./EnterID";
import Test from "./Test";

const useStyles = makeStyles((_) => ({
    root: {
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

function Examination() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path="/exam">
                    <EnterID />
                </Route>
                <Route exact path="/exam/start">
                    <Test />
                </Route>
            </Switch>
        </div>
    );
}

export default Examination;

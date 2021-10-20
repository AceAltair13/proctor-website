import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard, Exam, Home, Login, Register } from "./Pages/index";

function Routes() {
    return (
        <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/exam">
                <Exam />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
}

export default Routes;

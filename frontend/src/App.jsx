import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Themes/theme";
import { Switch, Route } from "react-router-dom";
import { Dashboard, Exam, Home, Login, Register } from "./Pages/index";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
        </ThemeProvider>
    );
}

export default App;

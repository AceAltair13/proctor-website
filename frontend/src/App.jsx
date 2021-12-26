import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Themes/theme";
import { Switch, Route, Redirect } from "react-router-dom";
import {
    Dashboard,
    Exam,
    Home,
    Login,
    Register,
    MobileExamError,
    NotFoundError,
    ExamPermissionError,
} from "./Pages/index";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.user.currentUser);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
            >
                <CssBaseline />
                <Switch>
                    <Route path="/dashboard">
                        {user ? <Dashboard /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/exam">
                        {user ? <Exam /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        {user ? <Redirect to="/dashboard" /> : <Login />}
                    </Route>
                    <Route path="/register">
                        {user ? <Redirect to="/dashboard" /> : <Register />}
                    </Route>
                    <Route path="/error1">
                        <MobileExamError />
                    </Route>
                    <Route path="/error2">
                        <ExamPermissionError />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route>
                        <NotFoundError />
                    </Route>
                </Switch>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;

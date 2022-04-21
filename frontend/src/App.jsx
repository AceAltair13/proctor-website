import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Themes/theme";
import { Switch, Route, Redirect } from "react-router-dom";
import {
    Dashboard,
    Home,
    Login,
    Register,
    NotFoundError,
    ExamRoutes,
} from "./Pages/index";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import { SnackbarUtilsConfigurator } from "./Utils/SnackBarUtils";
import "react-image-lightbox/style.css";

function App() {
    const user = useSelector((state) => state.user.currentUser);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={2}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
            >
                <SnackbarUtilsConfigurator />
                <CssBaseline />
                <Switch>
                    <Route path="/dashboard">
                        {user ? <Dashboard /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        {user ? <Redirect to="/dashboard" /> : <Login />}
                    </Route>
                    <Route path="/register">
                        {user ? <Redirect to="/dashboard" /> : <Register />}
                    </Route>
                    <Route path="/take-exam/:id">
                        {user ? <ExamRoutes /> : <Redirect to="/login" />}
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

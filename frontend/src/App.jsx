import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Themes/theme";
import { Switch, Route } from "react-router-dom";
import { Dashboard, Exam, Home, Login, Register } from "./Pages/index";
import { SnackbarProvider } from "notistack";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
            >
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
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";
import {
    createTheme,
    MuiThemeProvider,
    responsiveFontSizes,
} from "@material-ui/core/styles";
import Examination from "./Examination/Examination";
import Unavailable from "./Examination/Unavailable";
import AdminDashboard from "./Dashboard/AdminDashboard";
import { isChrome, isDesktop } from "react-device-detect";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import Homepage from "./Home/Homepage";

let theme = createTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: "#e91e63",
        },
    },
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/admin">
                    <AdminDashboard />
                </Route>
                <Route path="/exam">
                    {!(isChrome && isDesktop) ? (
                        <Unavailable />
                    ) : (
                        <Examination />
                    )}
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="/signin">
                    <SignIn />
                </Route>
            </Switch>
        </MuiThemeProvider>
    );
}

export default App;

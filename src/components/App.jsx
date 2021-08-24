import React from "react";
import { Switch, Route } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Website from "./website/Website";
import Examination from "./exam/Examination";
import Unavailable from "./exam/Unavailable";
import AdminDashboard from "./admin/AdminDashboard";
import { isMobile } from "react-device-detect";

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: "#e91e63",
        },
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                <Route exact path="/">
                    <Website />
                </Route>
                <Route path="/admin">
                    <AdminDashboard />
                </Route>
                <Route path="/exam">
                    {isMobile ? <Unavailable /> : <Examination />}
                </Route>
            </Switch>
        </MuiThemeProvider>
    );
}

export default App;

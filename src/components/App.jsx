import React from "react";
import { Switch, Route } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Website from "./website/Website";
import Examination from "./exam/Examination";
import AdminDashboard from "./admin/AdminDashboard";

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
                <Route exact path="/" component={Website}></Route>
                <Route path="/admin" component={AdminDashboard}></Route>
                <Route path="/exam" component={Examination}></Route>
            </Switch>
        </MuiThemeProvider>
    );
}

export default App;

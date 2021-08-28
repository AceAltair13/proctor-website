import React from "react";
import { Switch, Route } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Website from "./website/Website";
import Examination from "./exam/Examination";
import Unavailable from "./exam/Unavailable";
import AdminDashboard from "./admin/AdminDashboard";
import { isMobile, isTablet, isSmartTV, isAndroid, isWinPhone, isIOS, isFirefox, isSafari, isOpera, isIE, isEdge, isMobileSafari, isIOS13, isIPhone13, mobileModel, deviceType, deviceDetect } from "react-device-detect";

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: "#e91e63",
        },
    },
});

function App() {
    if (isAndroid) {
        console.log(mobileModel, deviceType, deviceDetect);
    }
    else {
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
                        {isMobile || isTablet || isSmartTV || isAndroid || isWinPhone || isIOS || isFirefox || isSafari || isOpera || isIE || isEdge || isMobileSafari || isIOS13 || isIPhone13 ? <Unavailable /> : <Examination />}
                    </Route>
                </Switch>
            </MuiThemeProvider>
        );

    }
}

export default App;

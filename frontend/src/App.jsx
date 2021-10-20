import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Themes/theme";
import Routes from "./routes";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    );
}

export default App;

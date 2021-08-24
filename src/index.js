import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

ReactDOM.render(
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

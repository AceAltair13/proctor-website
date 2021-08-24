import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById("root")
);

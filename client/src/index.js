import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import { createHashHistory } from "history";
// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";

const history = createHashHistory();
// const store = configureStore({
//     reducer: {},
// });

ReactDOM.render(
    <Router history={history}>
        {/* <Provider store={store}> */}
            <App />
        {/* </Provider> */}
    </Router>,
    document.getElementById("root")
);

import React from "react";
import { Typography } from "@material-ui/core";
import HotKeys from "react-hot-keys";

function Test() {
    function onKeyDown(keyName, e, handle) {
        console.log("test:onKeyDown", keyName, e, handle)
    }

    return (
        <HotKeys
        keyName="alt+tab, command"
        onKeyDown={onKeyDown}
        >
            <Typography variant="h2" color="primary">
                Examination Page
            </Typography>
        </HotKeys>
    );
}

export default Test;

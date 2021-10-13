import React from "react";
import { Typography } from "@material-ui/core";
import AIProctor from "../Proctor/AIProctor";

function Test() {
    return (
        <>
            <AIProctor />
            <Typography variant="h2" color="primary">
                Examination Page
            </Typography>
        </>
    );
}

export default Test;

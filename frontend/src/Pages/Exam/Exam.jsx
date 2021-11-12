import React from "react";
import ExamFooter from "./ExamFooter";
import ExamHeader from "./ExamHeader";
import ExamMain from "./ExamMain";
import { Grid } from "@mui/material";

function Exam() {
    return (
        <Grid
            height="100vh"
            direction="column"
            spacing={0}
            justifyContent="space-between"
            container
        >
            <Grid item>
                <ExamHeader />
                <ExamMain />
            </Grid>
            <Grid item container py={3}>
                <ExamFooter />
            </Grid>
        </Grid>
    );
}

export default Exam;

import React from "react";
import { Grid, Button, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";

function ExamNavigation() {
    const { questions } = useSelector((state) => state.questionPaper);

    return (
        <Grid container direction="column">
            <Grid item xs>
                <Typography variant="body1" fontWeight="fontWeightBold">
                    Question Summary
                </Typography>
                <Grid
                    container
                    spacing={2}
                    sx={{ maxHeight: "40vh", overflow: "auto", mt: 1 }}
                >
                    {questions.map((question, index) => (
                        <Grid item key={question.questionId}>
                            <Button
                                color={
                                    question.markedForReview
                                        ? "info"
                                        : question.attempted
                                        ? "success"
                                        : "error"
                                }
                                disableElevation
                            >
                                {index + 1}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 2, width: "85%" }} />
            </Grid>
            <Grid item xs>
                <Typography variant="body1" mb={2} fontWeight="fontWeightBold">
                    Legend
                </Typography>
                <Grid container spacing={1}>
                    <Grid item container alignItems="center">
                        <Grid item xs={4}>
                            <Button
                                color="error"
                                disableElevation
                                disableRipple
                            >
                                1
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1">
                                Not Attempted
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center">
                        <Grid item xs={4}>
                            <Button
                                color="success"
                                disableElevation
                                disableRipple
                            >
                                2
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1">Attempted</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center">
                        <Grid item xs={4}>
                            <Button color="info" disableElevation disableRipple>
                                3
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1">
                                Marked for Review
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ExamNavigation;

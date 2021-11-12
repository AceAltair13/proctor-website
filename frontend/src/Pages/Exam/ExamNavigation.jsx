import React from "react";
import { Grid, Button, Typography, Divider } from "@mui/material";

function ExamNavigation() {
    return (
        <Grid container direction="column">
            <Grid item xs>
                <Typography variant="body1">
                    Question Summary
                </Typography>
                <Grid container spacing={2} sx={{maxHeight: "35vh", overflow: "auto", mt: 1}}>
                    {Array.from({ length: 50 }, (_, k) => k + 1).map((item) => (
                        <Grid item>
                            <Button color="error" disableElevation>{item}</Button>
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 2, width: "85%" }} />
            </Grid>
            <Grid item xs>
                <Typography variant="body1" mb={2}>Legend</Typography>
                <Grid container spacing={1}>
                    <Grid item container>
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
                    <Grid item container>
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
                    <Grid item container>
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

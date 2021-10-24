import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import SupervisorGetStarted from "../../Assets/Images/supervisor.svg";

function GetStarted() {
    return (
        <>
            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ py: 6 }}
            >
                <Grid item>
                    <Typography variant="button" textAlign="center">
                        Get Started
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h3"
                        fontWeight="fontWeightBold"
                        maxWidth="md"
                        textAlign="center"
                    >
                        Getting Started with Examinator is Easy
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h6"
                        maxWidth="lg"
                        textAlign="center"
                        color="text.secondary"
                    >
                        Just register yourself as a student or a supervisor. Go
                        to Sign Up and fill your details accordingly.
                        Supervisors can create and manage examinations. Students
                        can appear for examinations.
                    </Typography>
                </Grid>
                <Grid item sx={{ my: 2 }}>
                    <Container maxWidth="sm">
                        <img
                            src={SupervisorGetStarted}
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                        />
                    </Container>
                </Grid>
                <Grid item container spacing={3} justifyContent="center">
                    <Grid item>
                        <Button fullWidth size="large" color="secondary">
                            Sign In To Your Account
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button fullWidth size="large">
                            Create A New Account
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default GetStarted;

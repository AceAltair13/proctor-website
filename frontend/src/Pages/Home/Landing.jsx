import React, { useEffect, useRef } from "react";
import { Button, Grid, Typography, Container, Box } from "@mui/material";
import lottie from "lottie-web";
import HeaderImage from "../../Assets/LottieFiles/time.json";
import { Dialpad, Add } from "@mui/icons-material";

function Landing() {
    const container = useRef(null);

    useEffect(() => {
        const img = lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: HeaderImage,
        });

        return () => {
            img.destroy();
        };
    }, []);

    return (
        <>
            <Grid container alignItems="center" sx={{ py: 6 }}>
                <Grid item md={6} container>
                    <Grid item flexDirection="column" container spacing={1}>
                        <Grid item>
                            <Typography
                                variant="h2"
                                fontWeight="fontWeightBold"
                            >
                                Smart AI Proctor for Everyone
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h6"
                                fontWeight="fontWeightBold"
                                sx={{ color: "text.secondary" }}
                            >
                                Examinator is an Online Examination System with
                                it's own Web Based AI Proctoring
                            </Typography>
                        </Grid>
                        <Grid item container spacing={2} sx={{ mt: 3 }}>
                            <Grid item>
                                <Button size="large" startIcon={<Dialpad />}>
                                    Enter Examination ID
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    startIcon={<Add />}
                                >
                                    Create Examination
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6}>
                    <Container ref={container} maxWidth="xs"></Container>
                </Grid>
            </Grid>
        </>
    );
}

export default Landing;

import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import {
    Button,
    Container,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import HeaderImage from "../../../images/time.json";
import lottie from "lottie-web";

const useStyles = makeStyles((theme) => ({
    header: {
        background: "-webkit-linear-gradient(-30deg, #3f51b5 50%, #6573c3 50%)",
    },
    root: {
        height: "100vh",
        paddingTop: 50
    },
    headerImage: {
        // maxWidth: "100%",
        // height: "auto",
        height: 600,
        width: 600,
    },
}));

export default function Header() {
    const classes = useStyles();
    const container = useRef(null);
    const lottieImage = (
        <div ref={container} className={classes.headerImage}></div>
    );

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: HeaderImage,
        });
    }, []);

    return (
        <header className={classes.header}>
            <Navbar />
            <Container>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={8}
                    className={classes.root}
                >
                    <Grid item direction="column" container md={6}>
                        <Grid item xs>
                            <Typography variant="h1">Smart Proctor</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h3">For Everyone</Typography>
                        </Grid>
                        <Grid item xs container spacing={2}>
                            <Button>Enter Exam ID</Button>
                            <Button>Create Your Exam</Button>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        {lottieImage}
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
}

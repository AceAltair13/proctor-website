import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Add, Dialpad } from "@material-ui/icons";
import lottie from "lottie-web";

const useStyles = makeStyles((theme) => ({
    header: {
        height: "100vh",
    },
    headerText: {
        marginBottom: theme.spacing(6),
        // color: indigo[300]
    },
    headerButton: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    headerImage: {
        maxWidth: "100%",
        height: "auto",
        verticalAlign: "middle",
    },
}));

function Header() {
    const classes = useStyles();
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require("../../images/header_lottie.json"),
        });
    }, []);

    return (
        <section>
            <Grid
                container
                direction="row-reverse"
                justifyContent="center"
                alignItems="center"
                className={classes.header}
            >
                <Grid item lg={6}>
                    <div ref={container} className={classes.headerImage}></div>
                </Grid>
                <Grid item lg={6}>
                    <Typography variant="h1" color="primary">
                        Smart Proctor
                    </Typography>
                    <Typography
                        variant="h4"
                        color="primary"
                        className={classes.headerText}
                    >
                        For Everyone.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<Dialpad />}
                        className={classes.headerButton}
                        component={Link}
                        to={"/exam"}
                    >
                        Enter Exam ID
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<Add />}
                        className={classes.headerButton}
                        component={Link}
                        to={"/admin"}
                    >
                        Create An Exam
                    </Button>
                </Grid>
            </Grid>
        </section>
    );
}

export default Header;

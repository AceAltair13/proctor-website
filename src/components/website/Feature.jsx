import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";

const useStyles = makeStyles((theme) => ({
    feature: {
        marginBottom: theme.spacing(7),
        // padding: theme.spacing(0, 2),
    },
    gridItem: {
        padding: "3rem",
    },
    featureImage: {
        maxWidth: "100%",
        height: "auto",
        verticalAlign: "middle",
    },
    featureTitle: {
        marginBottom: theme.spacing(3),
    },
}));

function Feature(props) {
    const classes = useStyles();

    return (
        <div className={classes.feature}>
            <Grid
                container
                direction={props.reverse ? "row-reverse" : "row"}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} className={classes.gridItem}>
                    <img
                        src={props.imageUrl}
                        alt=""
                        className={classes.featureImage}
                    />
                </Grid>
                <Grid item lg={6} md={6} className={classes.gridItem}>
                    <Typography
                        variant="h3"
                        color="primary"
                        className={classes.featureTitle}
                    >
                        <strong>
                            {props.title}
                        </strong>
                    </Typography>
                    <Typography variant="body1">{props.children}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

Feature.propTypes = {
    reverse: PropTypes.bool,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    icon: PropTypes.element,
};

export default Feature;

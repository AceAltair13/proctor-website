import React from 'react'
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {
    const classes = useStyles();

    return <AppBar position="absolute">
    <Toolbar>
        <Typography className={classes.title} variant="h6">
            Examinator
        </Typography>
        <Button color="inherit" variant="text">Sign up</Button>
    </Toolbar>
</AppBar>
}

export default Navbar;
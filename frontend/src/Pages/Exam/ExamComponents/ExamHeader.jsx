import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Toolbar,
    Typography,
} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function ExamHeader() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const alertDialog = (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Save and exit?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You will not be able to return to this page. Are you sure
                    you want to save and exit the test?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="text">
                    No
                </Button>
                <Button onClick={handleClose} variant="text" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{ py: 1 }}
            >
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={4}>
                            <Typography
                                variant="h6"
                                fontWeight="fontWeightBold"
                                noWrap
                            >
                                Examination Name
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: -1 }}>
                                First Last
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            container
                            direction="row"
                            justifyContent="center"
                            spacing={1}
                        >
                            <Grid item>
                                <AccessAlarmIcon color="primary" />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mr: 2 }}
                                    textAlign="center"
                                >
                                    Time Remaining: <strong>10:00</strong>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Button
                                color="success"
                                size="large"
                                onClick={handleClickOpen}
                            >
                                Finish Test
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {alertDialog}
        </Box>
    );
}

export default ExamHeader;

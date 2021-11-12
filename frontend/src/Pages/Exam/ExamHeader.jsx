import React from "react";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function ExamHeader() {
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
                            <Button color="success" size="large">
                                Finish Test
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ExamHeader;

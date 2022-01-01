import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";

const UpcomingExams = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Upcoming Exams
            </Typography>

            <Grid container spacing={4}>
                {[1, 2, 3, 4].map((i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Exam {i}</Typography>
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    disableElevation
                                    sx={{ ml: "auto" }}
                                >
                                    Start
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default UpcomingExams;

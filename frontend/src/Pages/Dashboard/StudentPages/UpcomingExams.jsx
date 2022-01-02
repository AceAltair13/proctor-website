import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import { fetchStudentExams } from "../../../Features/apiCalls";

const UpcomingExams = () => {
    const dispatch = useDispatch();
    const { exams } = useSelector((state) => state.student);

    useEffect(() => {
        fetchStudentExams(dispatch);
    }, [dispatch]);

    return (
        <>
            {exams && exams.length > 0 ? (
                <Grid container spacing={4}>
                    {exams.map((exam, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {exam.examName}
                                    </Typography>
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
            ) : (
                <Typography variant="h6" gutterBottom>
                    No upcoming exams
                </Typography>
            )}
        </>
    );
};

export default UpcomingExams;

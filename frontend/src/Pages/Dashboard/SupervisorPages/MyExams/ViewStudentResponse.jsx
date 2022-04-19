import React from "react";
import {
    Breadcrumbs,
    Grid,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PaperContainer = ({ children }) => {
    return (
        <Paper sx={{ p: 3 }} elevation={4}>
            {children}
        </Paper>
    );
};

const ViewStudentResponse = () => {
    const { examId, examName } = useSelector(
        (state) => state.supervisor.selectedExam
    );
    const { studentId } = useParams();

    return (
        <>
            <Breadcrumbs sx={{ mb: 3 }} separator=">">
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to="/dashboard/exam/my-exams"
                >
                    My Exams
                </Link>
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to={`/dashboard/exam/my-exams/${examId}`}
                >
                    {examName}
                </Link>
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to={`/dashboard/exam/my-exams/${examId}/view-responses`}
                >
                    View Responses
                </Link>
                <Typography>{studentId}</Typography>
            </Breadcrumbs>
            <Grid container spacing={2} alignItems="stretch">
                <Grid item lg={9} md={8} sm={12} xs={12}>
                    <PaperContainer>
                        <Stack>
                            <Typography variant="h4">Tirth Thoria</Typography>
                            <Typography variant="h6">
                                tirththoria13@gmail.com
                            </Typography>
                        </Stack>
                    </PaperContainer>
                </Grid>
                <Grid item lg={3} md={4} sm={12} xs={12}>
                    <PaperContainer>
                        <Stack spacing={2}>
                            <Typography variant="h6">Uploaded Face</Typography>
                            <img
                                src="https://source.unsplash.com/random"
                                alt=""
                                style={{ height: "auto", width: "100%" }}
                            />
                        </Stack>
                    </PaperContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default ViewStudentResponse;

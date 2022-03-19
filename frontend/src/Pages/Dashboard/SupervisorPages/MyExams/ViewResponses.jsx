import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const ViewResponses = () => {
    const { examName, examId } = useSelector(
        (state) => state.supervisor.selectedExam
    );

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
                <Typography>View Responses</Typography>
            </Breadcrumbs>
        </>
    );
};

export default ViewResponses;
import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewStudentResponse = () => {
    const { examId, examName } = useSelector(
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
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to={`/dashboard/exam/my-exams/${examId}/view-responses`}
                >
                    View Responses
                </Link>
            </Breadcrumbs>
        </>
    );
};

export default ViewStudentResponse;

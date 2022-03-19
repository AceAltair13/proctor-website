import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";

const QuestionForm = () => {
    const { examId } = useParams();
    const { examName } = useSelector((state) => state.supervisor.selectedExam);

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
                <Typography>Manage Question Bank</Typography>
                <Typography>Add Question</Typography>
            </Breadcrumbs>
        </>
    );
};

export default QuestionForm;

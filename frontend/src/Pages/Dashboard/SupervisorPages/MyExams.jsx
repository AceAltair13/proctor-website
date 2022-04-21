import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddQuestion from "./MyExams/AddQuestion";
import EditExam from "./MyExams/EditExam";
import EnrollStudents from "./MyExams/EnrollStudents";
import MalpracticeImages from "./MyExams/MalpracticeImages";
import ManageExam from "./MyExams/ManageExam";
import ManageQuestionPaper from "./MyExams/ManageQuestionPaper";
import ManageStudents from "./MyExams/ManageStudents";
import MyExamsList from "./MyExams/MyExamsList";
import ViewResponses from "./MyExams/ViewResponses";
import ViewStudentResponse from "./MyExams/ViewStudentResponse";

const MyExams = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:examId/manage-question-paper/add-question`}>
                <AddQuestion />
            </Route>
            <Route path={`${path}/:examId/manage-question-paper`}>
                <ManageQuestionPaper />
            </Route>
            <Route path={`${path}/:examId/manage-students/enroll-students`}>
                <EnrollStudents />
            </Route>
            <Route path={`${path}/:examId/manage-students`}>
                <ManageStudents />
            </Route>
            <Route
                path={`${path}/:examId/view-responses/:studentId/view-incidents/:type`}
            >
                <MalpracticeImages />
            </Route>
            <Route path={`${path}/:examId/view-responses/:studentId`}>
                <ViewStudentResponse />
            </Route>
            <Route path={`${path}/:examId/view-responses`}>
                <ViewResponses />
            </Route>
            <Route path={`${path}/:examId/edit-exam`}>
                <EditExam />
            </Route>
            <Route path={`${path}/:examId`}>
                <ManageExam />
            </Route>
            <Route path={path}>
                <MyExamsList />
            </Route>
        </Switch>
    );
};

export default MyExams;

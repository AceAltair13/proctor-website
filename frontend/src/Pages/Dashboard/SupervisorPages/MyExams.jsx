import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ManageExam from "./ManageExam";
import MyExamsList from "./MyExamsList";

const MyExams = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:examId/questionPaper`}>
                <ManageExam />
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

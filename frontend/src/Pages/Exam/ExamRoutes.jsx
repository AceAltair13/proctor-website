import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import ExamLoadingPage from "./ExamLoadingPage";
import PreExamFaceCapture from "./PreExamFaceCapture";
import Exam from "./Exam";

const ExamRoutes = () => {
    const { id } = useParams();
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/start`}>
                <Exam examId={id} />
            </Route>
            <Route path={`${path}/face-capture`}>
                <PreExamFaceCapture examId={id} />
            </Route>
            <Route path={`${path}`}>
                <ExamLoadingPage id={id} />
            </Route>
        </Switch>
    );
};

export default ExamRoutes;

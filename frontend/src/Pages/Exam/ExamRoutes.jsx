import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import ExamLoadingPage from "./ExamLoadingPage";
import PreExamFaceCapture from "./PreExamFaceCapture";

const ExamRoutes = () => {
    const { id } = useParams();
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route
                path={`${path}/face-capture`}
                component={PreExamFaceCapture}
            />
            <Route path={`${path}`}>
                <ExamLoadingPage id={id} />
            </Route>
        </Switch>
    );
};

export default ExamRoutes;

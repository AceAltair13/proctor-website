import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import ExamLoadingPage from "./ExamLoadingPage";
import PreExamFaceCapture from "./PreExamFaceCapture";
import Exam from "./Exam";
import ExamSubmitPage from "./ExamSubmitPage";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import screenfull from "screenfull";

const FullScreenViolationDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.switchToFullScreen}>
            <DialogTitle>Warning!</DialogTitle>
            <DialogContent>
                Exiting fullscreen during examination is not allowed! Please
                refrain from doing so.
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={props.switchToFullScreen}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ExamRoutes = () => {
    const { id } = useParams();
    const { path } = useRouteMatch();
    const [showFullScreenViolationDialog, setShowFullScreenViolationDialog] =
        useState(false);
    const switchToFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.request();
        }
        setShowFullScreenViolationDialog(false);
    };

    useEffect(() => {
        if (screenfull.isEnabled) {
            screenfull.on("change", () => {
                if (!screenfull.isFullscreen) {
                    setShowFullScreenViolationDialog(true);
                }
            });
        }
    }, []);

    return (
        <Box sx={{ bgcolor: "#fff" }}>
            <Switch>
                <Route path={`${path}/start`}>
                    <Exam examId={id} />
                </Route>
                <Route path={`${path}/submit`}>
                    <ExamSubmitPage />
                </Route>
                <Route path={`${path}/face-capture`}>
                    <PreExamFaceCapture examId={id} />
                </Route>
                <Route path={`${path}`}>
                    <ExamLoadingPage id={id} />
                </Route>
            </Switch>
            <FullScreenViolationDialog
                open={showFullScreenViolationDialog}
                switchToFullScreen={switchToFullScreen}
            />
        </Box>
    );
};

export default ExamRoutes;

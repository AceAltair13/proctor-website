import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { fetchStudentExams } from "../../../Api/student";
import { DateTime } from "luxon";
import { Redirect } from "react-router-dom";
import RefreshablePage from "../CommonPages/RefreshablePage";

const PreExamDialog = (props) => {
    const { open, onClose, examName, duration, examId } = props;
    const [redirect, setRedirect] = useState(false);
    const [instructionsRead, setInstructionsRead] = useState(false);

    if (redirect) {
        return <Redirect to={`/take-exam/${examId}`} />;
    }

    return (
        <Dialog open={open} onClose={onClose} scroll="paper">
            <DialogTitle>
                <Stack>
                    {examName}
                    <Typography variant="body2">
                        Time Duration: <strong>{duration}</strong> minutes
                    </Typography>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Stack>
                    <Typography variant="h6">
                        General instructions for candidates:
                    </Typography>
                    <Typography variant="body1">
                        {[...new Array(25)]
                            .map(
                                () =>
                                    `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                            )
                            .join("\n")}
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={instructionsRead}
                                onChange={(e) =>
                                    setInstructionsRead(e.target.checked)
                                }
                            />
                        }
                        label="I have read the instructions"
                        sx={{ mt: 2 }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="text">
                    Close
                </Button>
                <Button
                    onClick={() => setRedirect(true)}
                    color="primary"
                    variant="text"
                    disabled={!instructionsRead}
                >
                    Start Exam
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ExamCard = (props) => {
    const { examName, examStartTime, examEndTime, examId } = props;
    const examStartTimeDate = DateTime.fromISO(examStartTime);
    const examEndTimeDate = DateTime.fromISO(examEndTime);
    const duration = examEndTimeDate.diff(examStartTimeDate, "minutes").minutes;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Stack>
                        <Tooltip title={examName}>
                            <Typography variant="h6" gutterBottom noWrap>
                                {examName}
                            </Typography>
                        </Tooltip>
                        <Typography variant="caption">
                            <strong>Started At:</strong>{" "}
                            {examStartTimeDate.toLocaleString(
                                DateTime.DATETIME_MED
                            )}
                        </Typography>
                        <Typography variant="caption">
                            <strong>Ends At:</strong>{" "}
                            {examEndTimeDate.toLocaleString(
                                DateTime.DATETIME_MED
                            )}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button
                        disableElevation
                        color="success"
                        sx={{ px: 4, ml: "auto", mr: 1, mb: 1 }}
                        onClick={handleClickOpen}
                    >
                        Start Now
                    </Button>
                </CardActions>
            </Card>
            <PreExamDialog
                open={open}
                onClose={handleClose}
                examName={examName}
                duration={duration}
                examId={examId}
            />
        </>
    );
};

const ExamCardGrid = (props) => {
    return (
        <Grid container spacing={4}>
            {props.exams.map((exam, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <ExamCard {...exam} />
                </Grid>
            ))}
        </Grid>
    );
};

const OngoingExams = () => {
    const dispatch = useDispatch();
    const exams = useSelector((state) => state.student.exams.current);
    const fetchCurrentExams = () => fetchStudentExams(dispatch, "current");

    return (
        <RefreshablePage
            title="Ongoing Exams"
            fetchExamFunction={fetchCurrentExams}
        >
            <ExamCardGrid exams={exams} />
        </RefreshablePage>
    );
};

export default OngoingExams;

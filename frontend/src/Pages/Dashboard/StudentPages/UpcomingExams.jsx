import React, { useEffect, useState } from "react";
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
    DialogContentText,
    DialogTitle,
    Divider,
    Fab,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { fetchStudentExams } from "../../../Features/apiCalls";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Redirect } from "react-router-dom";

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
                <DialogContentText variant="body1">
                    <Typography variant="h6">
                        General instructions for candidates:
                    </Typography>
                    <Stack>
                        {[...new Array(25)]
                            .map(
                                () =>
                                    `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                            )
                            .join("\n")}
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
                </DialogContentText>
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
    const { examName, examDesc, examStartTime, examEndTime, examId } = props;
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
                        <Typography variant="h6">{examName}</Typography>
                        <Typography variant="body2" gutterBottom>
                            {examDesc}
                        </Typography>
                        <Typography variant="caption">
                            <strong>Started At:</strong>{" "}
                            {examStartTimeDate.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            <strong>Ends At:</strong>{" "}
                            {examEndTimeDate.toLocaleString()}
                        </Typography>
                    </Stack>
                </CardContent>

                <CardActions>
                    <Button
                        disableElevation
                        color="success"
                        sx={{ ml: "auto" }}
                        onClick={handleClickOpen}
                    >
                        Start
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

const UpcomingExams = () => {
    const dispatch = useDispatch();
    const { upcoming, current } = useSelector((state) => state.student.exams);
    const { isFetching } = useSelector((state) => state.student);
    const columns = [
        {
            headerName: "Sr No",
            field: "srNo",
            type: "number",
            headerAlign: "center",
            align: "center",
            width: 100,
        },
        {
            headerName: "Exam Name",
            field: "examName",
            headerAlign: "center",
            align: "center",
            width: 300,
        },
        {
            headerName: "Start Date",
            field: "startTime",
            type: "dateTime",
            headerAlign: "center",
            align: "center",
            width: 200,
        },
        {
            headerName: "End Date",
            field: "endTime",
            type: "dateTime",
            headerAlign: "center",
            align: "center",
            width: 200,
        },
        {
            headerName: "Exam Description",
            field: "examDesc",
            headerAlign: "center",
            align: "center",
            minWidth: 300,
            flex: 1,
        },
    ];
    const rows = upcoming.map((exam, index) => ({
        id: exam.examId,
        srNo: index + 1,
        examName: exam.examName,
        startTime: DateTime.fromISO(exam.examStartTime).toLocaleString(
            DateTime.DATETIME_MED
        ),
        endTime: DateTime.fromISO(exam.examEndTime).toLocaleString(
            DateTime.DATETIME_MED
        ),
        examDesc: exam.examDesc,
    }));

    useEffect(() => {
        fetchStudentExams(dispatch);
    }, [dispatch]);

    return (
        <>
            {!isFetching && (
                <>
                    {current.length > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Currently Ongoing Exams
                                <NotificationsActiveIcon
                                    sx={{ ml: 1, verticalAlign: "middle" }}
                                    color="action"
                                />
                            </Typography>
                            <ExamCardGrid exams={current} />
                            <Divider sx={{ my: 3 }} variant="fullWidth" />
                        </>
                    )}

                    <Typography variant="h6" gutterBottom>
                        Upcoming Exams
                    </Typography>
                    <Paper>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight
                            disableSelectionOnClick
                        />
                    </Paper>
                </>
            )}
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 0, right: 0, m: 3 }}
                onClick={() => fetchStudentExams(dispatch)}
            >
                <RefreshIcon />
            </Fab>
        </>
    );
};

export default UpcomingExams;

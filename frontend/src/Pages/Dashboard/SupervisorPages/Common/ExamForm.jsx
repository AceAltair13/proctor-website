import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createExamValidation } from "../../../../Validations/createExamValidation";
import { useDispatch, useSelector } from "react-redux";
import { createExam, deleteExam, updateExam } from "../../../../Api/supervisor";
import { useHistory } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";
import PropTypes from "prop-types";
import theme from "../../../../Themes/rte_theme";
import { setSupervisorDialogOpen } from "../../../../Features/supervisorSlice";

const FormContainer = (props) => {
    return (
        <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant="body1" gutterBottom>
                {props.title}
            </Typography>
            <Grid container spacing={2} mt={1}>
                {props.children}
            </Grid>
        </Paper>
    );
};

const DeleteConfirmationDialog = () => {
    const { supervisorDialogOpen, selectedExam } = useSelector(
        (state) => state.supervisor
    );
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Dialog
            open={supervisorDialogOpen}
            onClose={() => dispatch(setSupervisorDialogOpen(false))}
        >
            <DialogTitle>Delete Exam</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this exam?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    onClick={() => dispatch(setSupervisorDialogOpen(false))}
                >
                    Cancel
                </Button>
                <Button
                    variant="text"
                    onClick={() => {
                        dispatch(setSupervisorDialogOpen(false));
                        deleteExam(dispatch, history, selectedExam.examId);
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ExamForm = ({ edit }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isFetching } = useSelector((state) => state.dashboard);
    const { selectedExam } = useSelector((state) => state.supervisor);
    const [startDate, setStartDate] = useState(
        edit ? DateTime.fromISO(selectedExam.examStartTime) : DateTime.now()
    );
    const [endDate, setEndDate] = useState(
        edit
            ? DateTime.fromISO(selectedExam.examEndTime)
            : DateTime.now().plus({ minute: 1 })
    );
    const [deleteAvailable, setDeleteAvailable] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(createExamValidation),
        defaultValues: {
            examName: edit ? selectedExam.examName : "",
            examDesc: edit ? selectedExam.examDesc : "",
            examInstructions: edit ? selectedExam.examInstructions : "",
        },
    });

    useEffect(() => {
        register("examInstructions");
        setDeleteAvailable(
            DateTime.now() > DateTime.fromISO(selectedExam.examStartTime) &&
                DateTime.now() < DateTime.fromISO(selectedExam.examEndTime)
        );
    }, [register, selectedExam.examStartTime, selectedExam.examEndTime]);

    const onSubmit = (data) => {
        const finalData = {
            ...data,
            examStartTime: startDate.toISO(),
            examEndTime: endDate.toISO(),
        };
        console.log(finalData);
        // createExam(dispatch, history, finalData);
        if (edit) {
            updateExam(dispatch, history, {
                ...finalData,
                examId: selectedExam.examId,
            });
        } else {
            createExam(dispatch, history, finalData);
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <DeleteConfirmationDialog />
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <FormContainer title="Exam Details">
                        {edit && (
                            <Grid item xs={12}>
                                <TextField
                                    name="examName"
                                    label="Exam ID"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={selectedExam.examId}
                                    fullWidth
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                label="Exam Name"
                                {...register("examName")}
                                error={!!errors.examName}
                                helperText={
                                    errors.examName && errors.examName.message
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="examDesc"
                                label="Exam Description"
                                multiline
                                rows={4}
                                {...register("examDesc")}
                                error={!!errors.examDesc}
                                helperText={
                                    errors.examDesc && errors.examDesc.message
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                                Exam Instructions
                            </Typography>
                            <ThemeProvider theme={theme}>
                                {edit ? (
                                    <MUIRichTextEditor
                                        label="Start typing here..."
                                        defaultValue={JSON.stringify(
                                            selectedExam.examInstructions
                                        )}
                                        onChange={(value) => {
                                            const content = convertToRaw(
                                                value.getCurrentContent()
                                            );
                                            setValue(
                                                "examInstructions",
                                                content
                                            );
                                        }}
                                    />
                                ) : (
                                    <MUIRichTextEditor
                                        label="Start typing here..."
                                        onChange={(value) => {
                                            const content = convertToRaw(
                                                value.getCurrentContent()
                                            );
                                            setValue(
                                                "examInstructions",
                                                content
                                            );
                                        }}
                                    />
                                )}
                            </ThemeProvider>
                        </Grid>
                    </FormContainer>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <FormContainer title="Exam Timings">
                        <Grid item xs={12}>
                            <DateTimePicker
                                label="Starts From"
                                renderInput={(props) => (
                                    <TextField {...props} fullWidth />
                                )}
                                value={startDate}
                                minDateTime={edit ? startDate : DateTime.now()}
                                onChange={setStartDate}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DateTimePicker
                                label="Ends At"
                                renderInput={(props) => (
                                    <TextField {...props} fullWidth />
                                )}
                                value={endDate}
                                minDateTime={startDate.plus({ minute: 1 })}
                                onChange={setEndDate}
                            />
                        </Grid>
                    </FormContainer>
                    <Button
                        fullWidth
                        color="success"
                        sx={{ mt: 3 }}
                        size="large"
                        type="submit"
                        disabled={isFetching}
                    >
                        {edit ? "Update Exam Details" : "Create Exam"}
                    </Button>
                    {edit && (
                        <Button
                            fullWidth
                            color="error"
                            sx={{ mt: 1 }}
                            size="large"
                            disabled={isFetching || deleteAvailable}
                            onClick={() => {
                                dispatch(setSupervisorDialogOpen(true));
                            }}
                        >
                            Delete Exam
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

ExamForm.propTypes = {
    edit: PropTypes.bool,
};

export default ExamForm;

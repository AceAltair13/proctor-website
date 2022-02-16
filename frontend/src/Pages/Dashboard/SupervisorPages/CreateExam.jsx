import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createExamValidation } from "../../../Validations/createExamValidation";
import { useDispatch, useSelector } from "react-redux";
import { createExam } from "../../../Api/supervisor";
import { useHistory } from "react-router-dom";

const FormContainer = (props) => {
    return (
        <Card>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="body1" gutterBottom>
                    {props.title}
                </Typography>
                <Grid container spacing={2} mt={1}>
                    {props.children}
                </Grid>
            </CardContent>
        </Card>
    );
};

const CreateExam = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isFetching } = useSelector((state) => state.dashboard);
    const [startDate, setStartDate] = useState(DateTime.now());
    const [endDate, setEndDate] = useState(DateTime.now());
    const [instructions, setInstructions] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createExamValidation),
    });

    const onSubmit = (data) => {
        const finalData = {
            ...data,
            examInstructions: instructions,
            examStartTime: startDate.toISO(),
            examEndTime: endDate.toISO(),
        };
        console.log(finalData);
        createExam(dispatch, history, finalData);
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <FormContainer title="Exam Details">
                        <Grid item xs={12}>
                            <TextField
                                name="examName"
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
                            <ReactQuill
                                value={instructions}
                                onChange={setInstructions}
                                modules={CreateExam.modules}
                                formats={CreateExam.formats}
                                placeholder="Enter instructions for the exam..."
                            />
                        </Grid>
                    </FormContainer>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <FormContainer title="Exam Timings">
                        <DateTimePicker
                            label="Starts From"
                            renderInput={(props) => (
                                <Grid item xs={12}>
                                    <TextField {...props} fullWidth />
                                </Grid>
                            )}
                            value={startDate}
                            minDate={DateTime.now()}
                            onChange={(date) => setStartDate(date)}
                            error={!!errors.examStartDate}
                            helperText={
                                errors.examStartDate &&
                                errors.examStartDate.message
                            }
                        />
                        <DateTimePicker
                            label="Ends At"
                            renderInput={(props) => (
                                <Grid item xs={12}>
                                    <TextField {...props} fullWidth />
                                </Grid>
                            )}
                            value={endDate}
                            minDate={startDate}
                            onChange={(date) => setEndDate(date)}
                            error={!!errors.examEndDate}
                            helperText={
                                errors.examEndDate && errors.examEndDate.message
                            }
                        />
                    </FormContainer>
                    <Button
                        fullWidth
                        color="success"
                        sx={{ mt: 3 }}
                        size="large"
                        type="submit"
                        disabled={isFetching}
                    >
                        Create Exam
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

CreateExam.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

CreateExam.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

export default CreateExam;

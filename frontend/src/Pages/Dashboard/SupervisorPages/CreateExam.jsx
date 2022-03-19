import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    createTheme,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createExamValidation } from "../../../Validations/createExamValidation";
import { useDispatch, useSelector } from "react-redux";
import { createExam } from "../../../Api/supervisor";
import { useHistory } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter"],
    },
    overrides: {
        MUIRichTextEditor: {
            root: {
                fontFamily: ["Inter"],
                border: "1px solid rgb(158 158 158 / 80%)",
                borderRadius: 8,
            },
            editor: {
                height: 300,
                maxHeight: 300,
                overflow: "auto",
            },
            editorContainer: {
                padding: 16,
            },
            toolbar: {
                borderBottom: "1px solid rgb(158 158 158 / 80%)",
                paddingLeft: 16,
                paddingRight: 16,
            },
        },
    },
});

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
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(createExamValidation),
        examInstructions: "",
    });

    useEffect(() => {
        register("examInstructions");
    }, [register]);

    const onSubmit = (data) => {
        const finalData = {
            ...data,
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
                            <ThemeProvider theme={theme}>
                                <MUIRichTextEditor
                                    label="Start typing here..."
                                    onChange={(value) => {
                                        const content = convertToRaw(
                                            value.getCurrentContent()
                                        );
                                        setValue("examInstructions", content);
                                    }}
                                />
                            </ThemeProvider>
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

export default CreateExam;

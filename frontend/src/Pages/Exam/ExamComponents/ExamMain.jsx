import {
    Card,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExamNavigation from "./ExamNavigation";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setQuestionAttempted } from "../../../Features/questionPaperSlice";

function ExamMain(props) {
    const dispatch = useDispatch();
    const { currentQuestionId, totalQuestions, question, options } = props;

    return (
        <Grid container sx={{ pt: 2 }}>
            <Grid item xs={5}>
                <Container>
                    <Stack>
                        <Typography
                            variant="body1"
                            fontWeight="fontWeightBold"
                            gutterBottom
                        >
                            Question {currentQuestionId + 1} of {totalQuestions}
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: "70vh",
                                overflow: "auto",
                                pr: 1,
                                pb: 1,
                            }}
                        >
                            <Typography variant="body1">{question}</Typography>
                        </Box>
                    </Stack>
                </Container>
            </Grid>
            <Grid item xs={5}>
                <Card sx={{ p: 3, mr: 10 }} variant="outlined">
                    <Stack>
                        <Typography
                            variant="body1"
                            fontWeight="fontWeightBold"
                            gutterBottom
                        >
                            Options
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                name="options"
                                sx={{ maxHeight: "70vh", overflow: "auto" }}
                                value={
                                    options[currentQuestionId].selectedOption
                                }
                                onChange={(e) => {
                                    dispatch(
                                        setQuestionAttempted(e.target.value)
                                    );
                                }}
                            >
                                {options.map((option) => (
                                    <FormControlLabel
                                        key={option.optionId}
                                        value={option.optionId}
                                        control={<Radio />}
                                        label={option.optionDesc}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <ExamNavigation />
            </Grid>
        </Grid>
    );
}

ExamMain.propTypes = {
    currentQuestionId: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            optionId: PropTypes.number.isRequired,
            optionDesc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ExamMain;

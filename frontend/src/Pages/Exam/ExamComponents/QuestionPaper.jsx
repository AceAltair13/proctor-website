import React from "react";
import { Grid } from "@mui/material";
import ExamHeader from "./ExamHeader";
import ExamMain from "./ExamMain";
import ExamFooter from "./ExamFooter";
import { useSelector } from "react-redux";

const QuestionPaper = () => {
    const { userId } = useSelector((state) => state.user.currentUser);
    const { exam } = useSelector((state) => state.exam);
    const { currentQuestionId, questions, totalQuestions } = useSelector(
        (state) => state.questionPaper
    );

    return (
        questions.length > 0 && (
            <Grid
                height="100vh"
                direction="column"
                spacing={0}
                justifyContent="space-between"
                container
            >
                <Grid item>
                    <ExamHeader userId={userId} examName={exam.examName} />
                    <ExamMain
                        currentQuestionId={currentQuestionId}
                        question={questions[currentQuestionId].question}
                        options={questions[currentQuestionId].options}
                        totalQuestions={totalQuestions}
                    />
                </Grid>
                <Grid item container py={3}>
                    <ExamFooter
                        currentQuestion={questions[currentQuestionId]}
                        currentQuestionId={currentQuestionId}
                        totalQuestions={totalQuestions}
                    />
                </Grid>
            </Grid>
        )
    );
};

export default QuestionPaper;

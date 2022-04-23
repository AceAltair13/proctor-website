import React from "react";
import { Grid } from "@mui/material";
import ExamHeader from "./ExamHeader";
import ExamMain from "./ExamMain";
import ExamFooter from "./ExamFooter";
import { useSelector } from "react-redux";
import LoadAI from "../AI/LoadAI";
import Hotkeys from "react-hot-keys";
import { snackActions } from "../../../Utils/SnackBarUtils";

const QuestionPaper = () => {
    const { userId } = useSelector((state) => state.user.currentUser);
    const { exam } = useSelector((state) => state.exam);
    const { currentQuestionId, questions, totalQuestions } = useSelector(
        (state) => state.questionPaper
    );

    return (
        questions.length > 0 && (
            <Hotkeys
            keyName="shift+a,alt+s,ctrl+shift+k,f10,alt+tab,ctrl+shift+i"
            onKeyDown={(keyName, e, handle) =>{
                e.preventDefault();
                snackActions.warning(keyName +" is not allowed. You are monitored")
              }}
          >
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
                        selectedOption={
                            questions[currentQuestionId].selectedOption
                        }
                        weightage={questions[currentQuestionId].weightage}
                    />
                </Grid>
                <Grid item container py={3}>
                    <ExamFooter
                        currentQuestion={questions[currentQuestionId]}
                        currentQuestionId={currentQuestionId}
                        totalQuestions={totalQuestions}
                    />
                </Grid>
                <LoadAI examId={exam.examId}/>
            </Grid>
            </Hotkeys>
        )
    );
};

export default QuestionPaper;

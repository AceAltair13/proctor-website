import QuestionAnswer from "./QuestionAnswer.js"

class QuestionPaper{ 
    constructor(examId,questionAnswers){
        let questionId = 0
        this.examId = examId
        this.questionAnswers = []
        questionAnswers.map((qa)=>{
            const questionAnswer = new QuestionAnswer(qa.question,qa.options,questionId)
            this.questionAnswers.push(questionAnswer)
            questionId++;
        })


    }
    toJson = ()=>{
        return{
            examId:this.examId,
            questionAnswers : this.questionAnswers
        }
    }

}
export default QuestionPaper
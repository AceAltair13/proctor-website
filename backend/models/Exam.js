import Supervisor from "./Supervisor.js";
import Student from "./Student.js";
import { defaults } from "gh-pages";
import QuestionPaper from "./QuestionPaper.js";

class Exam{
    constructor(examId,supervisorId,examName,examStartTime,examEndTime){
        this.examId = examId;
        this.supervisorId = supervisorId;
        this.examName = examName;
        this.examStartTime = examStartTime;
        this.examEndTime = examEndTime
        this.questionPaper = QuestionPaper
        this.studentsList = Array(Student)
        this.createdAt = new Date().toISOString().toString()
    }

    toJson = ()=>{  
        return{
            examId:this.examId,
            supervisorId:this.supervisorId, 
            examName:this.examName, 
            examStartTime:this.examStartTime, 
            examEndTime:this.examEndTime, 
            questionPaper:this.questionPaper, 
            studentsList:this.studentsList,
            createdAt:this.createdAt

        }

    }
}
export default Exam
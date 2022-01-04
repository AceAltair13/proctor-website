import Supervisor from "./Supervisor.js";
import Student from "./Student.js";

import QuestionPaper from "./QuestionPaper.js";

class Exam {
  constructor(examId, supervisorId, examName, examStartTime, examEndTime,examDesc,examInstructions) {
    this.examId = examId;
    this.supervisorId = supervisorId;
    this.examName = examName;
    this.examStartTime = examStartTime;
    this.examEndTime = examEndTime;
    this.questionPaper = QuestionPaper;
    this.studentsList = [];
    this.createdAt = new Date().toISOString().toString();
    this.examDesc = examDesc
    this.examInstructions = examInstructions
  }

  toJson = () => {
    return {
      examId: this.examId,
      supervisorId: this.supervisorId,
      examName: this.examName,
      examStartTime: this.examStartTime,
      examEndTime: this.examEndTime,
      questionPaper: this.questionPaper,
      studentsList: this.studentsList,
      createdAt: this.createdAt,
      examDesc:this.examDesc,
      examInstructions:this.examInstructions
    };
  };
}
export default Exam;
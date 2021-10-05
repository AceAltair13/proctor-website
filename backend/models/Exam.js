import Supervisor from "./Supervisor";
import Student from "./Student";

class Exam{
    constructor(examId,supervisorId,examName,examStartTime,examEndTime){
        this.examId = examId;
        this.supervisorId = supervisorId;
        this.examName = examName;
        this.examStartTime = examStartTime;
        this.examEndTime = examEndTime
    }
    StudentsList = Array(Student)
}
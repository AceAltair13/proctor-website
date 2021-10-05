import User from "./User";
import Exam from "./Exam";


class Student extends User{
    constructor(firstName,lastName,phoneNumber,emailId,userName,password){
        super(firstName,lastName,phoneNumber,emailId,userName,password)
        this.isSupervisor = true
        this.exams = Array(Exam)
    }
}

export default Student;
import Exam from "./Exam"

class Student extends User{
    constructor(firstName,lastName,phoneNumber,emailId,userName,password){

        super(firstName,lastName,phoneNumber,emailId,userName,password)
        this.isStudent = isStudent
        this.examsEnrolled = Array(Exam)
    }
    

}

export default Student
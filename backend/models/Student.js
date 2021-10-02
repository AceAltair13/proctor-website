const Exam = require("./Exam")

class Student extends User{
    constructor(id,firstName,lastName,phoneNumber,emailId,userName,password)
    super(id,firstName,lastName,phoneNumber,emailId,userName,password)
    examsEnrolled = Array(Exam)
    

}

module.exports = Student
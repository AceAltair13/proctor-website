const Exam = require("./Exam")

class Student extends User{
    constructor(firstName,lastName,phoneNumber,emailId,userName,password)
    super(firstName,lastName,phoneNumber,emailId,userName,password)
    examsEnrolled = Array(Exam)
    

}

module.exports = Student
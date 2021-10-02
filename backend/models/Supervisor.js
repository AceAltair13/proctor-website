const User = require("./User")
const Exam  =require("./Exam")

class Student extends User{
    constructor(id,firstName,lastName,phoneNumber,emailId,userName,password)
    super(id,firstName,lastName,phoneNumber,emailId,userName,password)
    exams = Array(Exam)
        
    
}

module.exports = Student;
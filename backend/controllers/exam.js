import {
    firebase_storage,
    firebase_firestore
} from "../db.js";
import * as config from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import {
    userExists,
    userExistsFunction
} from "../helpers/users.js";
import jwt from "jsonwebtoken"
import Exam from "../models/Exam.js"
import {
    uid
} from "../helpers/other.js";
import admin from "firebase-admin";
import QuestionPaper from "../models/QuestionPaper.js";
import {
 
    examAccess,
    inTime,
    questionPaperExists,
    questionPaperFromExam
} from "../helpers/exams.js";
import { ExamAndSupervisor } from "../helpers/auth.js";
const fieldValue = admin.firestore.FieldValue;



// CRUD EXAMS

const createExam = async (req, res) => {
    try {

 
            const newId = uid()
            const newExam = new Exam(newId, req.user.userId, req.body.examName, req.body.examStartTime, req.body.examEndTime)
            const examJson = JSON.parse(JSON.stringify(newExam))
            const result = await firebase_firestore.collection('exams').doc(newId).create(examJson);
            // await firebase_firestore.collection('users').doc(req.user.userId).set({examsCreated:presentExamsCreated},{merge:true})
            await firebase_firestore.collection('users').doc(req.user.userId).update({
                examsCreated: fieldValue.arrayUnion(newId)
            });

            res.status(200).json("Exam Created" + result);

        

    } catch (error) {
        return res.status(500).json("Failed to create exam " + error)

    }

}
const updateExam = async (req, res) => {
    try {
    
        const studentsList = await (await firebase_firestore.collection("exams").doc(req.body.examId).get()).data()["studentsList"]
        const newExam = new Exam(req.body.examId, req.user.userId, req.body.examName, req.body.examStartTime, req.body.examEndTime)
        newExam.studentsList = studentsList;
        const examJson = JSON.parse(JSON.stringify(newExam))
        const result = await firebase_firestore.collection('exams').doc(req.body.examId).update(examJson);
        // await firebase_firestore.collection('users').doc(req.user.userId).set({examsCreated:presentExamsCreated},{merge:true})
        // await firebase_firestore.collection('users').doc(req.user.userId).update({ examsCreated: fieldValue.arrayUnion(newId) });
        return res.status(200).json("Exam details updated" + result);
        
    } catch (error) {
        return res.status(500).json("Failed to update exam " + error)

    }

}

const getExam = async(req,res)=>{
    try {
        if(req.query.examId){
            const exam = await firebase_firestore.collection("exams").doc(req.query.examId).get()
            if(exam){
                if(!examAccess(exam,req.session.userId)){
                    return res.status(400).json("Permission denied to access the exam")
                }
                return res.status(200).json(exam.data())
            }else{
                return res.status(400).json("Invalid examId")
            }

            
        }else{
            res.status(400).json("Provide examId")
        }
        
    } catch (error) {
        return res.status(500).json(error+" Failed to get exam details")
    }
}

const deleteExam = async(req,res)=>{
    try {
        if(req.body.examId){
            const exam = await firebase_firestore.collection("exams").doc(req.body.examId).get()
            const examSup = exam.data()["supervisorId"];
            const studentsList = exam.data()["studentsList"]
       

            await firebase_firestore.collection("users").doc(examSup).update({examsCreated: admin.firestore.FieldValue.arrayRemove(exam.data()["examId"])});
            studentsList.map(async(student) =>{
              
            await firebase_firestore.collection("users").doc(student).update({examsEnrolled:admin.firestore.FieldValue.arrayRemove(exam.data()["examId"])});
            })
            await firebase_firestore.collection("exams").doc(exam.id).delete()
     
          

            return res.status(200).json("exam deleted ")
            
        }else{
           return res.status(400).json("Provide examId")
        }
        
    } catch (error) {
        return res.status(500).json(error+" Failed to delete exam")
    }   
}


// CRUD QUESTION PAPER
const assignQuestionPaper = async (req, res) => {
    try {
        if(!req.body.examId){
            return res.status(400).json("Provide examId in request body")
        }
        const qpe = await questionPaperFromExam(req.body.examId)
  
        if(qpe){
            return res.status(400).json("Question Paper already exists for the exam ")
        }
        const questionPaper = new QuestionPaper(req.body.examId, req.body.questionAnswers)
        const questionPaperJson = JSON.parse(JSON.stringify(questionPaper))
        const newId = uid()
        
        const result1 = await firebase_firestore.collection("questionPapers").doc(newId).create(questionPaperJson);
        const result2 = await firebase_firestore.collection("exams").doc(req.body.examId).update({
                questionPaperId: newId
            })
            return res.status(200).json("Question Paper created successfull" + result1 + result2)
    } catch (error) {
        return res.status(400).json("Failed to create questionPaper" + error)
    }


}


const updateQuestionPaper = async (req,res)=>{
    try {
        if (req.body.questionPaperId && req.body.examId) {
            const questionPaper = new QuestionPaper(req.body.examId, req.body.questionAnswers)
            const questionPaperJson = JSON.parse(JSON.stringify(questionPaper))
            if (questionPaperExists(req.body.questionPaperId, req.body.examId)) {
            
                const result1 = await firebase_firestore.collection("questionPapers").doc(req.body.questionPaperId).update(questionPaperJson);
                // const result2 = await firebase_firestore.collection("exams").doc(req.body.examId).update({questionPaperId:req.questionPaperId})
                return res.status(200).json("Question Paper updated successfully" + result1)

            } else {
                return res.status(400).json("The question paper you are trying to edit doesn't exists")
            }

        }else{
           
            return res.status(400).json("Provide questionPaper and examId properly")
        }
        
    } catch (error) {
        return res.status(500).json("Failed to update Question Paper"+error)
    }
}

const deleteQuestionPaper = async(req,res)=>{
    if(req.body.questionPaperId && req.body.examId){
        if(questionPaperExists(req.body.questionPaperId,req.body.examId)){
            await firebase_firestore.collection("questionPapers").doc(req.body.questionPaperId).delete()
            await firebase_firestore.collection("exams").doc(req.body.examId).update({questionPaperId:fieldValue.delete()})
            return res.status(200).json("Question Paper deleted")
        }
    }else{
        return res.status(400).json("Provide proper exam and question Paper")
    }
}

// const enrollStudent = async (req, res) => {
//     try {
//         var firestorePromises = [];
//         const studentsList = req.body.studentsList;
//         var filteredStudentsList = []

//         for (var i = 0; i < studentsList.length; i++) {

//             req.body.emailId = studentsList[i]

//             await userExists(req, res, async () => {
//                 if (req.body.userExists) {
//                     filteredStudentsList.push(req.body.userExists)
//                     console.log(req.body.emailId)
//                     try {
//                         await Promise.resolve(firebase_firestore.collection("users").doc(req.body.userExists.userId).update({
//                             examsEnrolled: admin.firestore.FieldValue.arrayUnion(req.body.examId)
//                         }))
//                     } catch (error) {
//                         console.log("Something went wrong")
//                     }

//                 }

//             })


//         }
//         for (var i = 0; i < filteredStudentsList.length; i++) {
//             try {
//                 await firebase_firestore.collection("exams").doc(req.body.examId).update({
//                     studentsList: admin.firestore.FieldValue.arrayUnion(filteredStudentsList[i].userId)
//                 });
//             } catch (error) {
//                 console.log(error)

//             }
//         }


//         res.status(200).json("Students enrolled successfully")

//     } catch (error) {
//         res.status(500).json("Something went wrong try again later" + error)
//     }



// }







const enrollStudent = async (req, res) => {
    try {
      

     
        const studentsList = req.body.studentsList;
        var filteredStudentsList = []
        var invalidUsers = [];

        for (var i = 0; i < studentsList.length; i++) {

            req.body.emailId = studentsList[i]

            await userExists(req, res, async () => {
                if (req.body.userExists) {
                    filteredStudentsList.push(req.body.userExists)
                   
                    try {
                        await Promise.resolve(firebase_firestore.collection("users").doc(req.body.userExists.userId).update({
                            examsEnrolled: admin.firestore.FieldValue.arrayUnion(req.body.examId)
                        }))
                    } catch (error) {
                      
                    } 


                }else{
                    invalidUsers.push(req.body.emailId)
                }

            })


        }

        for (var i = 0; i < filteredStudentsList.length; i++) {
            try {
                await firebase_firestore.collection("exams").doc(req.body.examId).update({
                    studentsList: admin.firestore.FieldValue.arrayUnion(filteredStudentsList[i].userId)
                });
            } catch (error) {
                

            }
        }


        res.status(200).json("Students enrolled successfully and users:- "+ invalidUsers+" doesn't exists")

    } catch (error) {
        res.status(500).json("Something went wrong try again later" + error)
    }



}









const getQuestionPaper = async (req, res) => {
    try {
       
        // does exam exists

        const exam = await firebase_firestore.collection("exams").doc(req.query.examId).get();

        if (!exam.exists) {
            return res.status(400).json("Exam doesn't exist")
        }
        // is user authentic to get questionPaper
        if(!examAccess(exam,req.session.userId)){
            return res.status(400).json("Permission denied to access the exam")
        }
        if(!await inTime(exam,req.session.userId)){
            return res.status(400).json("Exam Time out")
        }


        var questionPaper = [];
        var questionPaperAnswers
        try {
            
            questionPaperAnswers = (await firebase_firestore.collection('questionPapers').doc(exam.data()["questionPaperId"]).get()).data()["questionAnswers"];
        } catch (error) {
            return res.status(400).json("Please create a question Paper first")
        }
        for (var i = 0; i < questionPaperAnswers.length; i++) {

            var question = {
                "questionId": questionPaperAnswers[i]["questionId"],
                "question": questionPaperAnswers[i]["question"],
                "weightage":questionPaperAnswers[i]["weightage"]

            }
            var options = []
            for (var j = 0; j < questionPaperAnswers[i]["options"].length; j++) {
                var option = {
                    "optionId": questionPaperAnswers[i]["options"][j]["optionId"],
                    "optionDesc": questionPaperAnswers[i]["options"][j]["optionDesc"],

                }
                options.push(option)
            }
            question.options = options

            questionPaper.push(question)

        }

        return res.status(200).json(questionPaper)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }


}

export {
    createExam,
    updateExam,
    getExam,
    deleteExam,
    enrollStudent,
    assignQuestionPaper,
    updateQuestionPaper,
    getQuestionPaper,
    deleteQuestionPaper
}
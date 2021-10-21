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
    examCreatedBySupervisor,
    questionPaperExists
} from "../helpers/exams.js";
const fieldValue = admin.firestore.FieldValue;





const createExam = async (req, res) => {
    try {

        const doc = await firebase_firestore.collection('users').doc(req.user.userId).get();
        if (!doc.exists) {
            res.status(400).json("User doesn't exists")
        }
        if (req.body.examId) {
            if (await examCreatedBySupervisor(req.user.userId, req.body.examId)) {
                console.log("examId exists")
                const studentsList = await (await firebase_firestore.collection("exams").doc(req.body.examId).get()).data()["studentsList"]
                const newExam = new Exam(req.body.examId, req.user.userId, req.body.examName, req.body.examStarttime, req.body.examEndTime)
                newExam.studentsList = studentsList;
                const examJson = JSON.parse(JSON.stringify(newExam))
                const result = await firebase_firestore.collection('exams').doc(req.body.examId).update(examJson);
                // await firebase_firestore.collection('users').doc(req.user.userId).set({examsCreated:presentExamsCreated},{merge:true})
                // await firebase_firestore.collection('users').doc(req.user.userId).update({ examsCreated: fieldValue.arrayUnion(newId) });

                res.status(200).json("Exam details updated" + result);
            } else {
                console.log("examId doesnt exists")

                return res.status(400).json("Exam you are trying to edit doesn't exists");
            }
        } else {
            const newId = uid()
            const newExam = new Exam(newId, req.user.userId, req.body.examName, req.body.examStarttime, req.body.examEndTime)
            const examJson = JSON.parse(JSON.stringify(newExam))
            const result = await firebase_firestore.collection('exams').doc(newId).create(examJson);
            // await firebase_firestore.collection('users').doc(req.user.userId).set({examsCreated:presentExamsCreated},{merge:true})
            await firebase_firestore.collection('users').doc(req.user.userId).update({
                examsCreated: fieldValue.arrayUnion(newId)
            });

            res.status(200).json("Exam Created" + result);

        }

    } catch (error) {
        res.status(500).json("Failed to create exam " + error)

    }

}
const changeExamSettings = async (req, res) => {

}

const assignQuestionPaper = async (req, res) => {
    try {
        const newId = uid()
        const questionPaper = new QuestionPaper(req.body.examId, req.body.questionAnswers)
        const questionPaperJson = JSON.parse(JSON.stringify(questionPaper))
        if (req.body.questionPaperId) {
            if (await questionPaperExists(req.body.questionPaperId, req.body.examId)) {
                const result1 = await firebase_firestore.collection("questionPapers").doc(req.body.questionPaperId).update(questionPaperJson);
                // const result2 = await firebase_firestore.collection("exams").doc(req.body.examId).update({questionPaperId:req.questionPaperId})
                res.status(200).json("Question Paper updated successfullu" + result1)

            } else {
                res.status(400).json("The question paper you are trying to edit doesn't exists")
            }

        } else {
            const result1 = await firebase_firestore.collection("questionPapers").doc(newId).create(questionPaperJson);
            const result2 = await firebase_firestore.collection("exams").doc(req.body.examId).update({
                questionPaperId: newId
            })
            res.status(200).json("Question Paper created successfullu" + result1 + result2)


        }




    } catch (error) {
        res.status(400).json("Failed to create questionPaper" + error)
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
        if(!examCreatedBySupervisor(req.user.userId,req.body.examId,res)){
            res.status(400).json("You are not authenticated for changing this exam settings")
        }
     
        const studentsList = req.body.studentsList;
        var filteredStudentsList = []
        var invalidUsers = [];

        for (var i = 0; i < studentsList.length; i++) {

            req.body.emailId = studentsList[i]

            await userExists(req, res, async () => {
                if (req.body.userExists) {
                    filteredStudentsList.push(req.body.userExists)
                    console.log(req.body.emailId)
                    try {
                        await Promise.resolve(firebase_firestore.collection("users").doc(req.body.userExists.userId).update({
                            examsEnrolled: admin.firestore.FieldValue.arrayUnion(req.body.examId)
                        }))
                    } catch (error) {
                        console.log("Something went wrong")
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
                console.log(error)

            }
        }


        res.status(200).json("Students enrolled successfully and users:- "+ invalidUsers+" doesn't exists")

    } catch (error) {
        res.status(500).json("Something went wrong try again later" + error)
    }



}









const getQuestionPaper = async (req, res) => {
    try {
        console.log(req.query.examId)
        // does exam exists

        const exam = await firebase_firestore.collection("exams").doc(req.query.examId).get();

        if (!exam.exists) {
            return res.status(400).json("Exam doesn't exist")
        }

        // is user authentic to get questionPaper
        var userEligible = false
        const usersList = exam.data()["studentsList"]
        usersList.push(exam.data()["supervisorId"])
        var userEligible = false

        for (var i = 0; i < usersList.length; i++) {
            if (usersList[i] === req.session.userId) {
                userEligible = true
                break;
            }
        }
        if (!userEligible) {
            return res.status(400).json("You are not eligible to access the questionPaper")
        }
        var questionPaper = [];
        const questionPaperAnswers = (await firebase_firestore.collection('questionPapers').doc(exam.data()["questionPaperId"]).get()).data()["questionAnswers"];
        for (var i = 0; i < questionPaperAnswers.length; i++) {

            var question = {
                "questionId": questionPaperAnswers[i]["questionId"],
                "question": questionPaperAnswers[i]["question"]

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
    assignQuestionPaper,
    enrollStudent,
    getQuestionPaper
}
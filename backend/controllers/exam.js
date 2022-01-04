import {
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
    hasSubmitted,
    inTime,
    questionPaperExists,
    questionPaperFromExam
} from "../helpers/exams.js";
import {
    ExamAndSupervisor
} from "../helpers/auth.js";
import {
    sendMail
} from "../helpers/email.js";
const fieldValue = admin.firestore.FieldValue;



// CRUD EXAMS

const createExam = async (req, res) => {
    try {


        const newId = uid()
        const newExam = new Exam(newId, req.user.userId, req.body.examName, req.body.examStartTime, req.body.examEndTime, req.body.examDesc,req.body.examInstructions)
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
        const newExam = new Exam(req.body.examId, req.user.userId, req.body.examName, req.body.examStartTime, req.body.examEndTime, req.body.examDesc,req.body.examInstructions)
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

const getExam = async (req, res) => {
    try {
        if (req.query.examId) {
            const exam = await firebase_firestore.collection("exams").doc(req.query.examId).get()
            if (exam) {
                if (!examAccess(exam, req.session.userId)) {
                    return res.status(400).json("Permission denied to access the exam")
                }
                return res.status(200).json(exam.data())
            } else {
                return res.status(400).json("Invalid examId")
            }


        } else {
            res.status(400).json("Provide examId")
        }

    } catch (error) {
        return res.status(500).json(error + " Failed to get exam details")
    }
}

const deleteExam = async (req, res) => {
    try {
        if (req.body.examId) {
            const exam = await firebase_firestore.collection("exams").doc(req.body.examId).get()
            const examSup = exam.data()["supervisorId"];
            const studentsList = exam.data()["studentsList"]
            try {
                await firebase_firestore.collection("questionPapers").doc(exam.data()["questionPaperId"]).delete()
                p
            } catch (error) {
                console.log("Question Paper was not created")
            }
            await firebase_firestore.collection("users").doc(examSup).update({
                examsCreated: admin.firestore.FieldValue.arrayRemove(exam.data()["examId"])
            });
            studentsList.map(async (student) => {

                await firebase_firestore.collection("users").doc(student).update({
                    examsEnrolled: admin.firestore.FieldValue.arrayRemove(exam.data()["examId"])
                });
            })
            await firebase_firestore.collection("exams").doc(exam.id).delete()



            return res.status(200).json("exam deleted ")

        } else {
            return res.status(400).json("Provide examId")
        }

    } catch (error) {
        return res.status(500).json(error + " Failed to delete exam")
    }
}

const getAllExams = async (req, res) => {

    if (req.user.isStudent) {
        const studentId = req.user.userId;

        try {
            var examsList = [];
            var examIdsList
            try {
                examIdsList = await (await firebase_firestore.collection("users").doc(studentId).get()).data()["examsEnrolled"]

            } catch (error) {
                return res.status.json([])
            }
            if (examIdsList) {
                for (var i = 0; i < examIdsList.length; i++) {
                    var exam = await firebase_firestore.collection("exams").doc(examIdsList[i]).get()
                    if (exam) {
                        let examData = exam.data()
                        let {supervisorId,studentsList,questionPaperId,createdAt,examInstructions,...other} = examData;

                        examsList.push(other)
                    }
                }


            } else {
                return res.status(200).json([])
            }

            if (examsList.length > 0) {

                return res.status(200).json(examsList)
            } else {
                return res.status(200).json([])

            }

        } catch (error) {
            return res.status(500).json("Something went wrong")
        }
    } else if (req.user.isSupervisor) {
        const supervisorId = req.user.userId;

        try {
            var examsList = [];
            var examIdsList
            try {
                examIdsList = await (await firebase_firestore.collection("users").doc(supervisorId).get()).data()["examsCreated"]

            } catch (error) {
                return res.status(200).json([])
            }
            if (examIdsList) {
                for (var i = 0; i < examIdsList.length; i++) {
                    var exam = await firebase_firestore.collection("exams").doc(examIdsList[i]).get()
                    if (exam) {
                        let examData = exam.data()
                        // let {studentsList,...other} = examData;

                        examsList.push(examData)
                    }
                }


            } else {
                return res.status(200).json([])
            }

            if (examsList.length > 0) {

                return res.status(200).json(examsList)
            } else {
                return res.status(200).json([])

            }

        } catch (error) {
            return res.status(500).json("Something went wrong")
        }
    }

}


// CRUD QUESTION PAPER
const assignQuestionPaper = async (req, res) => {
    try {
        if (!req.body.examId) {
            return res.status(400).json("Provide examId in request body")
        }
        const qpe = await questionPaperFromExam(req.body.examId)

        if (qpe) {
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


const updateQuestionPaper = async (req, res) => {
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

        } else {

            return res.status(400).json("Provide questionPaper and examId properly")
        }

    } catch (error) {
        return res.status(500).json("Failed to update Question Paper" + error)
    }
}

const deleteQuestionPaper = async (req, res) => {
    if (req.body.questionPaperId && req.body.examId) {
        if (questionPaperExists(req.body.questionPaperId, req.body.examId)) {
            await firebase_firestore.collection("questionPapers").doc(req.body.questionPaperId).delete()
            await firebase_firestore.collection("exams").doc(req.body.examId).update({
                questionPaperId: fieldValue.delete()
            })
            return res.status(200).json("Question Paper deleted")
        }
    } else {
        return res.status(400).json("Provide proper exam and question Paper")
    }
}


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
                        console.log(error)
                    }
                } else {
                    invalidUsers.push(req.body.emailId)
                }
            })
        }
        for (var i = 0; i < filteredStudentsList.length; i++) {
            try {
                await firebase_firestore.collection("exams").doc(req.body.examId).update({
                    studentsList: admin.firestore.FieldValue.arrayUnion(filteredStudentsList[i].userId)
                });
                // Create a URL for that particular student for that exam and mail it
                const student_data = await firebase_firestore.collection("users").where("emailId", "==", filteredStudentsList[i].emailId).get()
                const Exam_Id = await firebase_firestore.collection("exams").where("examId", "==", req.body.examId).get()

                var student_details
                var Test_name
                if (!student_data.empty && !Exam_Id.empty) {
                    student_data.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
                        student_details = doc.data()
                    });
                    Exam_Id.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
                        Test_name = doc.data()
                    });
                }

                // const subject = "Link for exam" + " " + Test_name.examId
                // const body = "http://localhost:8080/api/user/" + student_details.userId + "/" + req.body.examId
                // await sendMail(filteredStudentsList[i].emailId, subject, body)

            } catch (error) {
                console.log(error)
            }
        }

        return res.status(200).json("Students enrolled successfully and users:- " + invalidUsers + " doesn't exists")

    } catch (error) {
        res.status(500).json("Something went wrong try again later" + error)
    }

}

const removeStudents = async (req, res) => {
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
                            examsEnrolled: admin.firestore.FieldValue.arrayRemove(req.body.examId)
                        }))
                    } catch (error) {}
                } else {
                    invalidUsers.push(req.body.emailId)
                }
            })
        }
        for (var i = 0; i < filteredStudentsList.length; i++) {
            try {
                await firebase_firestore.collection("exams").doc(req.body.examId).update({
                    studentsList: admin.firestore.FieldValue.arrayRemove(filteredStudentsList[i].userId)
                });
            } catch (error) {}
        }

        return res.status(200).json("Students removed from exam successfully and users:- " + invalidUsers + " doesn't exists")

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
        if (!examAccess(exam, req.session.userId)) {
            return res.status(400).json("Permission denied to access the exam")
        }
        if (!await inTime(exam, req.session.userId)) {
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
                "weightage": questionPaperAnswers[i]["weightage"]

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

const receiveAnswer = async (req, res) => {
    try {
        const exam = await firebase_firestore.collection("exams").doc(req.body.examId).get();
        if (exam) {
            if (!examAccess(exam, req.user.userId)) {
                return res.status(400).json("You are not allowed to access the exam")

            }
            // GET FULL QUESTION PAPER

            const questionPaperDoc = await firebase_firestore.collection("questionPapers").doc(exam.data()["questionPaperId"]).get();
            const questionPaper = questionPaperDoc.data()["questionAnswers"];
            console.log(questionPaper[0].options)
            var totalMarks = 0;
            const answers = req.body.answers;
            console.log("answers length " + answers.length)
            console.log("answers server length " + questionPaper.length)

            var submitCount = 0;

            try {
                for (var i = 0; i < answers.length; i++) {
                    // for(var j=0;j< questionPaper[i]["options"];j++){
                    //     if()
                    // } 
                    if (answers[i]["userSelection"]) {
                        submitCount++;
                        console.log("here 1")
                        console.log("questionId " + answers[i].questionId)
                        console.log("questionId questPaper " + questionPaper[i].questionId)

                        console.log("user Select " + questionPaper[i].options[answers[i]["userSelection"]]["isCorrect"])
                        if (questionPaper[i].options[answers[i]["userSelection"]]["isCorrect"] === true && questionPaper[i].questionId === answers[i].questionId) {
                            totalMarks = totalMarks + questionPaper[i]["weightage"]
                        }
                    }
                }
                console.log("marks scored " + totalMarks);
                if (submitCount == questionPaper.length) {

                    console.log("here 2")
                    req.body.answers.marksScored = totalMarks;
                    // await firebase_firestore.collection("responses").doc(req.body.examId).create(req.body.answers)

                    await firebase_firestore.collection("exams").doc(req.body.examId).collection("responses").doc(req.user.userId).create(req.body.answers)
                } else {
                    return res.status(400).json("Attempt all questions and then submit")
                }

            } catch (error) {
                return res.status(400).json("Something went wrong while submiting the response")
            }

            return res.status(200).json("You scored " + totalMarks)

        } else {
            return res.status(404).json("Exam doesn't exists")
        }
    } catch (err) {
        return res.status(500).json("Something went wrong. Try again later.")
    }

}


const receiveAnswers = async (req, res) => {
    try {
        const exam = await firebase_firestore.collection("exams").doc(req.body.examId).get();


        if (exam) {
            if (!examAccess(exam, req.user.userId)) {
                return res.status(400).json("You are not allowed to access the exam")

            }
            // console.log(hasSubmitted(exam.data()["examId"],req.user.userId))
            if (await hasSubmitted(exam.data()["examId"], req.user.userId)) {
                return res.status(400).json("You have already submitted the exam")
            }

            const questionPaperDoc = await firebase_firestore.collection("questionPapers").doc(exam.data()["questionPaperId"]).get();
            const questionPaper = questionPaperDoc.data()["questionAnswers"];

            var totalMarks = 0;
            const answers = req.body.answers;


            try {
                for (var i = 0; i < answers.length; i++) {
                    var currentQuestionId = answers[i].questionId;
                    var currentUserSelection = answers[i].userSelection;

                    for (var j = 0; j < questionPaper.length; j++) {

                        if (questionPaper[j].questionId === currentQuestionId) {
                            if (questionPaper[j].options[currentUserSelection].isCorrect) {
                                totalMarks = totalMarks + questionPaper[j].weightage
                            }
                        }

                    }



                }

                const answerJson = {
                    "answers": req.body.answers,
                    "marksScored": totalMarks
                }
                //  const answerJson = JSON({answers,totalMarks})
                // req.body.answers.marksScored = totalMarks


                console.log(answerJson)
                try {
                    // const answerResponse = [req.user.userId,req.body.answers]

                    await firebase_firestore.collection("exams").doc(req.body.examId).collection("responses").doc(req.user.userId).set({
                        ...answerJson
                    })
                    await firebase_firestore.collection("users").doc(req.user.userId).update({
                        "history": fieldValue.arrayUnion(req.body.examId)
                    });
                    // Send email to the student
                    await sendMail(req.user.emailId, "Results for " + exam.data()["examName"], "Your marks for the exam " + exam.data()["examName"] + " is " + totalMarks)

                    res.status(200).json("Response submitted successfully")
                } catch (error) {
                    res.status(500).json("Something went wrong. Try agin later.")
                }

            } catch (error) {
                res.status(500).json("Something went wrong.")

            }







        }

    } catch (error) {
        res.status(500).json("Something went wrongg")

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
    deleteQuestionPaper,
    removeStudents,
    getAllExams,
    receiveAnswers
}
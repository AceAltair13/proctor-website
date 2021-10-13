import { firebase_storage, firebase_firestore } from "../db.js";
import * as config from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import { userExists, userExistsFunction } from "../helpers/users.js";
import jwt from "jsonwebtoken"
import Exam from "../models/Exam.js"
import { uid } from "../helpers/other.js";
import  admin from "firebase-admin";
import QuestionPaper from "../models/QuestionPaper.js";
import { examExists, questionPaperExists } from "../helpers/exams.js";
const fieldValue = admin.firestore.FieldValue;





const createExam = async (req, res) => {
      try {
          
          const doc = await firebase_firestore.collection('users').doc(req.user.userId).get();
          if(!doc.exists){
              res.status(400).json("User doesn't exists")
            }
            if(req.body.examId){
                if(await examExists(req.user.userId,req.body.examId)){
                  console.log("examId exists")
                    const newExam = new Exam(req.body.examId, req.user.userId, req.body.examName, req.body.examStarttime, req.body.examEndTime)
                    const examJson = JSON.parse(JSON.stringify(newExam))
                    const result = await firebase_firestore.collection('exams').doc(req.body.examId).update(examJson);
                // await firebase_firestore.collection('users').doc(req.user.userId).set({examsCreated:presentExamsCreated},{merge:true})
                    // await firebase_firestore.collection('users').doc(req.user.userId).update({ examsCreated: fieldValue.arrayUnion(newId) });
        
                    res.status(200).json("Exam details updated"+result);                   
                }else{
                  console.log("examId doesnt exists")

                  return res.status(400).json("Exam you are trying to edit doesn't exists");
                }
            }else{
                const newId = uid()
                const newExam = new Exam(newId, req.user.userId, req.body.examName, req.body.examStarttime, req.body.examEndTime)
                const examJson = JSON.parse(JSON.stringify(newExam))
                const result = await firebase_firestore.collection('exams').doc(newId).create(examJson);
            // await firebase_firestore.collection('users').doc(req.user.userId).set({examsCreated:presentExamsCreated},{merge:true})
                await firebase_firestore.collection('users').doc(req.user.userId).update({ examsCreated: fieldValue.arrayUnion(newId) });
    
                res.status(200).json("Exam Created"+result);

            }

    } catch (error) {
        res.status(500).json("Failed to create exam " + error)

    }

}
const changeExamSettings = async (req, res) => {

}

const assignQuestionPpaer = async (req,res) => {
    try {
        const newId = uid()
        const questionPaper = new QuestionPaper(req.body.examId,req.body.questionAnswers)
        const questionPaperJson = JSON.parse(JSON.stringify(questionPaper))
        if(req.body.questionPaperId){
            if(await questionPaperExists(req.body.questionPaperId,req.body.examId)){
                const result1 = await firebase_firestore.collection("questionPapers").doc(req.body.questionPaperId).update(questionPaperJson);
                // const result2 = await firebase_firestore.collection("exams").doc(req.body.examId).update({questionPaperId:req.questionPaperId})
                res.status(200).json("Question Paper updated successfullu"+result1)

            }else{
                res.status(400).json("The question paper you are trying to edit doesn't exists")
            }

        }else{
            const result1 = await firebase_firestore.collection("questionPapers").doc(newId).create(questionPaperJson);
            const result2 = await firebase_firestore.collection("exams").doc(req.body.examId).update({questionPaperId:newId})
            res.status(200).json("Question Paper created successfullu"+result1+result2)


        }
        
    
       
        
    } catch (error) {
        res.status(400).json("Failed to create questionPaper"+error)
    }


}

const enrollStudent = async(req,res)=>{
    try{
        const studentsList = req.body.studentsList;

        for(var i=0;i<studentsList.length;i++){
            
            req.body.emailId = studentsList[i]

             userExists(req,res,async()=>{
                if(req.body.userExists){
                    console.log(req.body.emailId)

                    await firebase_firestore.collection("exams").doc(req.body.examId).update({studentsList:admin.firestore.FieldValue.arrayUnion(req.body.userExists.userId)});
                    await firebase_firestore.collection("users").doc(req.body.userExists.userId).update({examsEnrolled:admin.firestore.FieldValue.arrayUnion(req.body.examId)});
                    console.log("here")
            }

                
            })
            // const data = await userExistsFunction(studentsList[i])
            // if(data!==false){
            //     console.log(data)
            //     await firebase_firestore.collection("exams").doc(req.body.examId).update({studentsList:admin.firestore.FieldValue.arrayUnion(data.userId)});
            //     await firebase_firestore.collection("users").doc(data.userId).update({examsEnrolled:admin.firestore.FieldValue.arrayUnion(req.body.examId)});

            // }
    
        }
        res.status(200).json("Students enrolled successfully")

    }catch(error){
        res.status(500).json("Something went wrong try again later"+error)
    }



}

export {
    createExam,assignQuestionPpaer,enrollStudent
}

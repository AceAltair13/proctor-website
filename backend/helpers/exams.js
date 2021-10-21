import jwt from "jsonwebtoken"

import * as config from "../config.js";
import {
    firebase_firestore
} from "../db.js";


export const questionPaperExists = async (questionPaperId, examId) => {
    await firebase_firestore.collection("exams").doc(examId).get(questionPaperId).then((snapshot) => {
        if (snapshot.exists) {
            return true
        } else {
            return false
        }

    })
}
export const examCreatedBySupervisor = async (userId, examId, res) => {
    var examsCreated
    try {
        examsCreated = (await firebase_firestore.collection("users").doc(userId).get()).data()["examsCreated"]
        
    } catch (error) {
        res.status(400).json("User doesn't have any exams created")
    }
    console.log(examsCreated)
    if(examsCreated){

        for (var i = 0; i < examsCreated.length; i++) {
            if (examsCreated[i] === examId) {
                return true
            }
        }
    }
        return false;

}


export const isStudentEnrolled = async(req,res,next)=>{
    

}

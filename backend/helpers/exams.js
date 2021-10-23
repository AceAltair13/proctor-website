import jwt from "jsonwebtoken"

import * as config from "../config.js";
import {
    firebase_firestore
} from "../db.js";


export const questionPaperExists = async (questionPaperId, examId) => {

    try {
        await firebase_firestore.collection("exams").doc(examId).get("questionPaperId").then((snapshot) => {
            if (snapshot.exists) {
                if (snapshot.data()["questionPaperId"] === questionPaperId) {

                    return true
                } else {
                    return false
                }
            } else {
                return false
            }

        })
    } catch (error) {
        return false
    }

}
export const examCreatedBySupervisor = async (req, res, next) => {
    const userId = req.user.userId;
    const examId = req.body.examId;
    var examFound = false;
    if(examId){
        var examsCreated
        try {
            examsCreated = (await firebase_firestore.collection("users").doc(userId).get()).data()["examsCreated"]
    
        } catch (error) {
            return res.status(400).json("User doesn't have any exams created")
        }
        console.log(examsCreated)
        if (examsCreated) {
            for (var i = 0; i < examsCreated.length; i++) {
                if (examsCreated[i] === examId) {
                    // req.examCreatedBySupervisor = true;
                    examFound = true;
                    break;
                  
                }
            }
        }
        if(examFound){
            next()
        }else{

            return res.status(400).json("You are not authenticated for changing this exam settings");
        }
    }else{
        return res.status(400).json("provide examId")
    }


}


export const examAccess = (exam,userId)=>{
    var userEligible = false
    const usersList = exam.data()["studentsList"]
    usersList.push(exam.data()["supervisorId"])
    var userEligible = false

    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i] === userId) {
            userEligible = true
            break;
        }
    }
    return userEligible
}

export const isStudentEnrolled = async (req, res, next) => {


}
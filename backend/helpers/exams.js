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
export const examExists = async (userId, examId) => {
    const examsCreated = (await firebase_firestore.collection("users").doc(userId).get()).data()["examsCreated"]
    console.log(examsCreated)
    for (var i = 0; i < examsCreated.length; i++) {
        if (examsCreated[i] === examId) {
            return true
        }
    }
    return false;

}
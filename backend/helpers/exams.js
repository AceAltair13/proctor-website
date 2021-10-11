import jwt from "jsonwebtoken"
import * as config from "../config.js";
import { firebase_firestore } from "../db.js";


export const questionPaperExists = async(questionPaperId,examId)=>{
     await firebase_firestore.collection("exams").doc(examId).get(questionPaperId).then((snapshot)=>{
        if(snapshot.exists){
            return true
        }else{
            return false
        }

    })
}
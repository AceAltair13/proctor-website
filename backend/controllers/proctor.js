import { firebase_firestore, firebase_storage } from "../db.js"
import { examAccess } from "../helpers/exams.js"




const postMalpractice = async(req,res)=>{
    var exam
    try {
        exam = await firebase_firestore.collection("users").doc(req.user.userId).get()
    } catch (error) {
        return res.status(400).json("Exam doesn't exists")
    }
    if(examAccess(exam,req.user.userId)){
        
    }
}

export {
    postMalpractice
}
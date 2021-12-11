import { firebase_firestore, firebase_storage } from "../db.js"
import { examAccess } from "../helpers/exams.js"
import multer from "multer"
import fs from 'fs'

const postMalpractice = async (req, res) => {
    // console.log(req.user)
    // console.log(req.headers.token)
    // const dir = "./" + req.headers.token
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }
    // // await firebase_storage.bucket().file(req.file.originalname).createWriteStream().end(req.file.buffer)
    // console.log(req)
    // console.log(req.file, req.body)
    // res.status(200).json("file is uploaded successfully")
    // res.end()
    // // try {
    // //     exam = await firebase_firestore.collection("users").doc(req.user.userId).get()
    // // } catch (error) {
    // //     return res.status(400).json("Exam doesn't exists")
    // // }
    // // if(examAccess(exam,req.user.userId)){

    // // }

    let img = req.file

}

export {
    postMalpractice
}
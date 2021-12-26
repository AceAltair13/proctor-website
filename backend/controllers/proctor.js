import { storageRef } from "../db.js"
import { examAccess } from "../helpers/exams.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs"

const postMalpractice = async (req, res) => {
    const metadata = { contentType: 'image/jpeg; charset=utf-8' }
    const folder = req.user.userId + "/" + req.file.filename
    const storageRef_1 = ref(storageRef, folder);
    fs.readFile(req.file.path, function (err, buffer) {
        uploadBytes(storageRef_1, buffer, metadata).then((snapshot) => {
            console.log('file is uploaded successfully!');
        });
    })

    await getDownloadURL(ref(storageRef_1))
        .then((url) => {
            console.log("download url", url)
        })
        .catch((error) => {
            console.log(error)
        });

    res.status(200).json("file is uploaded successfully")
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('done');
    });
    res.end()
    // try {
    //     exam = await firebase_firestore.collection("users").doc(req.user.userId).get()
    // } catch (error) {
    //     return res.status(400).json("Exam doesn't exists")
    // }
    // if(examAccess(exam,req.user.userId)){

    // // }
}

export {
    postMalpractice
}
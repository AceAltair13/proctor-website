import { storageRef, firebase_firestore } from "../db.js"
import { examAccess } from "../helpers/exams.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs"


var folder
var storageRef_1
const postMalpractice = async (req, res, next) => {
    console.log(req.body.exam)
    const metadata = { contentType: 'image/jpeg; charset=utf-8' }
    folder = req.user.userId + "/" + req.file.filename
    storageRef_1 = ref(storageRef, folder);
    fs.readFile(req.file.path, function (err, buffer) {
        upload(buffer)
    })
    download()
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('done');
    });
    res.status(200).json("file is uploaded successfully")
    res.end()
    next()
    async function download() {
        await firebase_firestore.collection("users").doc(req.user.userId).update({ location_1: folder });
    }

    async function upload(buffer) {
        await uploadBytes(storageRef_1, buffer, metadata).then((snapshot) => {
            console.log('file is uploaded successfully!');
        });
    }
    // try {
    //     exam = await firebase_firestore.collection("users").doc(req.user.userId).get()
    // } catch (error) {
    //     return res.status(400).json("Exam doesn't exists")
    // }
    // if(examAccess(exam,req.user.userId)){

    // // }
}
const download_link = async (req, res) => {
    const snapshot = await firebase_firestore.collection("users").where("userId", "==", req.user.userId).get()
    var link
    snapshot.forEach((doc) => {
        storageRef_1 = ref(storageRef, doc.data().location_1);
    })
    await getDownloadURL(ref(storageRef_1))
        .then((url) => {
            console.log("download url", url);
            link = url
        })
        .catch((error) => {
            console.log("errr", error);
        });
    await firebase_firestore.collection("users").doc(req.user.userId).update({ download_link:link});

}

export {
    postMalpractice, download_link
}
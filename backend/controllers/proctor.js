import { storageRef, firebase_firestore } from "../db.js"
import { examAccess } from "../helpers/exams.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs"

const postMalpractice = async (req, res) => {
    const metadata = { contentType: 'image/jpeg; charset=utf-8' }
    const folder = req.user.userId + "/" + req.file.filename
    const storageRef_1 = ref(storageRef, folder);
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
    async function download() {
        const pointer = JSON.stringify(ref(storageRef_1));
        console.log(typeof (pointer))
        await firebase_firestore.collection("users").doc(req.user.userId).update({ ref: pointer });
        console.log(storageRef_1)
        await getDownloadURL(ref(storageRef_1))
            .then((url) => {
                console.log("download url", url);
            })
            .catch((error) => {
                console.log("errr", error);
            });
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

export {
    postMalpractice
}
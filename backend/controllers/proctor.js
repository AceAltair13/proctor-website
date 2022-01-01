import { storageRef, firebase_firestore } from "../db.js"
import { examAccess } from "../helpers/exams.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs"



const postMalpractice = async (req, res, next) => {
    const metadata = { contentType: 'image/jpeg; charset=utf-8' }
    const type = req.body.type
    const folder = req.user.userId + "/" + req.body.type + "/" + req.file.filename
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
        await firebase_firestore.collection("users").doc(req.user.userId).update({ folder_location: folder });
    }

    async function upload(buffer) {
        await uploadBytes(storageRef_1, buffer, metadata).then((snapshot) => {
            console.log('file is uploaded successfully!');
        });
    }


    async function updating_into_firestore(type, url) {
        if (type === "Face Recoginition")
        {
            await firebase_firestore.collection("users").doc(req.user.userId).update({ "Face_Recoginition": url });
        }
    }
    async function download_link() {
        await getDownloadURL(ref(storageRef_1))
            .then((url) => {
                console.log("download url", url);
                updating_into_firestore(type, url);

            })
            .catch((error) => {
                console.log("errr", error);
            });
    }
    setTimeout(download_link, 1000)
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
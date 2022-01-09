import { storageRef, firebase_firestore } from "../db.js"
import { examAccess } from "../helpers/exams.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs"
import base64ToImage from "base64-to-image";
import path from "path";

const upload_face = async (req, res, next) => {
    const __dirname = path.resolve();
    var optionalObj = {'fileName': 'face', 'type':'jpeg'};
    base64ToImage(req.body.image,path.join(__dirname,"controllers"),optionalObj)
    const metadata = { contentType: 'image/jpeg; charset=utf-8' }
    const folder = req.user.userId + "/" + "Face Recoginition" + "/" + "face.jpeg"
    const storageRef_1 = ref(storageRef, folder);
    fs.readFile(path.join(__dirname)+"/controllersface.jpeg", function (err, buffer) {
        console.log("function",buffer)
        upload(buffer)
    })
    download()
    fs.unlink(path.join(__dirname)+"/controllersface.jpeg", (err) => {
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
            console.log('file is uploaded Successfully!');
        });
    }


    async function updating_into_firestore(url) {
        await firebase_firestore.collection("users").doc(req.user.userId).update({ "Face_Recoginition": url });
    }
    async function download_link() {
        await getDownloadURL(ref(storageRef_1))
            .then((url) => {
                console.log("download url", url);
                updating_into_firestore(url);

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
    upload_face
}
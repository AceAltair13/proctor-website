import { storageRef, firebase_firestore } from "../db.js";
import { uid } from "../helpers/other.js";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
// import fs from "fs"
// import base64ToImage from "base64-to-image";
// import path from "path";

const upload_face = async (req, res) => {
    // console.log(req.body.image)
    // const __dirname = path.resolve();
    // var optionalObj = { 'fileName': 'face', 'type': 'jpeg' };
    // base64ToImage(req.body.image, path.join(__dirname, "controllers"), optionalObj)
    const metadata = { contentType: "image/jpeg; charset=utf-8" };
    const folder =
        req.user.userId +
        req.body.exam +
        "/" +
        "faceRecoginition" +
        "/" +
        "face.jpeg";
    const storageRef_1 = ref(storageRef, folder);
    upload();
    // fs.readFile(path.join(__dirname) + "/controllersface.jpeg", function (err, buffer) {
    //     upload()
    // })
    // fs.unlink(path.join(__dirname) + "/controllersface.jpeg", (err) => {
    //     if (err) throw err;
    //     console.log('done');
    // });
    res.status(200).json("file is uploaded successfully");
    res.end();
    async function upload() {
        // await uploadBytes(storageRef_1, buffer, metadata).then((snapshot) => {
        //     console.log('file is uploaded Successfully!');
        // });
        uploadString(storageRef_1, req.body.image, "data_url", metadata).then(
            (snapshot) => {
                console.log("Uploaded a base64 string!", snapshot);
            }
        );
    }
    async function updating_into_firestore(url) {
        await firebase_firestore
            .collection("exams")
            .doc(req.body.exam)
            .collection("candidates")
            .doc(req.user.userId)
            .set({ face: url, folderLocation: folder });
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
    setTimeout(download_link, 300);
};
const malpractices = async (req, res) => {
    const newId = uid();
    // const __dirname = path.resolve();
    // var optionalObj = { 'fileName': newId, 'type': 'jpeg' };
    // base64ToImage(req.body.image, path.join(__dirname, "controllers"), optionalObj)
    const metadata = { contentType: "image/jpeg; charset=utf-8" };
    const folder =
        req.user.userId +
        req.body.exam +
        "/" +
        req.body.type +
        "/" +
        newId +
        ".jpeg";
    const storageRef_1 = ref(storageRef, folder);
    upload();
    // fs.readFile(path.join(__dirname) + "/controllers" + newId + ".jpeg", function (err, buffer) {
    //     upload(buffer)
    // })
    // fs.unlink(path.join(__dirname) + "/controllers" + newId + ".jpeg", (err) => {
    //     if (err) throw err;
    //     console.log('done');
    // });
    res.status(200).json("file is uploaded successfully");
    res.end();
    async function upload() {
        // await uploadBytes(storageRef_1, buffer, metadata).then((snapshot) => {
        //     console.log('file is uploaded Successfully!');
        // });
        uploadString(storageRef_1, req.body.image, "data_url", metadata).then(
            (snapshot) => {
                console.log("Uploaded a base64 string!", snapshot);
            }
        );
    }
    async function updating_into_firestore(url) {
        await firebase_firestore
            .collection("exams")
            .doc(req.body.exam)
            .collection("candidates")
            .doc(req.user.userId)
            .collection(req.body.type)
            .add({ imageUrl: url, time: req.body.time });
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
    setTimeout(download_link, 300);
};
export { upload_face, malpractices };

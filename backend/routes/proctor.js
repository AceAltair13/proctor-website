import { Router } from "express"
import * as auth from "../helpers/auth.js"

import multer from "multer"
import {
    upload_face,malpractices,getmalpractice
} from "../controllers/proctor.js"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './controllers')

    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
// const storage = multer.memoryStorage()
const router = Router()

router.post("/upload-face", auth.Token, upload.single('image'),upload_face)
router.post("/malpractices", auth.Token, upload.single('image'),malpractices)
router.get("/getmalpractice", auth.Token, getmalpractice)




export const routes = router;

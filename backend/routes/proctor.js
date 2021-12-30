import { Router } from "express"
import * as auth from "../helpers/auth.js"

import multer from "multer"
import {
    postMalpractice
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

router.post("/", auth.Token, upload.single('image'), postMalpractice)



export const routes = router;

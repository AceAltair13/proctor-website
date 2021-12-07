import { Router } from "express"
import * as auth from "../helpers/auth.js"
import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './controllers')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
const upload = multer({storage:storage})

import {
    postMalpractice
} from "../controllers/proctor.js"


const router = Router()

router.post("/", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor],upload.single('image'), postMalpractice)

export const routes = router;

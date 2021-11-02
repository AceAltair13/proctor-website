import {Router} from "express"
import * as auth from "../helpers/auth.js"
import {
    postMalpractice
}from "../controllers/proctor.js"


const router =  Router()

router.post("/",[auth.SessionId,auth.Token,auth.matchTokenAndSSession],postMalpractice)

export const routes = router;

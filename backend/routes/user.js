import { Router } from "express";
import { userExists } from "../controllers/helpers.js";
import { loginStudent, loginSupervisor, registerStudent, registerSupervisor } from "../controllers/user.js";
const router  = Router()



router.post("/register-student",userExists,registerStudent);
router.post("/register-supervisor",userExists,registerSupervisor);
// router.put("/update-supervisor",registerSupervisor)
// router.put("/update-student",registerStudent)
router.post("/login-student",userExists,loginStudent)
router.post("/login-supervisor",userExists,loginSupervisor)





export const routes = router;
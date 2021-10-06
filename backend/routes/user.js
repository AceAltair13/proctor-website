import { Router } from "express";
import { userExists } from "../controllers/helpers/users.js";
import { login, registerStudent, registerSupervisor } from "../controllers/user.js";
const router  = Router()



router.post("/register-student",userExists,registerStudent);
router.post("/register-supervisor",userExists,registerSupervisor);
// router.put("/update-supervisor",registerSupervisor)
// router.put("/update-student",registerStudent)
router.post("/login",userExists,login)
// router.post("/login-supervisor",userExists,loginSupervisor)





export const routes = router;
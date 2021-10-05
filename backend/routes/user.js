import { Router } from "express";
import { registerStudent, registerSupervisor } from "../controllers/user.js";
const router  = Router()



router.post("/register-student",registerStudent);
router.post("/register-supervisor",registerSupervisor);
// router.put("/update-supervisor",registerSupervisor)
// router.put("/update-student",registerStudent)
// router.post("/login-student",login)
// router.post("/login-supervisor",)





export const routes = router;
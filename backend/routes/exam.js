import { Router } from "express";
import { userExists } from "../helpers/users.js";
import { login, registerStudent, registerSupervisor } from "../controllers/user.js";
import { verifyExamAndSupervisor, verifyTokenAndSupervisor } from "../helpers/verifyToken.js";
import { assignQuestionPpaer, createExam, enrollStudent } from "../controllers/exam.js";
const router  = Router()

router.post("/create",verifyTokenAndSupervisor,createExam)
router.post("/question-paper",verifyExamAndSupervisor,assignQuestionPpaer)
router.post("/enroll-students",verifyExamAndSupervisor,enrollStudent)



export const routes = router;
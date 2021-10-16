import { Router } from "express";
import { userExists } from "../helpers/users.js";
import {
  login,
  registerStudent,
  registerSupervisor,
} from "../controllers/user.js";
import {
  verifyToken,
  verifyExamAndSupervisor,
  verifyQuestionPaperAndExam,
  verifyTokenAndStudent,
  verifyTokenAndSupervisor,
} from "../helpers/verifyToken.js";
import {
  assignQuestionPaper,
  createExam,
  enrollStudent,
  getQuestionPaper,
} from "../controllers/exam.js";
const router = Router();

router.post("/", verifyTokenAndSupervisor, createExam);
router.post("/question-paper", verifyExamAndSupervisor, assignQuestionPaper);
router.post("/enroll-students", verifyExamAndSupervisor, enrollStudent);
router.get("/question-paper/:examId",verifyToken,getQuestionPaper);

export const routes = router;

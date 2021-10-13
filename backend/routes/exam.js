import { Router } from "express";
import { userExists } from "../helpers/users.js";
import {
  login,
  registerStudent,
  registerSupervisor,
} from "../controllers/user.js";
import {
  verifyExamAndSupervisor,
  verifyQuestionPaperAndExam,
  verifyTokenAndSupervisor,
} from "../helpers/verifyToken.js";
import {
  assignQuestionPaper,
  createExam,
  enrollStudent,
  getQuestionPaper,
} from "../controllers/exam.js";
const router = Router();

router.post("/create", verifyTokenAndSupervisor, createExam);
router.post("/question-paper", verifyExamAndSupervisor, assignQuestionPaper);
router.post("/enroll-students", verifyExamAndSupervisor, enrollStudent);
router.get("/question-paper", verifyQuestionPaperAndExam, getQuestionPaper);

export const routes = router;

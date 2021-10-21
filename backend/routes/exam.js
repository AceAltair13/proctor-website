import { Router } from "express";
import { userExists } from "../helpers/users.js";


import * as auth from "../helpers/auth.js"
import {
  assignQuestionPaper,
  createExam,
  enrollStudent,
  getQuestionPaper,
} from "../controllers/exam.js";
const router = Router();

router.post("/", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor], createExam);
router.post("/question-paper", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor,auth.ExamAndSupervisor], assignQuestionPaper);
router.post("/enroll-students", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor,auth.ExamAndSupervisor], enrollStudent);
router.get("/question-paper",[auth.SessionId,auth.Token,auth.matchTokenAndSSession],getQuestionPaper);

export const routes = router;

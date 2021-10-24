import { Router } from "express";
import { userExists } from "../helpers/users.js";


import * as auth from "../helpers/auth.js"
import * as exam from "../helpers/exams.js"
import {
  assignQuestionPaper,
  createExam,
  enrollStudent,
  getQuestionPaper,
  updateQuestionPaper,
  updateExam,
  getExam,
  deleteExam
} from "../controllers/exam.js";

import * as verifyRequests from "../helpers/verifyRequests.js"
const router = Router();

router.post("/", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor], createExam);
router.put("/", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor,exam.examCreatedBySupervisor], updateExam);
router.get("/", [auth.SessionId,auth.Token,auth.matchTokenAndSSession], getExam);
router.delete("/", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.ExamAndSupervisor], deleteExam);
router.post("/enroll-students", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor,auth.ExamAndSupervisor,exam.examCreatedBySupervisor], enrollStudent);



router.post("/question-paper", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor,auth.ExamAndSupervisor], assignQuestionPaper);
router.put("/question-paper", [auth.SessionId,auth.Token,auth.matchTokenAndSSession,auth.Supervisor,auth.ExamAndSupervisor], updateQuestionPaper);

router.get("/question-paper",[auth.SessionId,auth.Token,auth.matchTokenAndSSession],getQuestionPaper);

export const routes = router;

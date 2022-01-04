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
  deleteExam,
  deleteQuestionPaper,
  removeStudents,

  getAllExams,
  receiveAnswers,

} from "../controllers/exam.js";
import * as verifyRequests from "../helpers/verifyRequests.js"
const router = Router();



// CRUD EXAM
router.post("/", [auth.Token,auth.Supervisor], createExam);
router.put("/", [auth.Token,auth.Supervisor,exam.examCreatedBySupervisor], updateExam);
// router.get("/:examId", [auth.Token], getExam);
router.get("/", [auth.Token], getAllExams);

router.delete("/", [auth.Token,auth.ExamAndSupervisor], deleteExam);
router.post("/students", [auth.Token,auth.Supervisor,auth.ExamAndSupervisor,exam.examCreatedBySupervisor], enrollStudent);
router.delete("/students", [auth.Token,auth.Supervisor,auth.ExamAndSupervisor,exam.examCreatedBySupervisor], removeStudents);



// CRUD QUESTION PAPER
router.post("/question-paper", [auth.Token,auth.Supervisor,auth.ExamAndSupervisor], assignQuestionPaper);
router.get("/question-paper",[auth.Token],getQuestionPaper);
router.put("/question-paper", [auth.Token,auth.Supervisor,auth.ExamAndSupervisor], updateQuestionPaper);
router.delete("/question-paper", [auth.Token,auth.Supervisor,auth.ExamAndSupervisor], deleteQuestionPaper);
router.post("/submit-answer", [auth.Token], receiveAnswers);


export const routes = router;

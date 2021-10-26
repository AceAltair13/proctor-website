import { Router } from "express";
import { userExists } from "../helpers/users.js";
import {
  login,
  registerStudent,
  registerSupervisor,
  logout
} from "../controllers/user.js";
const router = Router();

router.post("/register-student", userExists, registerStudent);
router.post("/register-supervisor", userExists, registerSupervisor);
router.post("/login", userExists, login);
router.post("/logout", logout);

// router.put("/update-supervisor",registerSupervisor)
// router.put("/update-student",registerStudent)
// router.post("/login-supervisor",userExists,loginSupervisor)

export const routes = router;

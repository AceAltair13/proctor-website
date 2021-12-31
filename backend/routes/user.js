import { Router } from "express";
import { userExists } from "../helpers/users.js";
import {
  login,
  registerStudent,
  registerSupervisor,
  logout,
  refreshToken,
  emailverify
} from "../controllers/user.js";
import * as auth from "../helpers/auth.js"
const router = Router();

router.post("/register-student", userExists, registerStudent);
router.post("/register-supervisor", userExists, registerSupervisor);
router.post("/login", userExists, login);
router.post("/logout",auth.Token, logout);
router.post("/refreshToken",auth.Token, refreshToken)
router.get("/emailverifivation",emailverify)

// router.put("/update-supervisor",registerSupervisor)
// router.put("/update-student",registerStudent)
// router.post("/login-supervisor",userExists,loginSupervisor)

export const routes = router;

const express = require("express")
const {registerStudent, registerSupervisor} = require("../controllers/user");
const router  = express.Router()
const fb = require("../db")


router.post("/register-student",registerStudent);
router.post("/register-supervisor",registerSupervisor);
// router.put("/update-supervisor",registerSupervisor)
// router.put("/update-student",registerStudent)
// router.post("/login-student",login)
// router.post("/login-supervisor",)





module.exports = {
    routes:router
}
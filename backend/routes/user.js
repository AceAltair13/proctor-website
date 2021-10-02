const express = require("express")
const {registerStudent} = require("../controllers/user");
const router  = express.Router()
const fb = require("../db")


router.post("/student",registerStudent);
module.exports = {
    routes:router
}
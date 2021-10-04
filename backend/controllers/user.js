const {firebase_storage,firebase_firestore} = require("../db")
const config = require("../config");



const registerStudent = async(req,res)=>{
    try {
        console.log(typeof req.body);
        req.body.isStudent = true
        const data = req.body;
        result =  await firebase_firestore.collection('users').add(data) 
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json(error)
    }}

const registerSupervisor = async(req,res)=>{
    try {
        req.body.isSupervisor = true
        const data = req.body;

        result =  await firebase_firestore.collection('users').add(data) 
        return res.status(200).json(result)
        
    } catch (error) {
        return res.status(400).json("Can't create a Supervisor")

        
    }
}
module.exports = {
    registerStudent,registerSupervisor
}


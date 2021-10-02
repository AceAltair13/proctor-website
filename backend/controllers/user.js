const {firebase_storage,firebase_firestore} = require("../db")
const config = require("../config");




const registerStudent = async(req,res)=>{
    try {
        const data = req.body;
       

        result =  await firebase_firestore.collection('students').add(data)
       
        
        return res.status(200).json(result)

        
    } catch (error) {
        return res.status(400).json(error)
    }}

module.exports = {
    registerStudent
}


import { firebase_storage, firebase_firestore } from "../db.js";
import * as config  from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import { userExists } from "./helpers.js";





const registerStudent = async(req,res)=>{
    try {
        userExists()  
        

        // console.log(newUser);
        newUser = req.body
        
        result =  await firebase_firestore.collection('users').add(newUser) 
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
export  {
    registerStudent,registerSupervisor
}


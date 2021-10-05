import {firebase_firestore} from "../db.js";

const userExists = async(req,res,next)=>{
    findUser = await firebase_firestore.collection("users").get()
    console.log(findUser);
}

export  {userExists}
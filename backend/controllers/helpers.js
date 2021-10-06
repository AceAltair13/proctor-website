import {firebase_firestore} from "../db.js";

const userExists = async(req,res,next)=>{
    var userExists = false
    await firebase_firestore.collection("users").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
           if(doc.data()["emailId"] === req.body.emailId){
               userExists = doc.data()
               
           }else{
               userExists = false
           }
        })
    });
    req.body.userExists = userExists;
    // if(user===true){
    //     return res.status(400).json("User already exists with the given email ID")

    // }

    next();

}





export  {userExists}
import {
    firebase_firestore
} from "../db.js";

const userExists = async (req, res, next) => {
    try {

        const snapshot = await firebase_firestore.collection("users").where("emailId", "==", req.body.emailId).get();
        var userExists = false
        if (snapshot.empty) {
            userExists = false

        } else {
            snapshot.forEach((doc) => {

                userExists = doc.data()

            })
        }
        req.body.userExists = userExists

        next()



    } catch (error) {
        res.status(400).json(error)
    }



}

const userExistsFunction = async (emailId) => {
    try {
        const snapshot = await firebase_firestore.collection("users").where("emailId", "==", emailId).get();
        if (snapshot.empty) {
            // req.body.userExists = false

            return false

        } else {
            snapshot.forEach((doc) => {

                //    req.body.userExists = doc.data()
                return doc.data()



            })
        }

    } catch (error) {
        console.log(error)
        // res.status(500).json("something went wrong"+error)
    }
}





export {
    userExists,
    userExistsFunction
}
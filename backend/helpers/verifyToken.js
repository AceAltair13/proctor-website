import jwt from "jsonwebtoken"
import * as config from "../config.js";
import {
    firebase_firestore
} from "../db.js";
import CryptoJs from "crypto-js";


export const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token
    if (authHeader) {
        // decrypt the token
        const authHeaderDecrypt = CryptoJs.AES.decrypt(authHeader, config.token_encrypt_key);
        const authHeaderDecryptString = authHeaderDecrypt.toString(CryptoJs.enc.Utf8);
        jwt.verify(authHeaderDecryptString, config.jwt_passKey, (err, user) => {
            if (err) {
                return res.status(403).json("invalid token")
            }
            if(req.session.userId === user.userId){
                req.user = user;
                console.log(req.user)
                next()

            }else{
                return res.status(403).json("Invalid Session")
            }
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userId === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

export const verifyTokenAndSupervisor = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log(req.user)
        if (req.user.isSupervisor || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

export const verifyTokenAndStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isStudent || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};


export const verifyExamAndSupervisor = async (req, res, next) => {
    verifyTokenAndSupervisor(req, res, async () => {
        const examsCreatedList = (await firebase_firestore.collection("users").doc(req.user.userId).get()).data()["examsCreated"]
        req.examIdmatch = false

        for (var i = 0; i < examsCreatedList.length; i++) {
            console.log(examsCreatedList[i])
            if (examsCreatedList[i] === req.body.examId) {
                req.examIdmatch = true
                break;
            }
        }
        if (req.examIdmatch) {
            next()
        } else {

            res.status(400).json("Exam doesn't exists")
        }
    });

}

export const verifyQuestionPaperAndExam = async (req, res, next) => {
    verifyTokenAndStudent(req, res, async () => {



    })

}

export const verifyStudentAndExam = async (req, res, next) => {
    verifyStudentAndExam

}
export const authenticateExamChanges = (req, res, next) => {

}



// module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}
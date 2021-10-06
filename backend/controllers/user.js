import { firebase_storage, firebase_firestore } from "../db.js";
import * as config from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import { userExists } from "./helpers/users.js";
import jwt from "jsonwebtoken"





const registerStudent = async (req, res) => {
    try {
        if (req.body.userExists !== false) {
            return res.status(400).json("EmailId already used")
        }
     
        const hashedPassword = CryptoJs.AES.encrypt(req.body.password, config.passKey).toString();
     
        const data = { ...req.body, password: hashedPassword, isSupervisor: false ,isStudent:true, isAdmin:false }
        const result = await firebase_firestore.collection('users').add(data)
        await firebase_firestore.collection("users").doc(result.id).update({ user_id: result.id });
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json("Failed to create the Student")
    }
}

const registerSupervisor = async (req, res) => {
    try {
        if (req.body.userExists !== false) {
            return res.status(200).json("EmailId already used")
        }
        console.log("here");
        var hashedPassword = CryptoJs.AES.encrypt(req.body.password, config.passKey).toString();
        var data;
        data = { ...req.body, password: hashedPassword, isSupervisor: true ,isStudent:false, isAdmin:false}
        var result = await firebase_firestore.collection('users').add(data)
        await firebase_firestore.collection("users").doc(result.id).update({ user_id: result.id });
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json("Failed to create the Student")
    }
}

const login = async (req, res) => {
    try {
        if (req.body.userExists === false) {
            return res.status(200).json("User does not exists")
        }

        const user = req.body.userExists

        const hasedPassword = CryptoJs.AES.decrypt(user.password, config.passKey)
        const OriginalPassword = hasedPassword.toString(CryptoJs.enc.Utf8)
        if (OriginalPassword !== req.body.password) {
            return res.status(401).json("Wrong Password")
        }

        const accessToken = jwt.sign({
            id: user.user_id, isStudent: user.isStudent ?? false,isSupervisor:user.isSupervisor??false,isAdmin:user.isAdmin??false
        }, config.jwt_passKey, { expiresIn: "3d" })

        const { password, ...others } = user
        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
}

// const loginSupervisor = async (req, res) => {
//     try {
//         if (req.body.userExists === false) {
//             return res.status(200).json("User does not exists")
//         }

//         const user = req.body.userExists

//         const hasedPassword = CryptoJs.AES.decrypt(user.password, config.passKey)
//         const OriginalPassword = hasedPassword.toString(CryptoJs.enc.Utf8)
//         if (OriginalPassword !== req.body.password) {
//             return res.status(401).json("Wrong Password")
//         }

//         const accessToken = jwt.sign({
//             id: user.user_id, isStudent: user.isSupervisor ?? false
//         }, config.jwt_passKey, { expiresIn: "3d" })

//         const { password, ...others } = user
//         res.status(200).json({ ...others, accessToken })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }
export {
    registerStudent, registerSupervisor, login
}


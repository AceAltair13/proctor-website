import {
    firebase_storage,
    firebase_firestore
} from "../db.js";
import * as config from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Supervisor from "../models/Supervisor.js";

import {
    userExists
} from "../helpers/users.js";
import jwt from "jsonwebtoken";
import {
    uid
} from "../helpers/other.js";

const registerStudent = async (req, res) => {
    try {
        if (req.body.userExists !== false) {
            return res.status(400).json("EmailId already used");
        }

        let student = new Student(
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.emailId,
            req.body.userName,
            req.body.password
        );
        const hashedPassword = CryptoJs.AES.encrypt(
            req.body.password,
            config.passKey
        ).toString();
        // const data = { ...req.body, password: hashedPassword, isSupervisor: false ,isStudent:true, isAdmin:false }
        student.password = hashedPassword;
        const studentJson = JSON.parse(JSON.stringify(student));

        const result = await firebase_firestore
            .collection("users")
            .add(studentJson);
        await firebase_firestore
            .collection("users")
            .doc(result.id)
            .update({
                userId: result.id
            });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json("Failed to create the Student" + error);
    }
};

const registerSupervisor = async (req, res) => {
    try {
        if (req.body.userExists !== false) {
            return res.status(400).json("EmailId already used");
        }

        let supervisor = new Supervisor(
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.emailId,
            req.body.userName,
            req.body.password
        );
        const hashedPassword = CryptoJs.AES.encrypt(
            req.body.password,
            config.passKey
        ).toString();
        // const data = { ...req.body, password: hashedPassword, isSupervisor: false ,isStudent:true, isAdmin:false }
        supervisor.password = hashedPassword;
        const supervisorJson = JSON.parse(JSON.stringify(supervisor));

        const newId = uid();
        supervisorJson.userId = newId;
        delete supervisorJson.examsCreated;
        // const result = await firebase_firestore.collection('users').add(supervisorJson)
        // await firebase_firestore.collection("users").doc(result.id).update({ user_id: result.id });
        const result = await firebase_firestore
            .collection("users")
            .doc(newId)
            .create(supervisorJson);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json("Failed to create the Supervisor" + error);
    }
};

const login = async (req, res) => {
    try {
        if (req.body.userExists === false) {
            return res.status(200).json("User does not exists");
        }

        const user = req.body.userExists;

        const hasedPassword = CryptoJs.AES.decrypt(user.password, config.passKey);
        const OriginalPassword = hasedPassword.toString(CryptoJs.enc.Utf8);
        if (OriginalPassword !== req.body.password) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign({
                userId: user.userId,
                isStudent: user.isStudent ?? false,
                isSupervisor: user.isSupervisor ?? false,
                isAdmin: user.isAdmin ?? false,
                emailId: user.emailId,
            },
            config.jwt_passKey, {
                expiresIn: "3d"
            }
        );

        // const accessToken = jwt.sign({
        //     user
        // }, config.jwt_passKey, { expiresIn: "3d" })

        const {
            password,
            ...others
        } = user;
        res.status(200).json({
            ...others,
            accessToken
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const logout = async (req, res) => {};

export {
    registerStudent,
    registerSupervisor,
    login
};
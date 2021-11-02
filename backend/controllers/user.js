import { firebase_storage, firebase_firestore } from "../db.js";
import * as config from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Supervisor from "../models/Supervisor.js";
import { userExists } from "../helpers/users.js";
import jwt from "jsonwebtoken";
import { uid } from "../helpers/other.js";
import session from "express-session";
import e from "express";


const registerStudent = async (req, res) => {
  try {
    if (req.body.userExists !== false) {
      return res.status(900).json("EmailId already used");
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

    const result = await firebase_firestore.collection("users").add(studentJson);
    await firebase_firestore.collection("users").doc(result.id).update({ userId: result.id, sessionId: "" });
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
    const result = await firebase_firestore.collection("users").doc(newId).create(supervisorJson);

    await firebase_firestore.collection("users").doc(newId).update({ sessionId: "" });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json("Failed to create the Supervisor" + error);
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body)

    if (req.body.userExists === false) {
      return res.status(400).json("User does not exists");
    }
    if (req.body.userExists.sessionId != "") {
      return res.status(400).json("Account is logged in already")

    }
    const user = req.body.userExists;
    const hasedPassword = CryptoJs.AES.decrypt(user.password, config.passKey);
    const OriginalPassword = hasedPassword.toString(CryptoJs.enc.Utf8);
    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        userId: user.userId,
        isStudent: user.isStudent ?? false,
        isSupervisor: user.isSupervisor ?? false,
        isAdmin: user.isAdmin ?? false,
        emailId: user.emailId,
      },
      config.jwt_passKey,
      {
        expiresIn: "1d",
      }
    );
    req.session.userId = user.userId;
    const sessionid = req.session.id;
    req.session.sessid = sessionid;
    req.session.save();
    console.log("logon sai",req.session.userId,req.session.sessid);
    await firebase_firestore.collection("users").doc(user.userId).update({ sessionId: sessionid });
    // await firebase_firestore.collection("users").doc(user.userId).update({sessionId:sessionId});

    // encrypt the token here
    // const accessTokenEncrypt = CryptoJs.AES.encrypt(
    //   accessToken,
    //   config.token_encrypt_key
    // ).toString();

    // const accessToken = jwt.sign({
    //     user
    // }, config.jwt_passKey, { expiresIn: "3d" })

    const { password, ...others } = user;
    res.locals = req.session.userId;
    res.status(200).json({
      ...others,
      //   accessTokenEncrypt,
      accessToken,

    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const logout = (req, res) => {
  console.log("logout sai",req);
  console.log(Object.keys(req.sessionStore.sessions).length);

  for(var i=0;i<Object.keys(req.sessionStore.sessions).length;i++)
  {
    var se = JSON.parse(Object.values(req.sessionStore.sessions)[i]);
    if(se.userId!==undefined && se.sessid!==undefined)
    {
      break;
    }
  }
  // console.log(Object.keys(req.sessionStore.sessions).length)
  // var se;
  // try {
  //   se = JSON.parse(Object.values(req.sessionStore.sessions)[0])

  // } catch (error) {
  //   return res.status(401).json("No user was logged in")

  // }
  console.log("logout sai",se.userId, se.sessid)
  if (se.userId && se.sessid) {
    firebase_firestore.collection("users").doc(se.userId).update({ sessionId: "" });
    req.session.destroy((err) => {
      return res.status(400).json(err);
    });
    return res.status(200).json("Logged out successfully");
  } else {
    return res.status(401).json("No user was logged in")
  }

};

export { registerStudent, registerSupervisor, login, logout };

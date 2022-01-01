import { firebase_firestore } from "../db.js";
import * as config from "../config.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Supervisor from "../models/Supervisor.js";
import { userExists } from "../helpers/users.js";
import jwt from "jsonwebtoken";
import { uid } from "../helpers/other.js";
import { sendMail } from "../helpers/email.js";
import { async } from "@firebase/util";
import * as auth from "../helpers/auth.js"


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
    await firebase_firestore.collection("users").doc(result.id).update({ userId: result.id });
    const accessToken = jwt.sign(
      {
        userId: result.id,
        isSupervisor: false,
        emailId: student.emailId,
        firstName: student.firstName,
        lastName: student.lastName
      },
      config.jwt_passKey,
      {
        expiresIn: 300,
      }
    );
    const body = `click here to verify email address
http://localhost:8080/api/user/emailverifivation?id=`+ accessToken
    await sendMail(student.emailId, "Email Verification", body)
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
    const accessToken = jwt.sign(
      {
        userId: newId,
        isSupervisor: true,
        emailId: supervisor.emailId,
        firstName: supervisor.firstName,
        lastName: supervisor.lastName
      },
      config.jwt_passKey,
      {
        expiresIn: 300,
      }
    );
    const body = `click here to verify email address
http://localhost:8080/api/user/emailverifivation?id=`+ accessToken
    await sendMail(supervisor.emailId, "Email Verification", body)

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

    // if (req.body.userExists.sessionId != "") {
    //   return res.status(400).json("Account is logged in already")

    // }

    // const sessionExists = await (await firebase_firestore.collection("users").doc(req.body.userExists.userId).get()).data()["sessionId"];
    // console.log(sessionExists)
    // if(sessionExists === true){
    //   return res.status(400).json("Account is logged in already")

    // }

    const user = req.body.userExists;
    const hashedPassword = CryptoJs.AES.decrypt(user.password, config.passKey);
    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
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
        firstName: user.firstName,
        lastName: user.lastName
      },
      config.jwt_passKey,
      {
        expiresIn: "1d",
      }
    );


    // req.session.userId = user.userId;
    // const sessionid = req.session.id;
    // req.session.sessid = sessionid;
    // session_id = sessionid;
    // sess(req.session.userId, sessionid)
    // req.session.save()



    // await firebase_firestore.collection("users").doc(user.userId).update({ sessionId: true });



    // await firebase_firestore.collection("users").doc(user.userId).update({ sessionId: sessionid });
    // await firebase_firestore.collection("users").doc(user.userId).update({sessionId:sessionId});

    // encrypt the token here
    // const accessTokenEncrypt = CryptoJs.AES.encrypt(
    //   accessToken,
    //   config.token_encrypt_key
    // ).toString();

    // const accessToken = jwt.sign({
    //     user
    // }, config.jwt_passKey, { expiresIn: "3d" })

    const { password, isSupervisor, isStudent, isAdmin, ...others } = user;
    var userType;
    if (user.isSupervisor) {
      userType = "supervisor"
    } else if (user.isStudent) {
      userType = "student"
    } else if (user.isAdmin) {
      userType = "admin"
    }
    others.role = userType;
    // res.locals = req.session.userId;
    req.user = req.body.userExists
    return res.status(200).json({
      ...others,
      //   accessTokenEncrypt,
      accessToken,

    });
  } catch (err) {
    res.status(500).json(err);
  }
};


const emailverify = async (req, res) => {
  const id = req.query.id
  auth.emailToken(id,req,res)
  await firebase_firestore.collection("users").doc(req.user.userId).update({ "emailVerified": true }).then(result => {
    res.write("Email have been verified Successfully")
    res.end()
  })
    .catch(error => {
      res.write("Ivalid Link")
      console.log(error)
      res.status(500).json(error);
      res.end()
    })
}

const logout = async (req, res) => {
  console.log(req)
  // console.log(req.sessid)
  console.log(req.headers.token)

  // const session_data= await firebase_firestore.collection("session").doc(session_id).get()
  // console.log("session data",JSON.parse(session_data.data().data).sessid)
  // if (JSON.parse(session_data.data().data).sessid)
  // {
  //   await firebase_firestore.collection("users").doc(JSON.parse(session_data.data().data).userId).update({ sessionId: "" });
  //   await firebase_firestore.collection("session").doc(JSON.parse(session_data.data().data).sessid).delete()
  //   return res.status(200).json("Logged out successfully");
  // }
  if (req.headers.token) {
    // console.log("userId while logging out ",req.user)
    // await firebase_firestore.collection("users").doc(req.user.userId).update({ sessionId: false });
    // await firebase_firestore.collection("session").doc(JSON.parse(session_data.data().data).sessid).delete()

    return res.status(200).json("Logged out successfully");

  }
  else {
    return res.status(401).json("No user was logged in")
  }

};


const refreshToken = async (req, res) => {

}

export { registerStudent, registerSupervisor, login, logout, refreshToken, emailverify };

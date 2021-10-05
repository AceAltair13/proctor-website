// const firebase = require("firebase")
// import { initializeApp } from "firebase/app"
// const firebase = require("firebase/app")
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const serviceAccount = require("./firebase_key.json")
import  admin  from "firebase-admin"
// const { initializeApp, credential } = pkg;
import * as config from "./config.js";
// const app = firebase.initializeApp(config.firebaseConfig)
const app = admin.initializeApp({credential:admin.credential.cert(serviceAccount)})
const firebase_firestore = app.firestore()
const firebase_storage = app.storage()


export  {firebase_firestore,firebase_storage};    
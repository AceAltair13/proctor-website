// const firebase = require("firebase")
// import { initializeApp } from "firebase/app"
// const firebase = require("firebase/app")

const firebase = require('firebase-admin')
const config = require("./config")
const serviceAccount = require("./firebase_key.json");
// const app = firebase.initializeApp(config.firebaseConfig)
const app = firebase.initializeApp({credential:firebase.credential.cert(serviceAccount)})
const firebase_firestore = app.firestore()
const firebase_storage = app.storage()
 

module.exports = {firebase_firestore,firebase_storage};    
'use strict'
import express, {
    json
} from 'express'
import cors from 'cors'
import {
    port,
    url,
    session_key
} from './config.js'
import {
    routes as userRoutes
} from "./routes/user.js"
import {
    routes as examRoutes
} from "./routes/exam.js"
// import bodyParser from 'body-parser'

import session from 'express-session'

import {
    FirestoreStore
} from "@google-cloud/connect-firestore"
import {
    Firestore
} from "@google-cloud/firestore"
import {
    firebase_firestore
} from './db.js'

import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import {routes as proctorRoutes} from "./routes/proctor.js"










const app = express()
app.use(express.json())
// app.use(json())
app.use(cors())
// app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//session use 
// app.use(session({
//     store: new FirestoreStore({
//         dataset: firebase_firestore,
//         // dataset:new Firestore(),
//         kind: 'express-sessions'
//     }),
//     name: "sessid",
//     resave: false,
//     secret: session_key,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 2,
//         sameSite: true,
//         secure: false
//     }
// }))
app.use(session({secret: session_key,resave:true,saveUninitialized: true,httponly:false,cookie: {}}))
app.use("/api/user", userRoutes)
app.use("/api/exam", examRoutes)
app.use("/api/proctor", proctorRoutes)



app.listen(port, () => {
    console.log(`Server is running on ${url}`);
})
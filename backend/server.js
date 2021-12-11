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
import { routes as proctorRoutes } from "./routes/proctor.js"
// import { routes as proctorRoutes } from "./routes/proctor.js"
import { sendMail } from './helpers/email.js'



var store = new FirestoreStore({
    dataset: firebase_firestore,
    // dataset:new Firestore(),
    kind: 'session'
})

const app = express()
app.use(express.json())
// app.use(json())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,DELETE,PUT",
    credentials:true,
    exposedHeaders:["set-cookie"]
}
))
// app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//session use 
app.use(session({
    store: store,
    name: "session",
    resave: false,
    secret: session_key,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: true,
        HttpOnly: true
    }
}))

// app.use(session({secret: session_key,resave:true,saveUninitialized: true,httponly:false,cookie: {}}))
app.use("/api/user", userRoutes)
app.use("/api/exam", examRoutes)
app.use("/api/proctor", proctorRoutes)



app.listen(port, () => {
    console.log(`Server is running on ${url}`);
})
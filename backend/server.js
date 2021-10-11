'use strict'
import express, { json } from 'express'
import cors from 'cors'

import { port, url } from './config.js'

import { routes as userRoutes} from "./routes/user.js"
import { routes as examRoutes } from "./routes/exam.js"
// import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
// app.use(json())
app.use(cors())
// app.use(bodyParser.json())

app.use("/api/user",userRoutes)
app.use("/api/exam",examRoutes)


app.listen(port,()=>{
    console.log(`Server is running on ${url}`);
})

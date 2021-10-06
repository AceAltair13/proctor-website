'use strict'
import express, { json } from 'express'
import cors from 'cors'

import { port, url } from './config.js'

import { routes as userRoutes} from "./routes/user.js"
import bodyParser from 'body-parser'

const app = express()
app.use(json())
app.use(cors())
app.use(bodyParser.json())

app.use("/api/user",userRoutes)

app.listen(port,()=>{
    console.log(`Server is running on ${url}`);
})

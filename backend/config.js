'use strict'
import {
    config
} from "dotenv"
import assert from "assert"

config()

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
    PASS_SECRET_KEY,
    JWT_SECRET_KEY,
    SESSION_KEY,
    TOKEN_ENCRYPT_KEY,
} = process.env


assert(PORT, "Port is required")
assert(HOST, "Host is required")

export const port = PORT
export const host = HOST
export const url = HOST_URL
export const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
}
export const passKey = PASS_SECRET_KEY
export const jwt_passKey = JWT_SECRET_KEY
export const session_key = SESSION_KEY
export const token_encrypt_key = TOKEN_ENCRYPT_KEY
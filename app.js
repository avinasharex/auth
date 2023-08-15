const express = require("express")
const authRouter = require("./router/authRouter.js")
const databaseConnection = require("./config/databaseConfig.js")
const cookie = require("cookie-parser")
const cors = require("cors")
const app = express()

databaseConnection()

app.use(express.json())
app.use(cookie())
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))

app.use("/", authRouter)

module.exports = app
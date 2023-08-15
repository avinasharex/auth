const express = require("express")
const { signup, sigin, getUser, logout } = require("../controllers/authControllers.js")
const { jwtAuth } = require("../middleware/jwtAuth.js")

const authRouter = express.Router()

authRouter.post("/api/auth/signup", signup)
authRouter.get("/api/auth/sigin", sigin)
authRouter.get("/api/auth/getuser", jwtAuth, getUser)
authRouter.get("/api/auth/logout", jwtAuth, logout)

module.exports = authRouter
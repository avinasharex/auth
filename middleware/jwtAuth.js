const JWT = require("jsonwebtoken")

exports.jwtAuth = (req, res, next) => {
    const token = req.cookies && req.cookies.token

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Not authorize"
        })
    }
    try {
        const payload = JWT.verify(token, process.env.SECRET)
        req.user = ({ id: payload.id, email: payload.email })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
    next()
}
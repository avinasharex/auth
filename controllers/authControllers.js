const User = require("../model/userSchema")
const bcrypt = require("bcrypt")

exports.signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field is manadatory"
        })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password doesn't match"
        })
    }

    try {
        const user = User(req.body)
        const createdUser = await user.save()
        res.status(201).json({
            success: true,
            message: "User save successfully",
            user
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email"
            })
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.sigin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        })

    }
    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
            success: false,
            message: "Invalid credential"
        })
    }

    try {
        const token = user.JWT()
        user.password = undefined

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 24,
            httpOnly: true
        }

        res.cookie("token", token, cookieOption)
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.getUser = async (req, res) => {
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.logout = (req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOption)
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}
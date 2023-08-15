const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50 character"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: false

        },
        password: {
            type: String,
            select: false
        },
        confirmPassword: {
            type: String,
            select: false
        },
        forgetPasswordToken: {
            type: String
        },
        passwordExpires: {
            type: Date
        }
    }, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next()

})

userSchema.methods = {
    JWT() {
        return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, { expiresIn: "24h" })
    }
}

module.exports = mongoose.model("User", userSchema)
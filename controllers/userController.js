const userModal = require("../models/userModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({
                message: "All fields are required",
                success: false,
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModal(userData)
        const user = await newUser.save()

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.json({
            success: true,
            message: "User registered successfully",
            user: user.name,
            token,
        })
    } catch (error) {
        res.json({
            success: false,
            message: "User registration failed",
            error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                message: "All fields are required",
                success: false,
            })
        }
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET)
            return res.json({
                success: true,
                message: "User logged in successfully!",
                user: user.name,
                token: token
            })
        } else {
            return res.json({
                success: false,
                message: "Invalid Credential",
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: "User login failed",
            error
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}

const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")

const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1day' })
    return token
}

const signupController = async (req, res) => {
    try {
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }
        
        const { name, email, password } = req.body

        const isExist = await userModel.findOne({ email })
        if (isExist) {
            return res.status(400).json({
                success: false,
                msg: "Email already exist!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const userData = new userModel({
            name,
            email,
            password: hashPassword
        })
        const user = await userData.save()

        return res.status(200).json({
            success: true,
            msg: "Registered successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const loginController = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { email, password } = req.body
        const userData = await userModel.findOne({ email })

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: "Email doesn't exists!"
            })
        }
        const isPassword = await bcrypt.compare(password, userData.password)
        if (!isPassword) {
            return res.status(400).json({
                success: false,
                msg: "Email and Password is incorrect"
            })
        }

        const token = await generateAccessToken({ user: userData._id })
        return res.status(200).json({
            success: true,
            msg: "Login successfully!",
            token,
            tokenType: 'Bearer'
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    signupController,
    loginController
}
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const userModel = require("../models/userModel");
const teamModel = require("../models/teamModel");

const generateAccessToken = require("../utils/generateToken")

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

        const token = await generateAccessToken({ _id: userData._id },'1d')
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

const userProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        let userData = await userModel.findById(_id)
        if (!userData) {
            return res.status(400).json({
                success: 'false',
                msg: 'user not exits',
            })
        }
        
        if (!userData.teams.length) {
            return res.status(200).json({
                success: true,
                msg: 'User Profile Data!',
                user: userData
            })
        }

        userData = await userModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(_id)
                }
            },
            {
                $unwind: '$teams' // Unwind the teams array
            },
            {
                $lookup: {
                    from: 'teams', // Name of the teammodel collection
                    localField: 'teams',
                    foreignField: '_id',
                    as: 'teamData'
                }
            },
            {
                $unwind: '$teamData' // Unwind the teamData array
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    email: { $first: '$email' },
                    teams: {
                        $push: {
                            _id: "$teamData._id",
                            name: "$teamData.name",
                            users: "$teamData.users"
                        }
                    } // Push teamData into teams array
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ])

        return res.status(200).json({
            success: true,
            msg: 'User Profile Data!',
            user: userData[0]
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


module.exports = {
    signupController,
    loginController,
    userProfile
}
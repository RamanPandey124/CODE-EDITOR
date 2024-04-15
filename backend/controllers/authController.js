const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const userModel = require("../models/userModel");
const teamModel = require("../models/teamModel");

const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
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

        const token = await generateAccessToken({ _id: userData._id })
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
        const userData = await userModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(_id)
                }
            }, {
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
                    username: { $first: '$name' },
                    email: { $first: '$email' },
                    teams: {
                        $push: {
                            _id: "$teamData._id",
                            name: "$teamData.name",
                            users: "$teamData.users"
                        }
                    } // Push teamData into teams array
                }
            }, {
                $project: {
                    password: 0
                }
            }
        ])

        return res.status(200).json({
            success: true,
            msg: 'User Profile Data!',
            user: userData
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const createTeam = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }
        const { name, password } = req.body
        const userId = req.user._id
        // console.log(name, password, userId)

        const hashPassword = await bcrypt.hash(password, 10)
        const teamData = new teamModel({
            name,
            password: hashPassword,
            users: [userId]
        })
        const team = await teamData.save()

        await userModel.findByIdAndUpdate(
            userId,
            { $push: { teams: team._id } },
            { new: true }
        )

        const teamToken = await generateAccessToken({ teamId: team._id })

        return res.status(200).json({
            success: true,
            msg: "Registered successfully",
            teamToken
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const joinTeam = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { _id, password } = req.body
        const userId = req.user._id

        let team = await teamModel.findById(_id)
        const isPassword = await bcrypt.compare(password, team.password)
        if (!isPassword) {
            return res.status(400).json({
                success: false,
                msg: "Id and Password is incorrect"
            })
        }

        const teamToken = await generateAccessToken({ teamId: team._id })

        if (team.users.includes(userId)) {
            return res.status(200).json({
                success: true,
                msg: "Already Joined",
                teamToken
            })
        }

        await teamModel.findByIdAndUpdate(
            _id,
            { $push: { users: userId } },
            { new: true }
        )
        await userModel.findByIdAndUpdate(
            userId,
            { $push: { teams: team._id } },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            msg: "Joined successfully",
            teamToken
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getTeam = async (req, res) => {
    try {
        const { teamToken } = req.query
        const { teamId } = jwt.verify(teamToken, process.env.ACCESS_TOKEN_SECRET)

        const team = await teamModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(teamId)
                }
            }, {
                $unwind: "$users"
            }, {
                $lookup: {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "userData"
                }
            }, {
                $unwind: "$userData"
            }, {
                $group: {
                    _id: "$_id",
                    TeamName: { $first: "$name" },
                    users: {
                        $push: {
                            _id: "$userData._id",
                            name: "$userData.name"
                        }
                    }
                }
            }
        ])
        return res.status(200).json({
            success: true,
            msg: "Team data!",
            team
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
    userProfile,
    createTeam,
    joinTeam,
    getTeam
}
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const userModel = require("../models/userModel");
const teamModel = require("../models/teamModel");
const taskContainerModel = require('./../models/taskContainerModel')
const generateAccessToken = require("../utils/generateToken")
const jwt = require("jsonwebtoken");
const generateContainer = require("../utils/generateContainer");


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

        const teamToken = await generateAccessToken({ teamId: team._id }, '1yr')

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
        const { name, password } = req.body
        const userId = req.user._id

        let team = await teamModel.find({ name })
        if (!team.length) {
            return res.status(400).json({
                success: false,
                msg: "Team not exists!"
            })
        }
        team = team[0]


        const isPassword = await bcrypt.compare(password, team.password)
        if (!isPassword) {
            return res.status(400).json({
                success: false,
                msg: "Id and Password is incorrect"
            })
        }

        const teamToken = await generateAccessToken({ teamId: team._id }, '1yr')
        if (team.users.includes(userId)) {
            return res.status(200).json({
                success: true,
                msg: "Already Joined",
                teamToken
            })
        }

        await teamModel.findByIdAndUpdate(
            team._id,
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
        if (!teamToken) {
            return res.status(400).json({
                success: false,
                msg: 'teamToken is needed'
            })
        }

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
                    },
                    code: { $first: "$code" }
                }
            }
        ])
        const user = await userModel.findById(req.user._id)
        return res.status(200).json({
            success: true,
            msg: "Team data!",
            team: team[0],
            user: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

}


const getTaskContainer = async (req, res) => {
    let { teamId, userIds } = req.body

    for (user of userIds) {
        const cont = await taskContainerModel.find({ teamId, userId: user._id })
        if (!cont.length) {
            const taskContainer = await new taskContainerModel({
                teamId,
                userId: user._id
            }).save()
            await teamModel.findByIdAndUpdate(
                teamId,
                { $push: { containers: taskContainer._id } },
                { new: true }
            )
        }
    }

    return res.json({
        success: true,
        msg: 'task Containers',
        containers: await generateContainer(teamId)
    })
}

module.exports = {
    createTeam,
    joinTeam,
    getTeam,
    getTaskContainer
}
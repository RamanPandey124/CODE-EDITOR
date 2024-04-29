const mongoose = require('mongoose');
const teamModel = require('../models/teamModel');
const { ObjectId } = mongoose.Types;

const generateContainer = async teamId => {
    const container = await teamModel.aggregate([
        {
            $match: {
                _id: new ObjectId(teamId),
            },
        },
        {
            $project: {
                containers: 1,
            },
        },
        {
            $lookup: {
                from: "taskcontainers",
                localField: "containers",
                foreignField: "_id",
                as: "containers",
            },
        },
        {
            $unwind: {
                path: "$containers",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "containers.userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: {
                path: "$user",
            },
        },
        {
            $addFields: {
                hasTasks: {
                    $gt: [
                        {
                            $size: "$containers.tasks",
                        },
                        0,
                    ],
                },
            },
        },
        {
            $project: {
                containers: 1,
                user: "$user.name",
                tasks: {
                    $cond: {
                        if: "$hasTasks",
                        then: "$containers.tasks",
                        else: [],
                    },
                },
            },
        },
        {
            $lookup: {
                from: "tasks",
                localField: "tasks",
                foreignField: "_id",
                as: "tasks",
            },
        },
        {
            $group: {
                _id: "$_id",
                containers: {
                    $push: {
                        _id: "$containers._id",
                        user: "$user",
                        tasks: "$tasks",
                    },
                },
            },
        },
        {
            $project: {
                _id: 0
            }
        }
    ]
    )

    return container[0].containers
}

module.exports = generateContainer
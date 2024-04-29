const { Server } = require('socket.io')
const teamModel = require("../models/teamModel")
const taskModel = require('./../models/taskModel')
const taskContainerModel = require('./../models/taskContainerModel')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;


const socket = (server) => {
    const io = new Server(server, {
        connectionStateRecovery: {},
        cors: {
            origin: 'http://localhost:5173'
        }
    })

    io.on('connection', (socket) => {
        console.log('user connected....')
        // console.log(socket.handshake.query.auth)

        socket.on('isTeamExist', async (name) => {
            const isName = await teamModel.find({ name })
            socket.emit('teamFound', isName.length)
        })

        socket.on('teamJoin', (teamId) => {
            socket.join(teamId)
        })

        socket.on('newTask', async ({ text, selfIndex, selfContId }, teamId) => {
            console.log('newTask')
            const newTask = await new taskModel({ text }).save()
            await taskContainerModel.findByIdAndUpdate(
                selfContId,
                { $push: { tasks: newTask._id } },
                { new: true }
            )

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

            io.to(teamId).emit('newTask', container[0].containers)
            // io.to(teamId).emit('newTask', { newTask, selfIndex })
        })


        socket.on('dropTask', async (obj, teamId) => {
            const { DragIndex, DropIndex, taskIndex, DragId, DropId, taskId } = obj

            await taskContainerModel.findByIdAndUpdate(DragId, { $pull: { tasks: taskId } })
            await taskContainerModel.findByIdAndUpdate(DropId, { $addToSet: { tasks: taskId } })

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

            io.to(teamId).emit('dropTask', container[0].containers)
            // io.to(teamId).emit('dropTask', { DragIndex, taskIndex, DropIndex })
        })




        socket.on('disconnect', () => {
            console.log('user disconnected...')
        })
    })
}
module.exports = socket
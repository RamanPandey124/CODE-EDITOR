const { Server } = require('socket.io')
const teamModel = require("../models/teamModel")
const taskModel = require('./../models/taskModel')
const taskContainerModel = require('./../models/taskContainerModel')
const generateContainer = require('./../utils/generateContainer')


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

        socket.on('newTask', async ({ title, selfContId }, teamId) => {
            const newTask = await new taskModel({ title }).save()
            await taskContainerModel.findByIdAndUpdate(
                selfContId,
                { $push: { tasks: newTask._id } },
                { new: true }
            )

            io.to(teamId).emit('newTask', await generateContainer(teamId))
        })


        socket.on('dropTask', async (obj, teamId) => {
            const { DropId, DragId, DropTaskId, DragTaskId, dropTaskIndex, dragTaskIndex } = obj

            await taskContainerModel.findByIdAndUpdate(DragId, { $pull: { tasks: DragTaskId } })
            await taskContainerModel.findByIdAndUpdate(DropId, { $push: { tasks: DragTaskId } })

            await taskModel.findByIdAndUpdate(DragTaskId, { $set: { index: dragTaskIndex } })

            if (dropTaskIndex !== 'undefined' && typeof dropTaskIndex == 'number') {
                await taskModel.findByIdAndUpdate(DropTaskId, { $set: { index: dropTaskIndex } })
            }

            io.to(teamId).emit('newTask', await generateContainer(teamId))
        })


        socket.on('deleteTask', async (obj, teamId) => {
            const { taskId, contId } = obj
            await taskModel.findByIdAndDelete(taskId)
            await taskContainerModel.findByIdAndUpdate(contId, { $pull: { tasks: taskId } })
            io.to(teamId).emit('newTask', await generateContainer(teamId))
        })




        socket.on('disconnect', () => {
            console.log('user disconnected...')
        })
    })
}
module.exports = socket
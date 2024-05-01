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

        socket.on('newTask', async ({ title, description, selfContId }, teamId) => {
            const newTask = await new taskModel({ title, description }).save()
            await taskContainerModel.findByIdAndUpdate(
                selfContId,
                { $push: { tasks: newTask._id } },
                { new: true }
            )

            io.to(teamId).emit('newTask', await generateContainer(teamId))
        })


        socket.on('dropTask', async (obj, teamId) => {
            const { DragId, DropId, taskId, taskIndex } = obj
            const index = taskIndex || 0
            await taskContainerModel.findByIdAndUpdate(DragId, { $pull: { tasks: taskId } })
            // await taskContainerModel.findByIdAndUpdate(DropId, { $push: { tasks: taskId } })
            const DropContainer = await taskContainerModel.findById(DropId)
            const tasks = DropContainer.tasks
            tasks.splice(index, 0, taskId)
            DropContainer.tasks = tasks
            await DropContainer.save()

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
const { Server } = require('socket.io')
const teamModel = require("../models/teamModel")

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
            console.log(name)
            const isName = await teamModel.find({ name })
            socket.emit('teamFound', isName.length)
        })

        socket.on('joinCode', (teamId) => {
            socket.join(teamId)
        })

        socket.on('newCode', async (code, teamId) => {
            await teamModel.findByIdAndUpdate(teamId, { $set: { code } })
            io.to(teamId).emit('newCode', code)
        })

        socket.on('disconnect', () => {
            // console.log('user disconnected...')
        })
    })
}

module.exports = socket
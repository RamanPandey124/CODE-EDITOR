const { Server } = require('socket.io')

module.exports = (server) => {
    const io = new Server(server, {
        connectionStateRecovery: {},
        cors: {
            origin: 'http://localhost:5173/'
        }
    })

    io.on('connection', (socket) => {
        console.log('user connected....')

        socket.on('disconnect', () => {
            console.log('user disconnected...')
        })
    })

}
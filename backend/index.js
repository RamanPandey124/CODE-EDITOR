require('dotenv').config()
const app = require("express")()
const { createServer } = require("http")
const server = createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const socket = require('./sockets/socket')

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mongodb connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connection to db...')
})

// routes
app.get("/", (req, res) => {
    res.send('jai shree ram')
})

app.use('/auth', require("./routes/authRoute"))
app.use('/team', require("./routes/teamRoute"))


// Socket.IO configuration
// const io = new Server(server, {
//     connectionStateRecovery: {},
//     cors: {
//         origin: 'http://localhost:5173'
//     }
// })

// io.on('connection', (socket) => {
//     console.log('user connected....')

//     socket.on('disconnect', () => {
//         console.log('user disconnected...')
//     })
// })
socket(server)

// Export the io instance
// module.exports = { server, io }

const port = process.env.PORT || 1100
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

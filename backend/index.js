// dotenv configuration
require('dotenv').config()

// server setup
const app = require("express")()
const { createServer } = require("http")
const server = createServer(app)

// middleWares
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mongodb connection
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connection to db...')
})

// routes
app.get("/", (req, res) => {
    res.send('jai shree ram')
})
app.use('/auth', require('./routes/authRoute'))
app.use('/team', require('./routes/teamRoute'))

const port = process.env.PORT || 1100
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
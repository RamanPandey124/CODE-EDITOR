const express = require('express')
const Route = express.Router()
const { createTeam, joinTeam, getTeam, getTaskContainer } = require('../controllers/teamController')
const { CreateTeamValidator, JoinTeamValidator } = require('../middlewares/validation')
const verifyToken = require('../middlewares/verifyToken')


Route.post('/create-team', verifyToken, CreateTeamValidator, createTeam)
Route.post('/join-team', verifyToken, JoinTeamValidator, joinTeam)
Route.get('/get-team', verifyToken, getTeam)

Route.post('/get-taskContainer', getTaskContainer)


module.exports = Route
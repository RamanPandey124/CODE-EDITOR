const express = require('express')
const Route = express.Router()
const { signupController, loginController, userProfile, createTeam, joinTeam, getTeam } = require('../controllers/authController')
const { signupValidator, loginValidator, CreateTeamValidator, JoinTeamValidator } = require('../middlewares/validation')
const verifyToken = require('../middlewares/verifyToken')

Route.post('/signup', signupValidator, signupController)
Route.post('/login', loginValidator, loginController)
Route.get('/profile', verifyToken, userProfile)

Route.post('/create-team', verifyToken, CreateTeamValidator, createTeam)
Route.post('/join-team', verifyToken, JoinTeamValidator, joinTeam)
Route.get('/get-team', verifyToken, getTeam)


module.exports = Route
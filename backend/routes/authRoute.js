const express = require('express')
const Route = express.Router()
const { signupController, loginController, userProfile, refreshToken } = require('../controllers/authController')
const { signupValidator, loginValidator } = require('../middlewares/validation')
const verifyToken = require('../middlewares/verifyToken')

Route.post('/signup', signupValidator, signupController)
Route.post('/login', loginValidator, loginController)
Route.get('/profile', verifyToken, userProfile)

Route.get('/refresh-token', verifyToken, refreshToken)


module.exports = Route
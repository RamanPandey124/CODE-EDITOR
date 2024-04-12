const express = require('express')
const Route = express.Router()
const { signupController, loginController } = require('../controllers/authController')
const { signupValidator, loginValidator } = require('../middlewares/validation')

Route.post('/signup',signupValidator,signupController)
Route.post('/login',loginValidator,loginController)

module.exports = Route
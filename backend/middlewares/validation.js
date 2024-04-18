const { check } = require('express-validator')

exports.signupValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password contains atleast 6 characters').isStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0
    })
]

exports.loginValidator = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password is required').not().isEmpty()
]

exports.CreateTeamValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password contains atleast 6 characters').isStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0
    })
]

exports.JoinTeamValidator = [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'Password contains atleast 6 characters').isStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0
    })
]
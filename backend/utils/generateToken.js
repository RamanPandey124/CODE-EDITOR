const jwt = require('jsonwebtoken')

const generateAccessToken = async (user, options) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, options)
    return token
}

module.exports = generateAccessToken
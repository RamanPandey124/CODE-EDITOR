const jwt = require('jsonwebtoken')

const generateAccessToken = async (user, expiresIn) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
    return token
}

module.exports = generateAccessToken
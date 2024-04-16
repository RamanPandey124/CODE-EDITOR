const jwt = require('jsonwebtoken')

const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
    return token
}

module.exports = generateAccessToken
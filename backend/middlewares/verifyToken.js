const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers["authorization"]
        console.log("token =>", token)

        if (!token) {
            return res.status(403).json({
                success: false,
                msg: 'A token is required for authenication'
            })
        }
        const Bearer = token.split(' ')
        const bearerToken = Bearer[1]

        const decodeData = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("decodeData=>", decodeData)

        req.user = decodeData
        return next()
    }
    catch (error) {
        console.log("Token_expiry_error=>", error)
        return res.status(403).json({
            success: false,
            msg: 'Invalid token',
            error
        })
    }
}

module.exports = verifyToken
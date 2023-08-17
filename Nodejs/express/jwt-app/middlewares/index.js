const jwt = require('jsonwebtoken')
const isTokenValid = (req, res, next) => {
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false
    if (token) {
        // verify token is still valid
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded) {
                // let controller go into next step
                next()
            } else {
                // invalid or expired token
                res.status(401).json({
                    message: 'Invalid/Expired Token'
                })
            }
        })
    } else {
        // check if token is defined
        res.status(401).json({
            message: 'Token not found'
        })
    }
}

module.exports = {
    isTokenValid
}
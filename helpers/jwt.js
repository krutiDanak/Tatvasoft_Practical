const jwt = require('jsonwebtoken')
const { secret } = require('../config')
let { User } = require('../models/user')

module.exports.isAuthenticated = async function isAuthenticated(req, res, next) {
    if (req.headers.authorization !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        token = req.headers.authorization.split(' ')[1]
    }
    else {
        return res.status(401).json({ status: 401, data: {}, message: "JWT Token is required." });
    }
    try {
        const token = req.headers.authorization
        const user = await jwt.verify(token, secret)
        userData = await User.findOne({ '_id': user.sub, 'userToken': token })
        if (!userData) return res.status(401).json({
            status: 401, data: {}, message: 'Invalid token, No user exists'
        });
        return next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ status: 401, data: {}, message: err });
    }
}
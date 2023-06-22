const jwt = require('jsonwebtoken')

// handles authentication using json web tokens
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn : "30d",
    })
}

module.exports = generateToken
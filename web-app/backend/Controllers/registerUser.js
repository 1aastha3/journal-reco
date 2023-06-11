const User = require("../model")
const generateToken = require("../generateToken")

const registerUser = async (req, res) => {
    console.log("registering the user");
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const userExists = await User.findOne({ email })
    if (userExists) 
    {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("User not found")
    }
}

module.exports = { registerUser }
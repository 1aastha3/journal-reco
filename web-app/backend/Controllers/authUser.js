const User = require("../model")
const generateToken = require("../generateToken")

const authUser = async (req, res) => {
    console.log("authenticating the user");
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const userPassword = await User.findOne({ password });
    
    if (user)
    {
        console.log("found the email")
        console.log(userPassword.password)
        if (userPassword.password == password)
        {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401)
            throw new Error("Invalid Email or Password!")
        }
    }
    else {
        res.status(401)
        throw new Error("Please SignUp!")
    }

}

module.exports = { authUser }
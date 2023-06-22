const User = require("../model")
const generateToken = require("../generateToken")
const {startEmailing} = require("../jobScheduler")

// controller function for registering the user
const registerUser = async (req, res) => {
   
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
        await startEmailing(user._id, user.signUp)
        //console.log(`Finished signup call for ${user.name}`);
    }
    else {
        res.status(400)
        throw new Error("User not found")
    }
}

// calling email scheduler when the user signs up
const startEmailingForAllUsers = async () => {
  const users = await User.find({});
    for (const user of users) {
      // console.log(`running helper fxn for ${user.name}`);
      await startEmailing(user._id, user.signUp);
  }
};

module.exports = { registerUser, startEmailingForAllUsers }
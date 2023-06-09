// here we will have two routes for user : login and signup. 
const express = require("express")
const router = express.Router()
const { registerUser } = require("../Controllers/registerUser")
const { authUser } = require("../Controllers/authUser")

router.use(express.json()) // express middleware to parse the incoming josn request to pyt on req.body

router.route('/').post(registerUser)
router.post('/login', authUser) 

module.exports =  router 
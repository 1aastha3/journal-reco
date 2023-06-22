// here we will have two routes for user : login and signup. 
const express = require("express")
const router = express.Router()
const { registerUser } = require("../Controllers/registerUser")
const { authUser } = require("../Controllers/authUser")
const { addInterest } = require("../Controllers/userInterest.js/addInterest")
const { getInterest } = require("../Controllers/userInterest.js/getInterest")
const { updateInterest } = require("../Controllers/userInterest.js/updateInterest")
const { logout } = require("../Controllers/userInterest.js/logout")
const { getRecommendations } = require("../Controllers/getRecommendations")
const { handleRatings } = require("../Controllers/handleRatings")

router.use(express.json()) // express middleware to parse the incoming josn request to pyt on req.body

// handles all the routes in the projects by calling respective controller functions

router.route('/').post(registerUser) // route for signUp page
router.post('/login', authUser)  // route for login page
router.post('/:userId/interest', addInterest) // route for adding user interests
router.get('/:userId/interest', getInterest) // route for fetching user interests
router.put('/:userId/interest', updateInterest) // route for configuring user interests
router.post('/logout', logout); // route for logging out
router.get('/recommendations/:userId', getRecommendations) // route to fetch recommendations
router.put('/:userId/recommendations/:articleId', handleRatings); // route to handle feedbacks (ratings)

module.exports =  router 
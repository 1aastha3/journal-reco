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

router.route('/').post(registerUser)
router.post('/login', authUser) 
router.post('/:userId/interest', addInterest)
router.get('/:userId/interest', getInterest)
router.put('/:userId/interest', updateInterest)
router.post('/logout', logout);
router.get('/recommendations/:userId', getRecommendations)
router.put('/:userId/recommendations/:articleId', handleRatings);

module.exports =  router 
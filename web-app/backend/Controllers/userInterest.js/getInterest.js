const User = require('../../model')

const getInterest = async (req, res) => {
    const uid = req.params.userId

    try {
        const user = await User.findByOne(uid)
        if (!user)
        {
            res.status(400)
            res.json("User does not exist")
            return
        }

        res.status(200)
        res.json("user.interest")

    } catch (error) {
        console.log('Could not get interests');
        res.status(400)
        res.json('Could not get Interests')
    }
}

module.exports = { getInterest }

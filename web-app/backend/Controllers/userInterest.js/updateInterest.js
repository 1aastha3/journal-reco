const User = require('../../model')

const updateInterest = async (req, res) => {
    const uid = req.params.userId
    const { interest } = req.body
    
    if (!interest || !Array.isArray(interest))
    {
        res.status(400)
        res.json("delete request failed, and there is nothing to delete")
    }

    try {
        const user = await User.findByOne(uid)
        if (!user)
        {
            res.status(400)
            res.json("User does not exist")
            return // prone to mistake
        }
        user.interests = interest
        await user.save()
        res.status(200).json(user.interests)

    } catch (error) {
        console.log('Failed to update')
        res.status(400)
        res.json('failed to update your interests')
    }
}

module.exports = { updateInterest }

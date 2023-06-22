const User = require('../../model');
const { getInterest } = require('./getInterest');
// controller function for configuring user interests

const updateInterest = async (req, res) => {
    // console.log('deleting');
    const uid = req.params.userId
    const  interest  = req.body
    
    if (!interest || !Array.isArray(interest.interests))
    {
        res.status(400)
        res.json("delete request failed, and there is nothing to delete")
        return
    }
    try {
        const user = await User.findOne({ _id: uid })
        
        if (!user)
        {
            res.status(400)
            res.json("User does not exist")
            return // prone to mistake
        }

        user.interests = user.interests.filter((existingInterest) => interest.interests.includes(existingInterest));
        await user.save()
  
        res.status(200).json(user.interests)

    } catch (error) {
        console.log('Failed to update')
        res.status(400)
        res.json('failed to update your interests')
    }
}

module.exports = { updateInterest }

const User = require('../model')

const getRecommendations = async (req, res) => {
    const userId = req.params.userId
    console.log(userId);

    try {
        const user = await User.findOne({ _id: userId })
        
        if (!user)
        {
            res.status(400).json({ message: 'User not found' });
            return
        }

        const recommendations = user.toBeRecommended
        console.log(recommendations);
        res.status(200).json(recommendations)

    } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        res.status(500).json({ message: 'Failed to fetch recommendations' });
    }
}

module.exports = { getRecommendations }

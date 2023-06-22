const User = require('../model');

// controller function to handle feedback on recommended articles
const handleRatings = async (req, res) => {
  const { userId, articleId } = req.params
  const { rating } = req.body

  try {
    const user = await User.findById(userId);
    const recommendedArticle = user.recommendedTillNow.find(
      (article) => article._id.toString() === articleId
    )

    if (recommendedArticle) {
        recommendedArticle.rating = rating
        await user.save();
      
        res.status(200).json("Successful")
    } else {
      res.status(404).json("Failed")
    }
  } catch (error) {
    console.error('Failed to store rating:', error)
    res.status(500).json({ success: false, message: 'Failed to store rating.' })
  }
};

module.exports = { handleRatings }

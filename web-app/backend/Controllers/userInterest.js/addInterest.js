const User = require("../../model")

const addInterest = async(req, res) => {
    const uid = req.params.userId
    const interest = req.body
 

    if (!interest)
    {
        res.status(400)
        res.json("Empty Interest, please provide one!")
        return
    }

    try {
        const user = await User.findOne({ _id: uid })
       
        if (!user)
        {
            res.status(400)
            res.json("User does not exist!")
            return
        }

        user.interests.push(interest.interests[interest.interests.length - 1]);
        await user.save() // this line killed me. you have to save it to the database. 
        
        res.status(200)
        res.json(user.interests)
        
    } catch (error) {
        console.log('Could not add!');
        res.status(400)
        res.json('Fialed to add Interest! Try again')
    }
}

module.exports = { addInterest }

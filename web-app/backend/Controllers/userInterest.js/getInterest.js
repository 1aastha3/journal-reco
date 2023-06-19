const User = require('../../model')

const { spawn } = require('child_process')


const getInterest = async (req, res) => {
    console.log('fetching');

    const uid = req.params.userId

    try {
        const user = await User.findOne({_id : uid})
        if (!user)
        {
            res.status(400)
            res.json("User does not exist")
            return
        }

        res.status(200)
        res.json(user.interests)

        // sending the array to python // added
        const keywords = user.interests

        const installDependencies = spawn("pip3", ["install", "requests", "pymongo", "bson"]);
        installDependencies.stdout.on("end", () => {
            const sendToPython = spawn('python3', [`${process.cwd()}/backend/Controllers/userInterest.js/api.py`, ...keywords, uid])
            sendToPython.stdout.on('data', (data) => {
                console.log('logging data now');
                console.log(data.toString());
                //TODO: check if database has been updated or not
            })
            sendToPython.stdout.on('end', () => {
                
                console.log("Request sent to recommender")
                //TODO: check if database has been updated or not
            })

        })
    } catch (error) {
        console.log('Could not get interests');
        res.status(400)
        res.json('Could not get Interests')
    }
}

module.exports = { getInterest }

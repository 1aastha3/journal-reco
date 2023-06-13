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
        const sendToPython = spawn('python', ['/Users/aasthaprajapati/Documents/Coding/Hackathon/journal-reco/api_testing', ...keywords])
        sendToPython.stdout.on('data', (data) => {
            console.log(`Python output: ${data}`);
        })
        sendToPython.stderr.on('data', (data) => {
            console.error(`python error: ${data}`)
        })

    } catch (error) {
        console.log('Could not get interests');
        res.status(400)
        res.json('Could not get Interests')
    }
}

module.exports = { getInterest }

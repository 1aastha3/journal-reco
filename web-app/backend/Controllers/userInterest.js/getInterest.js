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
<<<<<<< HEAD
        const sendToPython = spawn('python3', ['/Users/aasthaprajapati/Documents/Coding/Hackathon/journal-reco/api_testing/api_test.py', ...keywords, 5])
        sendToPython.stdout.on('data', (data) => {

            // const responseString = data.toString().replace(/^\(|\)$/g, "");
            // const response = JSON.parse(responseString)

            console.log(`Python Output ${data}`);
        })
        sendToPython.stderr.on('data', (data) => {
            console.error(`python error: ${data}`)
        })
=======
        const pipInstall = spawn('./bin/pip', ["install"], "requests");

        pipInstall.stdout.on("end", () =>
            {
                const sendToPython = spawn('./bin/python', ['/Users/aasthaprajapati/Documents/Coding/Hackathon/journal-reco/api_testing', ...keywords])

                sendToPython.stdout.on('end', (data) => {
                    //TODO: check the database if the field is updated or not
                })

                sendToPython.stderr.on('data', (data) => {
                    console.error(`python error: ${data}`)
                })
            }
        )
>>>>>>> d87f387 (Cleaned api_test file and created virtual env in controller for node to access python command and execute the api_test.py script)

    } catch (error) {
        console.log('Could not get interests');
        res.status(400)
        res.json('Could not get Interests')
    }
}

module.exports = { getInterest }

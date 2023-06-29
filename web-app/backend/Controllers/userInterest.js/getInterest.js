const User = require('../../model')
const { spawn } = require('child_process')
// controller function to fetch interests and send it to recommendation engine and SPRINGER API handler

const getInterest = async (req, res) => {

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

        // sending command-line arguments to python
        const keywords = user.interests
        keywords.forEach(key => {
            key = key.replace(" ", "_")
        })

        //const installDependencies = spawn("pip3", ["install", "requests", "pymongo", "scikit-learn", "nltk", "pandas"]); // installing the required dependencies for the python script to run
        
        //installDependencies.stdout.on("end", () => {

        let py = "python3"
        if (process.platform === "win32" || process.platform == "win64") py = "python";
                
        //executing python script by spawning the child process
        const sendToPython = spawn(py, [`${process.cwd()}/backend/Controllers/userInterest.js/api_test.py`, ...keywords, uid])
        sendToPython.stderr.on('data', (data)=>console.log(data.toString()))
        endToPython.stdout.on('data', (data) => {})
        sendToPython.stdout.on('end', () => { console.log("Request sent to recommender") })
        //})
    } catch (error) {
        console.log('Could not get interests');
        res.status(400)
        res.json('Could not get Interests')
    }
}

module.exports = { getInterest }

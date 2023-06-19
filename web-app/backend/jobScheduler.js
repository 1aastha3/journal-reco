const cron = require("node-cron")
const nodemailer = require("nodemailer")
const User = require('./model')

const jobSchedule = async (userId) => {

        console.log('started');
        try {
            const user = await User.findOne({ _id: userId })
        
            if (user.toBeRecommended.length === 0) {
                console.log('No recommendations to send')
                return
            }

            const reco = user.toBeRecommended[0];

            const transporter = nodemailer.createTransport({
                host: "smtp.mail.yahoo.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'asprajapati@yahoo.com',
                    pass: process.env.PASSWORD
                }
            })

            const mailContent = {
                from: 'asprajapati@yahoo.com',
                to: user.email,
                subject: 'Recommendation For You',
                text: `Check out this recommended article: ${reco.title}.`
            }

            await transporter.sendMail(mailContent)
            console.log('Email successfully sent');

            user.toBeRecommended.shift()
            user.recommendedTillNow.push(reco)

            await user.save()

        } catch (error) {
            console.error('Error sending email: ', error)
        }
    }


const startEmailing = (userId) => {

    jobSchedule(userId)

    setInterval(() => {
        jobSchedule(userId)
    }, 60000)

    console.log('Email scheduled');
}
module.exports = { startEmailing }


const nodemailer = require("nodemailer")
const User = require('./model')

const jobSchedule = async (userId) => {

        try {
            const user = await User.findOne({ _id: userId })
            if (user.toBeRecommended.length === 0) {
                console.log(`No recommendations to send for user ${user.name}`)
                return
            }

            const reco = user.toBeRecommended[0];

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'torrance.ankunding40@ethereal.email',
                    pass: 'ue4xNXMdfbNs9f57DA'
                }
            })

            const mailContent = {
                from: 'torrance.ankunding40@ethereal.email',
                to: user.email,
                subject: 'Recommendation For You',
                text: `Check out this recommended article: ${reco.title}.`
            }

            await transporter.sendMail(mailContent)
            console.log(`Email successfully sent to ${user.name}`);

            user.toBeRecommended.shift()
            user.recommendedTillNow.push(reco)
            await user.save()

        } catch (error) {
            console.error('Error sending email: ', error)
        }
    }

const startEmailing = async (userId, signUpDate) => {
  try {
      const user = await User.findOne({ _id: userId })
      const currentTime = new Date().getTime()
      const lastMailTime = user.lastMail ? user.lastMail.getTime() : signUpDate.getTime()
      const timeSpentSinceLastMail = currentTime - lastMailTime
      let delay = 60000 - timeSpentSinceLastMail

      const sendEmail = async () => {
        await jobSchedule(user._id)
        user.lastMail = new Date()
        await user.save();
      };

      setTimeout(async () => {
        await sendEmail()

        setInterval(async () => {
          await sendEmail()
        }, interval) 

      }, delay)
    // console.log(`Email scheduled for user ${user.name} OLD`);
  } catch (error) {
    console.error('Error:', error)
  }
};


module.exports = { startEmailing };

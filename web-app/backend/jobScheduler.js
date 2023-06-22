
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

            let mailHead = `<h2>Greetings! Following is the recommeded article of the week: </h2>\n\n`
            let mailTitle = `<h1>Title: ${reco.title}</h1>\n\n`
            let mailAbstract = `<p style = "font-size:15px">Abstract: ${reco['abstract']}</p>\n\n\n`
            let mailSalutation = `\n\n <h4>Thank You for subscribing to our weekly reseach paper recommendations!</h4>`
            let mailBody = `${mailHead}${mailTitle}${mailAbstract}${mailSalutation}`
            const mailContent = {
                from: 'torrance.ankunding40@ethereal.email',
                to: user.email,
                subject: `Check out this recommended article: ${reco.title}.`,
                html: `${mailBody}`
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
        }, 60000) 

      }, delay)
    // console.log(`Email scheduled for user ${user.name} OLD`);
  } catch (error) {
    console.error('Error:', error)
  }
};


module.exports = { startEmailing };

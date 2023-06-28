const nodemailer = require("nodemailer")
const User = require('./model')

// calling jobSchedule() function to handle email sending through nodemailer, also updating the database recommendation fields.
const jobSchedule = async (userId) => {
        try {
            const user = await User.findOne({ _id: userId })
            if (user.toBeRecommended.length === 0) {
                console.log(`No recommendations to send for user ${user.name}`)
                return
            }

          const reco = user.toBeRecommended[0]; // fetches the most recommended article/paper for the user

            // object parameters for SMTP protocols in nodemailer.
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'torrance.ankunding40@ethereal.email',
                    pass: 'ue4xNXMdfbNs9f57DA'
                }
            })
            
          // designing the mail content to be sent
            let mailHead = `<h2>Greetings! Following is the recommeded article of the week: </h2><br><br>`
            let mailTitle = `<h1>Title: ${reco.title}</h1><br><br>`
            let mailAbstract = `<p style = "font-size:15px">Abstract: ${reco['abstract']}</p><br><br><br>`
            let mailSalutation = `<br> <h4>Thank You for subscribing to our weekly reseach paper recommendations!</h4>`
            let mailURL = `<a href="${reco.url}">Visit the article</a><br>`
            let mailBody = `${mailHead}${mailTitle}${mailAbstract}${mailURL}${mailSalutation}`
          
            // user and sender parameters for SMTP protocols
            const mailContent = {
                from: 'torrance.ankunding40@ethereal.email',
                to: user.email,
                subject: `Check out this recommended article: ${reco.title}.`,
                html: `${mailBody}`
            }

            await transporter.sendMail(mailContent)
            console.log(`Email successfully sent to ${user.name}`);

            // moving the recommendation from "toBeRecommended" field to "recommendedTillNow" field.
            user.toBeRecommended.shift()
            user.recommendedTillNow.push(reco)
            await user.save()

        } catch (error) {
            console.error('Error sending email: ', error)
        }
    }

// schedules emails at regular intervals by referring to the lastMail field of database
const startEmailing = async (userId, signUpDate) => {
  try {
      const user = await User.findOne({ _id: userId })
      const currentTime = new Date().getTime()
      const lastMailTime = user.lastMail ? user.lastMail.getTime() : signUpDate.getTime()
      const timeSpentSinceLastMail = currentTime - lastMailTime
      let delay = 30000 - timeSpentSinceLastMail

      const sendEmail = async () => {
        await jobSchedule(user._id)
        user.lastMail = new Date()
        await user.save();
      };

      // schedules mail every minute (60000 milliseconds) for testing purpose
      setTimeout(async () => {
        await sendEmail()

        setInterval(async () => {
          await sendEmail()
        }, 30000) 

      }, delay)
    // console.log(`Email scheduled for user ${user.name} OLD`);
  } catch (error) {
    console.error('Error:', error)
  }
};


module.exports = { startEmailing };

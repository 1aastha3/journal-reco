const cron = require("node-cron")
const nodemailer = require("nodemailer")
const User = require('./model')

const jobSchedule = async (userId) => {

        console.log('started');
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
                to: 'darshanbagrecha1729@gmail.com',
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
        const user = await User.findOne({ _id: userId });
        const lastMailTime = user.lastMail ? user.lastMail.getTime() : signUpDate.getTime();
        const currentTime = new Date().getTime();
        let delay = 0;
    
        while (currentTime - lastMailTime < 10000);

        delay = 10000;

        const sendEmail = async () => {
            await jobSchedule(user);
            user.lastMail = new Date();
            await user.save();
        };
        setInterval(async () => {
            await sendEmail();
        }, 10000); // Send email every 1 minute (60000 milliseconds)

        console.log(`Email scheduled for user ${user.name}`);
  } catch (error) {
        console.error('Error:', error);
  }
};



module.exports = { startEmailing }

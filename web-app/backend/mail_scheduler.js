const nodemailer = require("nodemailer")
const User = require('./model')

const sendMail = async (userId) => {
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

    }
    catch (error) {
        console.error('Error sending email: ', error)
    }
}


const startEmailing = async (userId, signUpDate) => {
  try {
    const user = await User.findOne({ _id: userId })
    let currentTime = new Date().getTime()
    let lastMailTime = user.lastMail ? user.lastMail.getTime() : signUpDate.getTime()
    let timeSpentSinceLastMail = currentTime - lastMailTime
    const interval = 60000
    let delay = interval - timeSpentSinceLastMail

    const sendEmail = async () => {
      await jobSchedule(user._id)
      user.lastMail = new Date()
      await user.save();
    };

    if (timeSpentSinceLastMail > interval) {
      await sendEmail();
      console.log("Email sent")
    }
      

  } catch (error) {
    console.error('Error:', error)
  }
};

async function getUsers() {
  try {
    const users = await User.find();

    for (const user of users) {
      const signUpDate = user.signUp;
      const userId = user._id;

      await startEmailing(userId, signUpDate);
    }
  }
  catch (error) {
    console.error('Error:', error);
  }
}

setInterval(async ()=> {
  await getUsers();
}, 1000);

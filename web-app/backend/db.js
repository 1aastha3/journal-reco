const mongoose = require("mongoose")

// connects to the database using environment variables
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo connected to ${conn.connection.host}`)
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB
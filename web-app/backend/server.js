const express = require("express")
const dotenv = require("dotenv")
const userRoutes = require("./Routes/userRoutes")
const connectDB = require("./db")
const { startEmailingForAllUsers } = require("./Controllers/registerUser")

/* Has an api endpoint, which calls userRoutes function handling all the routes and other api endpoints for the project.
   This file also connects the project with database using connectDB() function. This file is also responsible for scheduling mails */

dotenv.config()
connectDB() // connecting to mongoDB database


// calls email scheduler
startEmailingForAllUsers().catch((error) => {
  console.error('Error starting email scheduling:', error);
});

const app = express()
app.use(express.json())

//handling cross-origin issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api/user", userRoutes)

// server start
const port = process.env.PORT || 3300
const server = app.listen(port, console.log(`Server is running on port ${port}`))




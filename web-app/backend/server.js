const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const userRoutes = require("./Routes/userRoutes")
const connectDB = require("./db")

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// routes - api endpoints, a function is passed for what type of request in each path. that function is located in /backend/Routes
// for each route there, a controller function is passed (a route handling function) and these are located in /backend/Controllers

app.use("/api/user", userRoutes)


// server start
const port = process.env.PORT || 3300
const server = app.listen(port, console.log(`Server is running on port ${port}`))

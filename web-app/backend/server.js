const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const userRoutes = require("./Routes/userRoutes")

dotenv.config()
const app = express()
app.use(express.json())
// routes - api endpoints, a function is passed for what type of request in each path. that function is located in /backend/Routes
// for each route there, a controller function is passed (a route handling function) and these are located in /backend/Controllers

app.use("/api/user", userRoutes)
// more routes for recommendation and journal apis



// server start
const port = process.env.PORT || 3300
const server = app.listen(port, console.log(`Server is running on port ${port}`))

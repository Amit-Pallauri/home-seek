const express = require('express')
// require("./utils/razorpay")
const passport = require('passport')
// const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const { config } = require('dotenv')
const cors = require('cors')
config()
require('./db')
require('./utils/passport')

const app = express()
// app.use(cookieParser());
app.use(bodyparser.json())
app.use(express.json())
app.use(
  cors() 
  // cors({
  //       origin: "http://localhost:3001",
  //       credentials: true,
  //       allowedHeaders: ["Content-Type"]
  //     })
)
app.options('*', cors())
app.use(passport.initialize())

const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require("./routes/adminRoute");
const chatRoutes = require('./routes/chatRoutes')
app.use(userRoutes)
app.use(apiRoutes)
app.use(adminRoutes)
app.use(chatRoutes)

module.exports  = app
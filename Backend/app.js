const express = require('express')
// const instance = require("./utils/razorpay")
const passport = require('passport')
const cookieParser = require('cookie-parser')
const { config } = require('dotenv')
const cors = require('cors')
// const bodyParser = require('body-parser')
config()
require('./db')
require('./utils/passport')

const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(passport.initialize())

const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require("./routes/adminRoute");
app.use(userRoutes)
app.use(apiRoutes)
app.use(adminRoutes)

module.exports  = app
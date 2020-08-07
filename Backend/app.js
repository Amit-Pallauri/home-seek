const express = require('express')
const { config } = require('dotenv')
const cors = require('cors')
// const bodyParser = require('body-parser')
config()
require('./db')

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())

const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require("./routes/adminRoute");
app.use(userRoutes)
app.use(apiRoutes)
app.use(adminRoutes)

module.exports  = app
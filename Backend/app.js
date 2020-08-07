const express = require('express')
const { config } = require('dotenv')
const cors = require('cors')
config()
require('./db')

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())

const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes');
app.use(userRoutes)
app.use(apiRoutes)

module.exports  = app
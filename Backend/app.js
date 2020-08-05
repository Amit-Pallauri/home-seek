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
app.use(userRoutes)

module.exports  = app
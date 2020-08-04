const express = require('express')
const { config } = require('dotenv')
config()
require('./db')

const app = express()
app.use(express.json())

const userRoutes = require('./routes/userRoutes') 
app.use(userRoutes)

module.exports  = app
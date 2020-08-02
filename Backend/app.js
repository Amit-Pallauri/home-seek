const express = require('express')
const app = express()
const { config } = require('dotenv')
config()
require('./db')

app.use(express.json())

const userRoutes = require('./routes/userRoutes') 
app.use(userRoutes)

module.exports  = app
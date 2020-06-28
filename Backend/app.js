const express = require('express')
const app = express()
const { config } = require('dotenv')
config()
require('./db')

app.get('/', (_, res)=> res.send('basic response'))

module.exports  = app
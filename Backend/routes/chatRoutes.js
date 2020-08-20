const { Router } = require('express')
const router = Router()
const { getChats }  = require('../controllers/chatController')

router.get('/getChats', getChats)

module.exports = router
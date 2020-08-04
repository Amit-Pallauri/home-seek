const { Router } = require('express')
const router = Router()
const { signUp, signIn, signOut, verifyUser } = require('../controllers/userControllers')
const authenticate = require('../middlewares/authenticate')

// basic response
router.get('/', (_, res)=> res.send('basic response'));

// user requests
router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.delete('/signOut', authenticate, signOut)
router.post('/verify', verifyUser)

module.exports = router
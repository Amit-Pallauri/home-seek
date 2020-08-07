const { Router } = require('express')
const router = Router()
const { signUp, signIn, signOut, verifyUser } = require('../controllers/userControllers')
const {adminRegister,adminLogin,adminLogout} = require('../controllers/adminController');
const authenticate = require('../middlewares/authenticate')

// basic response
router.get('/', (_, res)=> res.send('basic response'));

// user requests
router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.delete('/signOut', authenticate, signOut)
router.get('/verify/:token', verifyUser)

//Admin Routes
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);
router.delete('/admin/logout', authenticate, adminLogout)

module.exports = router
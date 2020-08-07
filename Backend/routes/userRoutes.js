const { Router } = require('express')
const router = Router()
const {
    signUp,
    signIn,
    signOut,
    verify,
    addProfile,
    forgotPassword,
    revivePassword
} = require('../controllers/userControllers')
const {
    verifyToken,
    verifyUser
} = require('../middlewares/authenticate');
const upload = require('../utils/multer');

// basic response
router.get('/', (_, res) => res.send('basic response'));

// user requests
router.post('/signUp', signUp)
router.get('/verify/:token', verify)
router.post('/signIn',verifyUser, signIn)
router.delete('/signOut', verifyToken, signOut)
router.post('/addProfile', verifyToken, upload.single('uploadImage'), addProfile)
router.post('/forgotPassword', forgotPassword)
router.post('/revivePassword/:token', revivePassword )
module.exports = router
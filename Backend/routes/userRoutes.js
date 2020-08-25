const { Router } = require('express')
const router = Router()
const {
    signUp,
    signIn,
    signOut,
    verify,
    forgotPassword,
    revivePassword,
    loginViaThirdParty,
    uploadProfilePic,
    addDetails,
    updateBankDetails
} = require('../controllers/userControllers')
const {
    verifyToken,
    verifyUser
} = require('../middlewares/authenticate');
const upload = require('../utils/multer');
const passport = require('passport');

// basic response
router.get('/', (_, res) => res.send('basic response'));

// user requests
router.post('/signUp', signUp)
router.get('/verify/:token', verify)
router.post('/signIn',verifyUser, signIn)
router.delete('/signOut', verifyToken, signOut)
router.post('/uploadPic', verifyToken, upload.single('image'), uploadProfilePic)
router.post('/addDetails', verifyToken, addDetails)
router.post('/forgotPassword', forgotPassword)
router.post('/revivePassword/:token', revivePassword )
router.post('/thirdPartysignIn', loginViaThirdParty)
router.post('/updateBankDetails',verifyToken, updateBankDetails )

module.exports = router
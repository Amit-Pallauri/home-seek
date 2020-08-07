const { Router } = require('express')
const router = Router()
const {adminRegister,adminLogin,adminLogout} = require('../controllers/adminController');

const {
    verifyAdmin
} = require('../middlewares/authenticate');


//Admin Routes
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);
router.delete('/admin/logout', verifyAdmin, adminLogout)


module.exports = router
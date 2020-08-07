const {Router} = require('express');
const router = Router()
const {PostsCreate,GetPost,detailsCreate,detailsUpdate,postDelete} = require("../controllers/apiControllers");
const authenticate = require("../middlewares/authenticate")

router.post('/owner/listing/create', authenticate, PostsCreate)

router.get('/owner/listings', authenticate, GetPost)

router.post('/owner/listing/home/:homeId', authenticate, detailsCreate)

router.patch('/owner/listing/home/update/:homeId', authenticate, detailsUpdate)

router.delete('/owner/listing/home/delete/:homeId', authenticate, postDelete)


module.exports = router
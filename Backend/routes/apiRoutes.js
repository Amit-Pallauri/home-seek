const {Router} = require('express');
const router = Router()
const {
    PostsCreate,
    GetPost,
    detailsCreate,
    detailsUpdate,
    postDelete,
    createUserRequest,
    getUserRequests,
    deleteUserRequests,
    createNormalRequest,
    getNormalRequests,
    deleteNormalRequests, 
    filterSearch,
    amountpaycreate,
    createOTP,
    verifyTokenAmountPayment,
    verifyOTP,
    GetParticularPost,
    postAndDetailsDelete,
    GetAllPosts, 
    userSpecificPosts,
    createOwnerRequests,
    verifyDepositAmountPayment,
    verifyRentAmountPayment,
    getOwnerRequests,
    deleteOwnerRequests
} = require("../controllers/apiControllers");
const {
    verifyAdmin, verifyToken
} = require("../middlewares/authenticate")
const upload = require('../utils/multer');
const Details = require('../models/Details');
const User = require('../models/Users');

router.post('/owner/listing/create', verifyAdmin, PostsCreate)

router.get('/owner/listings', verifyAdmin, GetPost)

router.post('/owner/listing/home/:homeId', upload.array('images', 10), verifyAdmin, detailsCreate)

router.patch('/owner/listing/home/update/:homeId',upload.array('images', 10) , verifyAdmin, detailsUpdate)

router.delete('/owner/listing/delete/:postId', verifyAdmin, postDelete)

router.delete('/owner/listing/home/delete/:homeId', verifyAdmin, postAndDetailsDelete)

router.post('/user/request', verifyAdmin, createUserRequest);

router.get('/admin/userrequests', verifyAdmin, getUserRequests);

router.delete('/admin/delete/userrequests/:requestId', verifyAdmin, deleteUserRequests);

router.post('/user/book/request', verifyAdmin, createNormalRequest);

router.get('/admin/normalrequests', verifyAdmin, getNormalRequests);

router.delete('/admin/delete/normalrequests/:requestId', verifyAdmin, deleteNormalRequests);

router.get('/filter',verifyToken, filterSearch)

router.post('/user/pay', verifyAdmin, amountpaycreate);

router.post('/user/tokenpay/verify', verifyAdmin, verifyTokenAmountPayment);

router.post('/user/depositpay/verify', verifyAdmin, verifyDepositAmountPayment);

router.post('/user/rentpay/verify', verifyAdmin, verifyRentAmountPayment);

router.post('/owner/listing', verifyAdmin, createOTP);

router.post('/owner/listing/verify', verifyAdmin, verifyOTP);

router.get('/owner/home/:homeId', verifyAdmin, GetParticularPost);

router.get('/listings', verifyAdmin, GetAllPosts);

router.get('/userSpecificPosts', userSpecificPosts)

router.get('/getAllSortedPosts', verifyToken, async (req, res)=> {
    try {
        var detailedData = {
            city : []
        }
        const data = await Details.find({})
        data.map(el => {
            if(el.location.city){
                detailedData.city.length === 0 
                ?
                    detailedData.city.push(el.location.city)
                : 
                    !detailedData.city.includes(el.location.city) 
                    ? detailedData.city.push(el.location.city)
                    : ''
            }
        })
        res.status(200).json({
            message : 'sorted data extracted',
            data : detailedData
        })       
    } catch (error) {
        console.log(error)
    }
})

router.get('/getAllPostedListings', verifyToken, async (req, res) =>{
    try {
        const accessToken = req.headers.authorization
        const foundUser = await User.findOne({ accessToken }).populate('listings')
        const verifiedListings = []
        for(var i=0; i<foundUser.listings.length; i++){
            if(foundUser.listings[i].verified == true){
                verifiedListings.push(foundUser.listings[i])
            }
        }
        res.status(200).json({verifiedListings})
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/createOwnerRequests', verifyToken, createOwnerRequests);

router.get('/admin/ownerrequests', verifyAdmin, getOwnerRequests);

router.delete('/admin/delete/ownerrequests/:requestId', verifyAdmin, deleteOwnerRequests);

router.get('/getAllUsersWithHome', verifyAdmin, async (req, res) => {
    try {
        var foundUsers = []
        const allUsers = await User.find({}).populate('home')
        for( var i= 0; i < allUsers.length; i++){
            allUsers[i].home ? foundUsers.push(allUsers[i]) : null
        }
        res.status(200).json({ foundUsers })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.get('/getUserWithHome', verifyAdmin ,async (req, res) =>{
    try {
        const userId = req.query.userId
        console.log(req.query)
        const foundUser = await User.findOne({ _id : userId}).populate('home')
        res.status(200).json({ foundUser})
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router
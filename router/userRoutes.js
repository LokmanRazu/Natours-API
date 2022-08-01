const router = require('express').Router();
const { signup,login,users } = require('./../controller/authController')
const { uploadPhoto } = require('../middleware/multerFileUploadMiddleware')

router.get('/userRoutes',users)
router.post('/',uploadPhoto,signup)
router.post('/',login)



module.exports = router
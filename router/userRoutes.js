const router = require('express').Router();
const { signup,login,users } = require('./../controller/authController')

router.get('/userRoutes',users)
router.post('/',signup)
router.post('/',login)



module.exports = router
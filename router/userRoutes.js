const router = require('express').Router();
const { signup,login } = require('./../controller/authController')


router.post('/',signup)
router.post('/',login)



module.exports = router
const router = require('express').Router();
const { login } = require('./../controller/authController')
const { forgotPassword,resetPassword } = require('../middleware/authMiddleware')

router.post('/',login)
router.post('/forgot',forgotPassword)
router.patch('/reset:token',resetPassword)

module.exports = router
const router = require('express').Router();
const { login } = require('./../controller/authController')
const { forgotPassword } = require('../middleware/authMiddleware')

router.post('/',login)
router.post('/forgot',forgotPassword)

module.exports = router
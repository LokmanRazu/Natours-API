const router = require('express').Router();
const { signup } = require('./../controller/authController')

router.post('/',signup)

module.exports = router
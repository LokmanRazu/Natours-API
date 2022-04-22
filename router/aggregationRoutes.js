const router = require('express').Router();
const { getTourStats } = require('../controller/aggregationController')

router.get('/',getTourStats)

module.exports = router;
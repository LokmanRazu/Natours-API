const router = require('express').Router();

const { getAllReview,createReview} = require('./../controller/reviewController')

router.get('/review',getAllReview)
router.post('/review',createReview)

module.exports = router;
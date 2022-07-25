const router = require('express').Router();
const { getTourController, tourDataController , patchController , deleteTour, } = require('../controller/tourController')
const { protect,restrictTo } = require('../middleware/authMiddleware')
const {createReview } = require('../controller/reviewController')

router.get('/',protect, getTourController);
router.post('/post',tourDataController)
router.patch('/:id',protect,restrictTo('admin'),patchController);
router.delete('/:id' ,deleteTour)

router.post('/:id/nestadeReview',createReview)

module.exports = router;
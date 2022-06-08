const router = require('express').Router();
const { getTourController, tourDataController , patchController , deleteTour, } = require('../controller/tourController')
const { protect,restrictTo } = require('../middleware/authMiddleware')

router.get('/',protect, getTourController)
router.post('/',tourDataController)
router.patch('/:id',protect,restrictTo('admin'),patchController)
router.delete('/:id' ,deleteTour)

module.exports = router;
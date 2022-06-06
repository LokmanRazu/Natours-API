const router = require('express').Router();
const { getTourController, tourDataController , patchController , deleteTour, } = require('../controller/tourController')
const { protect } = require('../middleware/authMiddleware')

router.get('/',protect, getTourController)
router.post('/',tourDataController)
router.patch('/:id',patchController)
router.delete('/:id',deleteTour)

module.exports = router;
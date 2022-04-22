const router = require('express').Router();
const { getTourController, tourDataController , patchController , deleteTour, } = require('../controller/tourController')

router.get('/', getTourController)
router.post('/',tourDataController)
router.patch('/:id',patchController)
router.delete('/:id',deleteTour)

module.exports = router;
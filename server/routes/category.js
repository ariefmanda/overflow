var express = require('express');
var router = express.Router();
var category = require('../controllers/category')
/* GET users listing. */
router.get('/',category.find)
router.post('/',category.create)
router.put('/:id',category.update)
router.delete('/:id',category.destroy)
router.get('/:id',category.findById)

module.exports = router;

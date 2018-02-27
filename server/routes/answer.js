var express = require('express');
var router = express.Router();
var answer = require('../controllers/answer')
var auth = require('../middleware/authorization')
/* GET users listing. */
router.put('/point/:id',auth,answer.updatePoint)
router.put('/minuspoint/:id',auth,answer.minusPoint)
router.get('/question/:id',answer.findByQuestion)
router.get('/',answer.find)
router.post('/',auth,answer.create)
router.put('/:id',auth,answer.update)
router.delete('/:id',auth,answer.destroy)
router.get('/:id',answer.findById)

module.exports = router;

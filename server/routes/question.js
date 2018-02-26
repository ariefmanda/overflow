var express = require('express');
var router = express.Router();
var question = require('../controllers/question')
var auth = require('../middleware/authorization')
/* GET users listing. */
router.put('/point/:id',auth,question.updatePoint)
router.get('/user/:id',question.findByUser)
router.get('/',question.find)
router.post('/',auth,question.create)
router.put('/:id',auth,question.update)
router.delete('/:id',auth,question.destroy)
router.get('/:id',question.findById)

module.exports = router;

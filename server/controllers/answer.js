const answer = require('../models/answer');
var kue = require('kue')
  , queue = kue.createQueue();
module.exports = {
  find:(req,res,next)=>{
    answer.find()
      .then(answers=>{
        res.json(answers)
      })
      .catch(err=>{
        next(err)
      })
  },
  findById : (req,res,next)=>{
    answer.findById(req.params.id)
      .then(answers=>{
        res.json(answers)
      })
      .catch(err=>{
        next(err)
      })
  },
  findByQuestion : (req,res,next)=>{
    answer.find({
      QuestionId:req.params.id
    })
    .populate(['UserId'])
      .then(answers=>{
        res.json(answers)
      })
      .catch(err=>{
        next(err)
      })
  },
  create:(req,res,next)=>{
    console.log(req.body);
    answer.create({
      answer: req.body.answer,
      UserId: req.decoded._id,
      QuestionId: req.body.QuestionId,
      point: req.body.point
    })
    .then(answers=>{
      answer.findOne(answer)
      .populate(['UserId','QuestionId'])
      .then(data=>{
        queue.create('email',{
          email:data.UserId.email,
          text: `Anda mendapatkan Jawaban baru untuk pertanyaan ${data.QuestionId.question}`,
          subject: 'HacktivOverFlor-Simple by ariefmanda',
          html: `<p>Anda mendapatkan Jawaban baru untuk pertanyaan: ${data.QuestionId.question}<p><br>
          Please check in : <a href="http://overflow.feedomain.tk">Hacktiv Over Flow Simple</a>`
        }).save(err=>{
          if(err){
            next(err)
          }else{
            res.json(answers)
          }
        })
      })
      .catch((err) => {
        next(err)
      })
    })
    .catch(err=>{
      next(err)
    })
  },
  update:(req,res,next)=>{
    answer.findByIdAndUpdate(req.params.id,{
        answer: req.body.answer,
        UserId: req.decoded._id,
        QuestionId: req.body.QuestionId,
    })
    .then(answers=>{
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
  updatePoint:(req,res,next)=>{
    answer.findByIdAndUpdate(req.params.id,{
        point: req.body.point
    })
    .then(answers=>{
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    answer.findByIdAndRemove(req.params.id)
    .then(answers=>{
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
}

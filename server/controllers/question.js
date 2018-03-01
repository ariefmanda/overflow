const question = require('../models/question');
module.exports = {
  find:(req,res,next)=>{
    question.find()
      .populate(['UserId','CategoryId'])
      .then(questions=>{
        res.json(questions)
      })
      .catch(err=>{
        next(err)
      })
  },
  findById : (req,res,next)=>{
    question.findById(req.params.id)
      .populate(['UserId','CategoryId'])
      .then(questions=>{
        res.json(questions)
      })
      .catch(err=>{
        next(err)
      })
  },
  findByUser : (req,res,next)=>{
    question.find({
      UserId:req.params.id
    })
      .then(questions=>{
        res.json(questions)
      })
      .catch(err=>{
        next(err)
      })
  },
  create:(req,res,next)=>{
    question.create({
      title:req.body.title,
      question:req.body.question,
      UserId:req.decoded._id,
      CategoryId:req.body.CategoryId,
    })
    .then(questions=>{
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  update:(req,res,next)=>{
    question.findByIdAndUpdate(req.params.id,{
      title:req.body.title,
      question:req.body.question,
      UserId:req.decoded._id,
      CategoryId:req.body.CategoryId
    })
    .then(questions=>{
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  updatePoint:(req,res,next)=>{
    question.findById(req.params.id)
    .then(questions=>{
      if(questions.point){
        questions.point.push(req.body.point)
      }else{
        questions.point = req.body.point
      }
      questions.save()
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  minusPoint:(req,res,next)=>{
    question.findById(req.params.id)
    .then(questions=>{
      questions.point=questions.point.filter(e=>{
        return String(e) !== (req.body.point)
      })
      questions.save()
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    question.findByIdAndRemove(req.params.id)
    .then(questions=>{
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
}

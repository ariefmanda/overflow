const User = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = {
  signin:(req,res,next)=>{
    console.log(process.env);
    User.findOne({'email':req.fb.email})
      .then(user=>{
        if(user){
          let token = jwt.sign({user}, process.env.secretjwt)
          res.send({
            message:'akun sudah ada',
            name:user.name,
            email:user.email,
            image_url:user.image_url,
            UserId:user._id,
            token:token,
            role:user.role
          })
        }else{
          User.create({
              email: req.fb.email,
              name: req.fb.name,
              image_url: req.fb.picture.data.url,
              role: req.body.role || 0
            })
            .then(userCreate =>{
              user=userCreate
              let token = jwt.sign({user}, process.env.secretjwt)
              res.send({
                message: 'add success',
                name:user.name,
                email:user.email,
                image_url:user.image_url,
                token:token,
                UserId:user._id,
                role:user.role
              })
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

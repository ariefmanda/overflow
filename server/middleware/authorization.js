const jsonwebtoken = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  // console.log('ini middleware',process.env);
  var decode = jsonwebtoken.verify(req.headers.token, process.env.secretjwt)
  console.log(decode);
  if(decode.name!=='JsonWebTokenError'){
    req.decoded=decode.user
    console.log(req.decoded);
    next()
  }else{
    next({
      message: 'maaf data tidak ada'
    })
  }
}

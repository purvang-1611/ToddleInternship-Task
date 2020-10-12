var express = require('express');
var router = express.Router();
var user=require('../model/user_model');

/* GET users Token. */
router.post('/get_token', function(req, res, next) {
  if(req.body=={}){
    res.send("Bad request with empty body");
  }
  else{
    if(req.body.username && req.body.password){ //username Password must be there in body
      user.getdatabyname(req.body.username,(err,result)=>{ 
    console.log("Router"+result);
        if(err)
          res.send("Server Side Error");
        if(result==null){// if already not exist username password
          var token=user.adddata(req.body);
          res.send({token:token});
        }
        else{// if already there
          console.log(result);
          res.send({token:result.token});
        }
      })
    }
    else{
      res.send("Username and Password must be needed");
    }
  }
});

module.exports = router;

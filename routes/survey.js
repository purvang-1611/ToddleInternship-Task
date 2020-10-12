var express = require('express');
const surveys = require('../model/survey_model');
var router = express.Router();
var survey=require('../model/survey_model');
var user=require('../model/user_model');

var checkauth=function(req,res,next){
    var token=req.headers['token'];
    //console.log(req.headers['token']);
    if(token == null){
        res.sendStatus(401);
    }
    else{
        user.decodetoken(token,(err,decode)=>{
            //console.log(decode.username);
            if(err)
                res.send("Not valid User");
            if(decode.username==req.body.username)
                next();
            else
                res.sendStatus(401);
        })
    }
}

router.post('/addSurvey',checkauth,(req,res,next)=>{
    survey.addsurvey(req.body,(result,err)=>{
        if(err)
            res.send(err);

        else
            res.send("Successfully Survey created ${this.lastID}");
    });
});

router.post('/getsurvey',checkauth,(req,res,next)=>{
    //console.log(req.body);
    survey.getsurvey(req.body.surveyNo,function(err,result){
        if(err)
        res.send("Server Error");
    else
        res.send(result);
    })
   
})

router.post('/getresult',checkauth,(req,res,next)=>{
    //console.log(req.body);
    survey.getsurvey(req.body.surveyNo,function(err,result){
        if(err)
        res.send("Server Error");
    else
        {
            var question=req.body.data;
            var correct=0;
            for(let i=0;i<question.length;i++){
                for(let j=0;j<result.length;j++){
                    if(question[i]["quesid"]== result[j]["surveyQsID"] && question[i]["answer"]==result[j]["answer"])
                        correct=correct+1;
                }
            }
            var ans=(correct*100)/question.length;
            var ans1=ans+"%";
            res.send({Persentage:ans1});
        }
    })
   
})




module.exports=router;
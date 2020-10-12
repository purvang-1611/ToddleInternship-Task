var db= require('../dbconnection');



var surveys={
    getsurvey:function(id,callback){
        db.all("select * from surveyquestion where surveyNo=?",id,callback);
    },
    addsurvey:function(data,callback){
        var smt=db.prepare("insert into survey(username) values(?)");
        smt.run(data.username,function(err){
           //console.log(smt);
           // console.log(smt.lastID);
            var questions=data["data"];
            var lastID=smt.lastID;
            //console.log(questions);
            var query="insert into surveyquestion(question,answer,surveyNo) values";
            let questionlen=questions.length-1;
            for(let i=0;i<questions.length-1;i++){
                query+="('"+questions[i]["ques"]+"',"+questions[i]["answer"]+","+lastID+"),";
            }
            query+="('"+questions[questionlen]["ques"]+"',"+questions[questionlen]["answer"]+","+lastID+");";
            //console.log(query);
            var stat=db.prepare(query);
            stat.run(callback);
        });
    }

}

module.exports=surveys;



var db= require('../dbconnection');
var jwt=require('jsonwebtoken');

var users={
    adddata:function(data){
        var username=data["username"];
        var password=data["password"];
        var token=this.gettoken(username);

        db.run("insert into user(username,password,token) values(?,?,?)",[username,password,token]);
        return token;
    },
    gettoken:function(data,callback){
        var usertoken={
            username:data
        }
        var privatekey="kjnjdhui919823"; 
        var token=jwt.sign(usertoken,privatekey);
        return token;        
    },
    getdatabyname:function(username,callback){
        console.log(username);
        db.get("select username,token from user where username = ?;",[username],callback);
    },
    decodetoken:function(token,callback){
        var privatekey="kjnjdhui919823"; 
        jwt.verify(token,privatekey,callback);
    }

};

module.exports=users;
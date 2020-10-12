const sqlite=require('sqlite3').verbose();

const db=new sqlite.Database('./toddledb.db',(err)=>{
    if(err){
        console.error(err.message);
        return err.message;
    }
    console.log("Connected to toddle DataBase.");   
});

module.exports=db;
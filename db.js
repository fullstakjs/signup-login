const db=require('mongoose');
require('custom-env').env()

db.connect(process.env.CONNECTION_TO_DATABASE,{ useUnifiedTopology: true, useNewUrlParser: true },(err)=>{
    if (!err){
        console.log("connected to database ..");
    }
    else{
        console.log(JSON.stringify(err, null, 2));
    }
})

module.exports=db;


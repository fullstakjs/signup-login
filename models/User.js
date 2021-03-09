const mongoose=require('mongoose');

const User=mongoose.model("User",{
    email: {type: String},
    userName: {type: String},
    password: {type:String},
    date: {type: String}
})

module.exports=User;
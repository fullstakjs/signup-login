const express=require('express');
const bcrypt=require('bcrypt');
const User=require('../models/User');
const jwt=require('jsonwebtoken');


const user_route=express.Router();

//signup
user_route.post("/signup",async(req,res)=>{

    const errors=[];
    const {email,userName,password}=req.body;

    if(!email){
       let no_email="email required";
        errors.push(no_email);
    }
    if(!userName){
        let no_userName="user name required";

        errors.push(no_userName);
    }
    if(!password){
        let no_password="password required";

        errors.push(no_password);
    }
    if(errors.length>0){
        res.send(JSON.stringify(errors, null ,2));
        
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds);
   
    const usr= new User({
        email,
        userName,
        password: passwordHash,
        date: new Date()
    })
    console.log(usr);
    console.log(passwordHash);
    usr.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send("Error occered "+JSON.stringify(err,null,2))
        }
    })


})
//login
user_route.post("/login",async(req,res)=>{
    const loginErros=[];
    const {email,password}=req.body
    if(!email){
        let email_err="Email is required"
        loginErros.push(email_err)
    }
    if(!password){
        let pass_err="password is required to sign in"
        loginErros.push(pass_err)
    }

    const user=await User.findOne({email:email})
    const mypass=await bcrypt.compare(password, user.password)

    console.log(mypass)
    
    const userForToken = {
        username: user.userName,
        id: user._id,
      }
      console.log(userForToken);

    const token = jwt.sign(userForToken, process.env.SECRET)
    console.log(token);
    res.send({ token, userName: user.userName, email: user.email })
    
})

module.exports=user_route;
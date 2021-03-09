const express=require('express');
const Note=require("../models/Note");
const User=require("../models/User")

const note_route=express.Router();

note_route.get("/:id",(req,res)=>{
    Note.findById(req.params.id,(err,doc)=>{
        res.send(doc)
    })
})

note_route.post(async(req,res)=>{
    const user = await User.findById(req.body.userId);
    const anote=new Note({
        title:req.body.title,
        content:req.body.content,
        user: user.id
    })

    anote.save((err,doc)=>{
        if(!err){
            res.send("note saved")
        }
    })
})




module.exports=note_route;
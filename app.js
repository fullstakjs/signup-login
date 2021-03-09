const express=require('express');
const body_parser=require('body-parser');
const user_route= require('./controllers/userController')
const note_route= require('./controllers/note')
const db=require("./db")


const app=express();
app.use(body_parser.json())

const port=process.env.port || 4000;


app.use("/api", user_route)
app.use("/api/note", note_route)



app.listen(port,()=>console.log("server started..."))
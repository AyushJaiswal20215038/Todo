const express= require('express');
const app=express();
const cors = require('cors');
require('dotenv').config();

require('./connection/db');
const auth = require('./routes/auth');
const list = require('./routes/list');
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("<h1>Hello World!</h1>")
})
app.use("/api/v1",auth);
app.use("/api/v2",list);

app.listen(4000,()=>{
    console.log("Server Started on port 4000");
});
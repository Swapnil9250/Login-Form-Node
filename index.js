const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express()

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}))
//db Connection
mongoose.connect("mongodb://localhost:27017/mydb");

const db = mongoose.connection;
db.on('error',()=>console.log("Error in database"));
db.once('open',()=>console.log("connection done"));

app.post("/sign_up",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phno = req.body.email.phno;
    const password = req.body.password;

    const data={
        "name": name,
        "email": email,
        "phno": phno,
        "password": password

    }
    db.collection("users").insertOne(data,(err,collection)=>{
       if(err){
           throw err;
       }
       console.log("Record Inserted");
    });
    return res.redirect('signup_success.html')
})
//routing
app.get("/", (req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin":'*'
    })
    return res.redirect('index.html');
});
//port Listening
app.listen(3000,"127.0.0.1",()=>{
    console.log("port is running out 3000 ")
});
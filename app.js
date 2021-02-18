const mongoose = require('mongoose');
const express=require("express");
const bodyparser = require("body-parser");
//const readline = require("readline-sync");
require("dotenv").config();
const app = express();
app.use(bodyparser.json());
const jwt= require("jsonwebtoken");
//process.env.PORT=readline.question("Enter port")
const port =process.env.PORT || 3000
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
    mongoose.connect("mongodb://m001-student:m001-mongodb-basics@sandbox-shard-00-00.xmfx7.mongodb.net:27017,sandbox-shard-00-01.xmfx7.mongodb.net:27017,sandbox-shard-00-02.xmfx7.mongodb.net:27017/Userinfo?ssl=true&replicaSet=atlas-ibvxid-shard-0&authSource=admin&retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true } )
    .then(()=>{
      console.log("Connnection made Successfully and server is running on "+process.env.PORT);  
    }).catch(()=>{ console.log("erreo")})
}
});

app.get('/getall',ensure,(req,res)=>{
    jwt.verify(req.token,process.env.TOKEN,function(err,data){
        if(err){
            res.end("Error")
            res.status(400);
            console.log("Error")
        }
        else{
    UserModelClass.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });
}

})
})

app.post('/insert',ensure,(req,res)=>{
    jwt.verify(req.token,process.env.TOKEN,function(err,data){
        if(err){}
        else{
            const newemp = new UserModelClass();
            newemp.Id = req.body.Id;
            newemp.Name = req.body.Name;
            newemp.WorkingAt = req.body.WorkingAt;   
            newemp.save(function(err, data){
                if(err){
                    console.log(error);
                }
                else{
                    res.send("Data inserted");
                    res.end("Data Inserted Successfuly");
                }
            });
            }
   

   });
})
const UserSchema = new mongoose.Schema({
    Id:Number,
    Name:String,
    WorkingAt:String,
   // DateOfInserting:Date
   // versionKey: false // You should be aware of the outcome after set to false
});

const UserModelClass = new mongoose.model('users',UserSchema);

app.post('/login',(req,res)=>{
    const user = {id:30635};
   const token = jwt.sign({user},process.env.TOKEN);
     res.json({
        token:token
    })
})
app.post('/delete',(req,res)=>{
    const del = new UserModelClass();
    del.findByIdAndDelete((req.body.Id),function(err,data){
        if(err){
        res.send(err);
        res.end("Errorr");  
    }
    else{
       res.end(data);
    }
    })
})

function ensure(req,res,next){
    const ht =req.headers["authorization"];
   // takes data from req authorization header
    if(typeof ht !== 'undefined'){
        const br = ht.split(" ");
        const bt = br[1];
        req.token= bt;
     //   console.log(bt);
        next();

    }
    else{
        res.sendStatus(400);
    }
}



//midleware 
// UserSchema.pre('save', function (next) {
//     let now = Date.now()
//     this.DateOfInserting = now
//     // Set a value for createdAt only if it is null
//     if (!this. DateOfInserting){
//       this.DateOfInserting = now
//     }

// // Call the next function in the pre-save chain
//     next()    
//   })

// const data = new UserModelClass({
//     Id:103,
//     Name:"Amit",
//     WorkingAt:"GS LAb",
//     //DateOfInserting: ''
// })
// data.save()
//    .then(doc => {
//      console.log(doc)
//    })
//    .catch(err => {
//      console.error(err)
//    });

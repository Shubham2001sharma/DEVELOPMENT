const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/BACKEND-FRONTEND')
.then(()=>{
    console.log("DATABASE CONNECTED");
}).catch((e)=>{
    console.log("DATABASE HAS NOT CONNECTED");
})

const SCHEMA=new mongoose.Schema({
    TITLE:{
         type:String,
         required:true
    },
    DESCRIPTION:{
          type:String,
          required:true
    }
});

const collection=new mongoose.model("collectin",SCHEMA);
module.exports=collection;
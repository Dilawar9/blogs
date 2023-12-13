var mongoose=require("mongoose");


var newshema=new mongoose.Schema({
// autherId:
title:String,
body:String,
category:String,
image:String,
status:{
    type:String,
    enum:["publish","draft"],
 
}

},{timestamps:true})


const Post=mongoose.model('post',newshema);
module.exports=Post;
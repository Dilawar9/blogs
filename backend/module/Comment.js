var mongoose=require("mongoose");

var commentshema=new mongoose.Schema({
    postid:String,
    userid:String,
    comment:String,
    status:{
        type:String,
        emun:["approved","pending"]
        
    },

},{timestamps:true})

const Comment=mongoose.model('comment',commentshema);
module.exports=Comment;
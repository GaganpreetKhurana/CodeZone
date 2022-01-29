const mongoose = require ( "mongoose" );

const userSchema = new mongoose.Schema ( {
    email : { type : String , required : true , unique : true } ,
    password : { type : String , required : true } ,
    name : { type : String , required : true } ,
    role : { type : String , required : true } ,
    SID : { type : String , required : true } ,
    avatar : {type: String},
    classesCreated : [ { type : mongoose.Schema.Types.ObjectId , ref : "Class" } ] ,
    classesJoined : [ { type : mongoose.Schema.Types.ObjectId , ref : "Class" } ] ,
} , { timestamps : true } );

const User = mongoose.model ( "User" , userSchema );
module.exports = User;
const mongoose = require ( "mongoose" );


const classSchema = new mongoose.Schema ( {
    description : { type : String } ,
    subject : { type : String , required : true } ,
    batch : { type : String , required : true } ,
    code : { type : String , required : true , unique : true } ,
    creator : { type : mongoose.Schema.Types.ObjectId , ref : "User" } ,
    students : [ { type : mongoose.Schema.Types.ObjectId , ref : "User" } ] ,
    teachers : [ { type : mongoose.Schema.Types.ObjectId , ref : "User" } ] ,
    posts : [ { type : mongoose.Schema.Types.ObjectId , ref : "Posts" } ] ,
    labsCreated : [ { type : mongoose.Schema.Types.ObjectId , ref : "Lab" } ] ,
    announcements : [ { type : mongoose.Schema.Types.ObjectId , ref : "Announcements" } ] ,
    ClassMeetLink : { type : String } ,
} , { timestamps : true } );

const Class = mongoose.model ( "Class" , classSchema );
module.exports = Class;
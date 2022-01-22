const mongoose = require ( "mongoose" );

var AnnouncementSchema = new mongoose.Schema ( {
    class : {
        type : mongoose.Schema.Types.ObjectId , ref : "Class"
    } ,
    content : {
        type : String ,
        required : true ,
    } ,
    creator : { type : mongoose.Schema.Types.ObjectId , ref : "User" } ,
    
} , { timestamps : true } );

const Announcement = mongoose.model ( "Announcements" , AnnouncementSchema );
module.exports = Announcement;
const mongoose = require ( "mongoose" );
const bcrypt = require ( "bcryptjs" );

const userSchema = new mongoose.Schema ( {
    email : { type : String , required : true , unique : true } ,
    password : { type : String , required : true } ,
    name : { type : String , required : true } ,
    role : { type : String , required : true } ,
    SID : { type : String , required : true } ,
    classesCreated : [ { type : mongoose.Schema.Types.ObjectId , ref : "Class" } ] ,
    classesJoined : [ { type : mongoose.Schema.Types.ObjectId , ref : "Class" } ] ,
} , { timestamps : true } );

// to store password as hash - not plain text
userSchema.pre ( "save" , function ( next ) {
    const user = this
    
    if ( this.isModified ( "password" ) || this.isNew ) {
        bcrypt.genSalt ( 10 , function ( saltError , salt ) {
            if ( saltError ) {
                return next ( saltError )
            } else {
                bcrypt.hash ( user.password , salt , function ( hashError , hash ) {
                    if ( hashError ) {
                        return next ( hashError )
                    }
                    user.password = hash
                    next ()
                } )
            }
        } )
    } else {
        return next ()
    }
} )
const User = mongoose.model ( "User" , userSchema );
module.exports = User;
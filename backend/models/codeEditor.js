const mongoose = require ( "mongoose" );
const codeEditorSchema = new mongoose.Schema ( {
    content : Object,
    code : { type : String } ,
    lab : { type : mongoose.Schema.Types.ObjectId , ref : "Lab" } ,
    customInput : { type : String } ,
    customOutput : { type : String } ,
    languageSelected : { type : String } ,
    owner : { type : mongoose.Schema.Types.ObjectId , ref : "User" } ,
    evaluateLab : { type : Boolean } ,
    contentSaved : Object ,
    submittedAt : {
        type : String
    } ,
    finalSubmit : { type : Boolean },
    marksObtained :{ type : Boolean },
    maxMarks: {type:String},
} , { timestamps : true } );
const codeEditor = mongoose.model ( "codeEditor" , codeEditorSchema );
module.exports = codeEditor;
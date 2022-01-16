const mongoose = require("mongoose");
const compilerSchema = new mongoose.Schema({
    languageVersion:{type:String,default:"0"},
    statusCode:{type:String,default:""},
    memory:{type:String,default:""},
    CPUTime:{type:String,default:""},
    code: {type:String,default:""},
    lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },
    input: { type: String ,default:''},
    output: { type: String ,default:''},
    language:{type:String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const compiler = mongoose.model("compiler", compilerSchema);
module.exports = compiler;
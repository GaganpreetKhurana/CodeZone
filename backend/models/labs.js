const mongoose = require("mongoose");
const labSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: String },
    input: { type: String },
    output: { type: String },
    description: { type: String},
    language: { type: String },
    maxMarks: {type:String},
    codeEditor: [{type:String}],
}, { timestamps: true });
const Lab = mongoose.model("Lab", labSchema);
module.exports = Lab;
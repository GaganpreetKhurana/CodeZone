const mongoose = require("mongoose");
const codeEditorSchema = new mongoose.Schema({
    content: { type: String },
    code: {type:String},
    lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },
    customInput: { type: String },
    customOutput: { type: String },
    languageSelected:{type:String},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const codeEditor = mongoose.model("codeEditor", codeEditorSchema);
module.exports = codeEditor;
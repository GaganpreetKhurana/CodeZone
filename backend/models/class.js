const mongoose = require("mongoose");
const classSchema = new mongoose.Schema(
  {
    description: { type: String },
    subject: { type: String, required: true, unique: true },
    batch: { type:String, required: true, unique:true},
    code: { type: String, required: true, unique: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Class = mongoose.model("Class", classSchema);
module.exports = Class;

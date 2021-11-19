const mongoose = require("mongoose");

var Announcement = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    class: {
        type: mongoose.Schema.Types.ObjectId, ref: "Class"
    },
    data: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const classSchema = new mongoose.Schema({
    description: { type: String },
    subject: { type: String, required: true },
    batch: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
    labsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lab" }],
    announcements: [{
        type: Announcement
    }]
}, { timestamps: true });

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
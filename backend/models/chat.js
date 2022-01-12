const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
    room: {
        type: String,
    },
    chats: [{
        content: {
            type: String,
            default: ""
        },
        time: {
            type: Date,
            default: Date.now
        },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }],

}, { timestamps: true });


const Chats = mongoose.model("Chats", ChatSchema);
module.exports = Chats;
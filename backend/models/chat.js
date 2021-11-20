const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    room: {
        type: String,
        default: function() {
            return this.sender._id + "--" + this.receiver._id;
        }
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
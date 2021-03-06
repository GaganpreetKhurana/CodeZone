const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
	room: {
		type: String,
	}, chats: [{
		content: {
			type: String, default: "",
		},
		file: {type: Boolean,default: false},
		time: {
			type: Date, default: Date.now
		}, sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		unread: {type: Boolean, default: true},
	}],
}, {timestamps: true});


const Chats = mongoose.model("Chats", ChatSchema);
module.exports = Chats;
const mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
	class: {
		type: mongoose.Schema.Types.ObjectId, ref: "Class"
	},
	question: {type: String,required: true},
	options: [{
		type: String
	}],
	correctOption: [{type: Number, default: 0}],
	questionType: {type: String, default: "single_correct"},
	maxScore: {type: Number, default:0},
	creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question
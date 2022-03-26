const mongoose = require("mongoose");
const Quiz = require("./quiz")
const Question = require("./question")
var SubmissionSchema = new mongoose.Schema({
	quiz: {
		type: mongoose.Schema.Types.ObjectId, ref: "Quiz"
	},
	answers: [{}],
	score: {
		type: Number, default: 0
	},
	student: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission
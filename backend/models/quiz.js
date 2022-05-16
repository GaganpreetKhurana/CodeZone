const mongoose = require("mongoose");

var QuizSchema = new mongoose.Schema({
	class: {
		type: mongoose.Schema.Types.ObjectId, ref: "Class"
	},
	title: {type: String, default: "QUIZ"},
	description: {type: String, default: ""},
	questions: [{
		type: mongoose.Schema.Types.ObjectId, ref: "Question"
	}],
	maxScoreQuiz: {
		type: Number, default: function(){
			total = 0;
			for(let i = 0; i < this.questions.length; i++){
				total += this.questions[i].maxScore;
			}
			return total;
		},
		required: true
	},
	dateScheduled: {
		type: Date, default: Date.now
	},
	duration: {type: Number, default: 3600},
	submissions: [{type: mongoose.Schema.Types.ObjectId, ref: "Submission"}],
	creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	tabSwitches: {},
}, {timestamps: true});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz
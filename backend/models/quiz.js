const mongoose = require("mongoose");

var QuizSchema = new mongoose.Schema({
	class: {
		type: mongoose.Schema.Types.ObjectId, ref: "Class"
	},
	questions: [{
		question: {type: String,required: true},
		options: [{
			type: String
		}],
		correctOption: [{type: Number, default: 0}],
		questionType: {type: String, default: "single_correct"},
		maxScore: {type: Number, default:0},
		studentAnswers: [{
			student: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
			optionSelected: {type: Number, default: - 1},
			marksScored: {type: Number, default: 0},
		}]
	}],
	maxScoreQuiz: {
		type: Number, default: function(){
			total = 0;
			for(let i = 0; i < this.questions.length;i ++)
			{
				total += this.questions[i].maxScore;
			}
			return total;
		},
		required : true
	},
	submissions: [{
		student: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		submittedAt: {type: Date},
		marksScored: {type: Number, default: 0},
		
	}],
	dateScheduled: {
		type: Date, default: Date.now
	},
	creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz
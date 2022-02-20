const mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
	quiz: {
		type: mongoose.Schema.Types.ObjectId, ref: "Quiz"
	},
	answers: [{}],
	score: {
		type: Number, default: function(){
			questions=this.quiz.questions;
			total = 0;
			for(let i = 0; i < questions.length; i++){
				if (this.answers[questions[i]]==questions[i].correctOption[0]){
					total += questions[i].maxScore;
				}
				
			}
			return total;
		}
	},
	student: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question
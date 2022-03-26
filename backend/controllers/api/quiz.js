const Quiz = require("../../models/quiz")
const Question = require("../../models/question")
const Submission = require("../../models/submission")

const Class = require("../../models/class")
const sanitizer = require('sanitizer')
var request = require("request");


// Create Quiz
module.exports.create = async function(req, res){
	
	// console.log(req.body,"EE");
	// get subject
	let subject = await Class.findById(req.body.classroom_id);
	if( !subject){
		return res.status(404).json({
			success: false, message: "Subject not found!",
		});
	}
	
	
	if(subject.teachers.includes(req.user._id)){
		
		// user is teacher for this subject
		
		//create quiz object
		let newQuiz = await Quiz.create({
			creator: req.user._id,
			dateScheduled: req.body.dateScheduled,
			class: subject,
			title: req.body.quizName,
			description: req.body.quizDescription,
			maxScoreQuiz: req.body.maxScore,
			
		})
		// console.log(newQuiz);
		for (let i=0;i<req.body.questionData.length;i++){
			let newQuestion = await Question.create({
				class: subject,
				question: req.body.questionData[i].question,
				creator: req.user._id,
				// maxScore: req.body.questionData[i].maxScore,
				options:req.body.questionData[i].answers,
				correctOption: [req.body.questionData[i].correct],
				questionType: req.body.questionData[i].type,
			})
			// console.log(newQuestion);
			newQuestion = await newQuestion.save();
			newQuiz.questions.push(newQuestion);
		}
		
		
		// if object created
		if(newQuiz){
			newQuiz = await newQuiz.save();
			// console.log(newQuiz)
			subject.quizzes.push(newQuiz);
			subject = await subject.save();
			
			return res.status(201).json({
				message: "Quiz created successfully", success: true, data: newQuiz
			});
		} else{
			return res.status(400).json({
				success: false, message: "Error in creating Quiz!",
			});
		}
		
	} else{
		return res.status(401).json({
			success: false, message: "User is not a teacher in class!",
		});
	}
}

//to delete an quiz
module.exports.delete = async function(req, res){
	
	console.log(req.params.quiz_id);
	// get quiz
	let quiz = await Quiz.findById(sanitizer.escape(req.params.quiz_id));
	if( !quiz){
		return res.status(404).json({
			success: false, message: "Quiz not found!",
		});
	}
	// get subject
	let subject = await Class.findById(quiz.class._id);
	if( !subject){
		return res.status(404).json({
			success: false, message: "Subject not found!",
		});
	}
	
	
	if(subject.teachers.includes(req.user._id)){
		
		// user is a teacher for this subject
		
		subject.quizzes.pop(quiz)
		subject = await subject.save();
		Quiz.findByIdAndDelete(quiz._id).exec();
		
		return res.status(200).json({
			message: "Quiz deleted!", success: true, data: await Class.findById(req.body.classroom_id)
				.select("quizzes")
				.populate({
					path: "quizzes", populate: {
						path: "creator", select: "name",
					}, options: {
						sort: {createdAt: - 1}
					}
				}),
		});
	} else{
		return res.status(401).json({
			success: false, message: "User is not a teacher in this class!",
		});
	}
	
}

//to update an quiz
module.exports.update = async function(req, res){
	
	
	// get quiz
	let quiz = await Quiz.findById(req.body.quiz_id);
	if( !quiz){
		return res.status(404).json({
			success: false, message: "Quiz not found!",
		});
	}
	
	// get subject
	let subject = await Class.findById(quiz.class._id);
	if( !subject){
		return res.status(404).json({
			success: false, message: "Subject not found!",
		});
	}
	
	
	if(subject.teachers.includes(req.user._id) && quiz.creator._id == req.user._id){
		
		// user is a teacher for this subject
		quiz.questions = req.body.questions , quiz.dateScheduled = req.body.dateScheduled, quiz = await quiz.save();
		
		return res.status(200).json({
			message: "Quiz Updated!", success: true, data: await Class.findById(req.body.classroom_id)
				.select("quizzes")
				.populate({
					path: "quizzes", populate: {
						path: "creator", select: "name",
					}, options: {
						sort: {createdAt: - 1}
					}
				}),
		});
	} else{
		if( !subject.teachers.includes(req.user._id)){
			return res.status(401).json({
				success: false, message: "User is not a teacher in this class!",
			});
		}
		return res.status(401).json({
			success: false, message: "User did not create this quiz!",
		});
	}
	
}

// get quiz
module.exports.view = async function(req, res){
	
	// console.log(req.params.quiz_id,"RREEERR");
	// get quiz
	let quiz = await Quiz.findById(sanitizer.escape(req.params.quiz_id));
	if( !quiz){
		// console.log("TTR");
		return res.status(404).json({
			success: false, message: "Quiz not found!",
		});
	}
	// get subject
	let subject = await Class.findById(quiz.class._id);
	if( !subject){
		// console.log("TTX");
		return res.status(404).json({
			success: false, message: "Subject not found!",
		});
	}
	
	if(subject.students.includes(req.user._id)){
		// console.log("TT");
		// user is a student for this subject
		let current_quiz = {};
		current_quiz.class = quiz.class;
		current_quiz.title = quiz.title;
		current_quiz.description = quiz.description;
		current_quiz.maxScoreQuiz = quiz.maxScoreQuiz;
		current_quiz.quizID=req.params.quiz_id;
		
		current_quiz.dateScheduled = quiz.dateScheduled;
		current_quiz.questions = []
		// console.log(quiz,"TTTTWWWT");
		for(let i = 0; i < quiz.questions.length; i++){
			let currentQuestion = {};
			let question = await Question.findById(quiz.questions[i]);
			currentQuestion.question = question.question;
			currentQuestion.answers = question.options;
			currentQuestion.type = question.questionType;
			currentQuestion.questionMarks = question.maxScore;
			currentQuestion.questionNumber = quiz.questions[i];
			currentQuestion.correct = question.correctOption[0];
			// currentQuestion.studentAnswer = null;
			// for(let j = 0;j < question.studentAnswers.length;j++)
			// {
			// 	if(question.studentAnswers[j].student.id == req.user._id){
			// 		currentQuestion.studentAnswer = question.studentAnswers[j];
			// 		break;
			// 	}
			// }
			current_quiz.questions.push((currentQuestion));
		}
		// current_quiz.submission = null;
		// for(let j = 0;	j < quiz.submissions.length;j++)
		// {
		// 	if(quiz.submissions[j].student.id == req.user._id){
		// 		current_quiz.submission = quiz.submissions[j];
		// 		break;
		// 	}
		// }
		// console.log(current_quiz);
		return res.status(200).json({
			message: "Quiz retrival sucessfull!", success: true, data: current_quiz,
		});
	} else if(subject.teachers.includes(req.user._id)){
		// console.log("TTQQ");
		return res.status(200).json({
			message: "Quiz retrieval successfull!", success: true, data: quiz,
		});
	} else{
		// console.log("TTRRR");
		return res.status(401).json({
			success: false, message: "User is not in this class!",
		});
	}
	
}

// update answer
module.exports.updateAnswer = async function(req, res){
	
	// console.log(req.params.quiz_id);
	// get quiz
	let quiz = await Quiz.findById(sanitizer.escape(req.params.quiz_id));
	if( !quiz){
		return res.status(404).json({
			success: false, message: "Quiz not found!",
		});
	}
	
	
	if(subject.students.includes(req.user._id)){
		
		
		for(let i = 0; i < quiz.questions.length; i ++){
			if(i in req.body.answers){
				
				for(let j = 0;j < question.studentAnswers.length;j++)
				{
					if(question.studentAnswers[j].student.id == req.user._id){
						quiz.questions[i].studentAnswers[j].optionSelected = req.body.answers[i];
						break;
					}
				}
			}
		}
		quiz = await quiz.save();
		// console.log(current_quiz);
		request(
			{
				url: "https://127.0.0.1:8000/api/quiz/view::" + sanitizer.escape(req.params.quiz_id),
				method: "GET",
				auth: {
					'bearer': req.headers.authorization,
				}
			},
			async function(error, response, body){
				if(response.statusCode == 200){
					return res.status(200).json({
						message: "Quiz answer update sucessfull!",
						success: true,
						data: body
					});
				} else{
					return res.status(response.statusCode).json({
						message: "Unable to update!",
						success: false
					});
				}
			})
	} else{
		return res.status(401).json({
			success: false, message: "User is not a student in this class!",
		});
	}
	
}

// submit answer
module.exports.submit = async function(req, res){
	
	// console.log(req.params.quiz_id,"WW",req.body.answers,"QQQQQQQCDWWWWWWWWWWWWW");
	// get quiz
	let quiz = await Quiz.findById(sanitizer.escape(req.params.quiz_id));
	if( !quiz){
		return res.status(404).json({
			success: false, message: "Quiz not found!",
		});
	}
	
	// get subject
	let subject = await Class.findById(quiz.class._id);
	if( !subject){
		// console.log("TTX");
		return res.status(404).json({
			success: false, message: "Subject not found!",
		});
	}
	
	if(subject.students.includes(req.user._id)){
		let newSubmission = await Submission.create({
			quiz: quiz,
			answers: req.body.answers,
			class: subject,
		})
		
		total = 0;
		// console.log(newSubmission.answers)
		// console.log(typeof (newSubmission.answers))
		// console.log(newSubmission.answers)
		for(let i = 0; i < quiz.questions.length; i++){
			let currentQuestion = await Question.findById(quiz.questions[i]);
			// console.log(quiz.questions[i],currentQuestion,newSubmission.answers[currentQuestion._id],currentQuestion.correctOption);
			if (newSubmission.answers[currentQuestion._id]==currentQuestion.correctOption[0]){
				total += currentQuestion.maxScore;
			}
		}
		newSubmission.score=total;
		newSubmission = await newSubmission.save();
		quiz.submissions.push(newSubmission);
		
		quiz = await quiz.save();
		// console.log(current_quiz);
		
	} else{
		return res.status(401).json({
			success: false, message: "User is not a student in this class!",
		});
	}
}
	
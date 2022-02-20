const Quiz = require("../../models/quiz")
const Class = require("../../models/class")
const sanitizer = require('sanitizer')
var request = require("request");


module.exports.create = async function(req, res){
	console.log(req.body, "RR");
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
			creator: req.user._id, questions: req.body.questions, dateScheduled: req.body.dateScheduled, class: subject,
		})
		
		
		// if object created
		if(newQuiz){
			newQuiz = await newQuiz.save();
			subject.quizzes.push(newQuiz);
			subject = await subject.save();
			
			return res.status(201).json({
				message: "Quiz created successfully", success: true, data: await Class.findById(req.body.classroom_id)
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
	
	
	if(subject.students.includes(req.user._id)){
		
		// user is a student for this subject
		let current_quiz = {};
		current_quiz.class = quiz.class;
		current_quiz.dateScheduled = quiz.dateScheduled;
		current_quiz.questions = []
		for(let i = 0; i < quiz.questions.length; i ++){
			let currentQuestion = {};
			let question = quiz.questions[i];
			currentQuestion.question = question.question;
			currentQuestion.options = question.options;
			currentQuestion.questionType = question.questionType;
			currentQuestion.maxScore = question.maxScore;
			currentQuestion.studentAnswer = null;
			for(let j = 0;j < question.studentAnswers.length;j++)
			{
				if(question.studentAnswers[j].student.id == req.user._id){
					currentQuestion.studentAnswer = question.studentAnswers[j];
					break;
				}
			}
			current_quiz.questions.push((currentQuestion));
		}
		current_quiz.submission = null;
		for(let j = 0;	j < quiz.submissions.length;j++)
		{
			if(quiz.submissions[j].student.id == req.user._id){
				current_quiz.submission = quiz.submissions[j];
				break;
			}
		}
		console.log(current_quiz);
		return res.status(200).json({
			message: "Quiz retrival sucessfull!", success: true, data: current_quiz,
		});
	} else if(subject.teachers.includes(req.user._id)){
		return res.status(200).json({
			message: "Quiz retrieval successfull!", success: true, data: quiz,
		});
	} else{
		return res.status(401).json({
			success: false, message: "User is not in this class!",
		});
	}
	
}

// update answer
module.exports.updateAnswer = async function(req, res){
	
	console.log(req.params.quiz_id);
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
		console.log(current_quiz);
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
	
	console.log(req.params.quiz_id);
	// get quiz
	let quiz = await Quiz.findById(sanitizer.escape(req.params.quiz_id));
	if( !quiz){
		return res.status(404).json({
			success: false, message: "Quiz not found!",
		});
	}
	
	
	if(subject.students.includes(req.user._id)){
		marksScored = 0
		for(let i = 0; i < quiz.questions.length; i ++){
			for(let j = 0; j < quiz.questions[i].studentAnswers.length; j ++){
				if(quiz.questions[i].studentAnswers[j].student.id == req.user._id){
					if(quiz.questions[i].studentAnswers[j].optionSelected == quiz.questions[i].optionSelected){
					}
				}
			}
			
		}
		quiz = await quiz.save();
		console.log(current_quiz);
		
	} else{
		return res.status(401).json({
			success: false, message: "User is not a student in this class!",
		});
	}
}
	
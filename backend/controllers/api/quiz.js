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
		current_quiz.duration = quiz.duration;
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


module.exports.fetchAll = async function(req, res){
	let quizList = await Quiz.find({ class: sanitizer.escape(req.params.classroom_id)});
	return res.status(200).json({
		message: "All Open Quizzes",
		data: quizList,
		success: true,
	})
}

module.exports.fetchStudentResult = async function(req, res){
	
	let subject = await Class.findById(sanitizer.escape(req.params.classroom_id))
	if(!subject){
		return res.status(404).json({
			message: "Subject Not Found",
			data: null,
			success: false,
		})
	}
	if(!subject.students.includes ( req.user._id )){
		return res.status(403).json({
			message: "Not a student in this class",
			data: null,
			success: false,
		})
	}
	let quizList = await Quiz.find({ class: sanitizer.escape(req.params.classroom_id)});
	
	if (!quizList){
		console.log("EE");
		return res.status(200).json({
			message: "No Quiz Found",
			data: null,
			success: true,
		})
	}
	let studentResult = []
	for(let index=0; index<quizList.length;index++){
		let submission = await Submission.findOne({quiz: quizList[index]._id, student: req.user._id})
		let resultObject = {
			quizID :quizList[index]._id,
			quizName : quizList[index].title,
			quizDescription : quizList[index].description,
			maximumScore : quizList[index].maxScoreQuiz,
			dateScheduled : quizList[index].dateScheduled,
			score : null,
			submissionID :null,
			totalQuestions : quizList[index].questions?quizList[index].questions.length:0,
		}
		if (submission){
			resultObject.score = submission.score
			resultObject.submissionID = submission._id
		}
		studentResult.push(resultObject);
		
	}
	return res.status(200).json({
		message: "Results of the student",
		data: studentResult,
		success: true,
	})
	
}

module.exports.fetchClassResult = async function(req, res){
	let quiz = await Quiz.findById(sanitizer.escape(req.params.quiz_id));
	if(!quiz){
		return res.status(404).json({
			message: "Quiz Not Found",
			data: null,
			success: false,
		})
	}
	let subject = await Class.findById(quiz.class)
	if(!subject){
		return res.status(404).json({
			message: "Subject Not Found",
			data: null,
			success: false,
		})
	}
	if(!classroom.teachers.includes ( req.user._id )){
		return res.status(403).json({
			message: "Not a teacher in this class",
			data: null,
			success: false,
		})
	}
	
	let result = {
		quizID :quiz._id,
		quizName : quiz.title,
		quizDescription : quiz.dexcription,
		maximumScore : quiz.maxScoreQuiz,
		totalQuestions : quiz.questions.length,
		dateScheduled : quiz.date,
		studentSubmissions : {}
	}
	for(let index=0; index<subject.students.length;index++){
		let submission = await Submission.find({quiz: quiz._id,student: subject.students[index]})
		result.studentSubmissions[subject.students[index]]=0
		if(submission){
			result.studentSubmissions[subject.students[index]]=submission.score
		}
	}
	return res.status(200).json({
		message: "Results of the students",
		data: result,
		success: true,
	})
	
}


module.exports.fetchSubmission = async function(req, res){
	console.log(req.params.submission_id,"FETCH SUBMISSION");
	let submission = await Submission.findById(sanitizer.escape(req.params.submission_id))
	if(!submission){
		return res.status(404).json({
			message: "Submission Not Found",
			data: null,
			success: false,
		})
	}
	if(submission.student !=  req.user._id ){
		return res.status(403).json({
			message: "Not authorized to view submission",
			data: null,
			success: false,
		})
	}
	let quiz = await Quiz.findById(submission.quiz);
	
	
	let studentQuizSubmission = []
	for(let index=0; index<quiz.questions.length;index++){
		let question = await Question.findById(quiz.questions[index])
		let submissionObject = {
			quizID: submission.quiz,
			submissionID : submission._id,
			questionID :quiz.questions[index],
			question : question.question,
			options : question.options,
			optionMarked : submission.answers[quiz.questions[index]],
			correctOption : question.correctOption,
			score: submission.score,
			maxScore : question.maxScore,
		}
		studentQuizSubmission.push(submissionObject);
		
	}
	console.log(studentQuizSubmission,"EEEERV");
	return res.status(200).json({
		message: "Submission of the student",
		data: studentQuizSubmission,
		success: true,
	})
	
}
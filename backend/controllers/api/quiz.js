const Quiz =require("../../models/quiz")
const Class =require("../../models/class")
const sanitizer = require ( 'sanitizer' )


module.exports.create = async function ( req , res ) {
	console.log ( req.body,"RR" );
	// get subject
	let subject = await Class.findById ( req.body.classroom_id );
	if ( !subject ) {
		return res.status ( 404 ).json ( {
			success : false ,
			message : "Subject not found!" ,
		} );
	}
	
	
	if ( subject.teachers.includes ( req.user._id ) ) {
		
		// user is teacher for this subject
		
		//create quiz object
		let newQuiz = await Quiz.create ( {
			creator : req.user._id ,
			questions : req.body.questions ,
			dateScheduled: req.body.dateScheduled,
			class : subject ,
		} )
		
		
		// if object created
		if ( newQuiz ) {
			newQuiz = await newQuiz.save ();
			subject.quizzes.push ( newQuiz );
			subject = await subject.save ();
			
			return res.status ( 201 ).json ( {
				message : "Quiz created successfully" ,
				success : true ,
				data : await Class.findById (
						req.body.classroom_id )
					.select ( "quizzes" )
					.populate ( {
						path : "quizzes" ,
						populate : {
							path : "creator" ,
							select : "name" ,
						} ,
						options : {
							sort : { createdAt : - 1 }
						}
					} ) ,
			} );
		} else {
			return res.status ( 400 ).json ( {
				success : false ,
				message : "Error in creating Quiz!" ,
			} );
		}
		
	} else {
		return res.status ( 401 ).json ( {
			success : false ,
			message : "User is not a teacher in class!" ,
		} );
	}
}

//to delete an quiz
module.exports.delete = async function ( req , res ) {
	
	console.log ( req.params.quiz_id );
	// get quiz
	let quiz = await Quiz.findById ( sanitizer.escape ( req.params.quiz_id ) );
	if ( !quiz ) {
		return res.status ( 404 ).json ( {
			success : false ,
			message : "Quiz not found!" ,
		} );
	}
	// get subject
	let subject = await Class.findById ( quiz.class._id );
	if ( !subject ) {
		return res.status ( 404 ).json ( {
			success : false ,
			message : "Subject not found!" ,
		} );
	}
	
	
	if ( subject.teachers.includes ( req.user._id ) ) {
		
		// user is a teacher for this subject
		
		subject.quizzes.pop ( quiz )
		subject = await subject.save ();
		Quiz.findByIdAndDelete ( quiz._id ).exec ();
		
		return res.status ( 200 ).json ( {
			message : "Quiz deleted!" ,
			success : true ,
			data : await Class.findById (
					req.body.classroom_id )
				.select ( "quizzes" )
				.populate ( {
					path : "quizzes" ,
					populate : {
						path : "creator" ,
						select : "name" ,
					} ,
					options : {
						sort : { createdAt : - 1 }
					}
				} ) ,
		} );
	} else {
		return res.status ( 401 ).json ( {
			success : false ,
			message : "User is not a teacher in this class!" ,
		} );
	}
	
}

//to update an quiz
module.exports.update = async function ( req , res ) {
	
	
	// get quiz
	let quiz = await Quiz.findById ( req.body.quiz_id );
	if ( !quiz ) {
		return res.status ( 404 ).json ( {
			success : false ,
			message : "Quiz not found!" ,
		} );
	}
	
	// get subject
	let subject = await Class.findById ( quiz.class._id );
	if ( !subject ) {
		return res.status ( 404 ).json ( {
			success : false ,
			message : "Subject not found!" ,
		} );
	}
	
	
	if ( subject.teachers.includes ( req.user._id ) && quiz.creator._id == req.user._id ) {
		
		// user is a teacher for this subject
		quiz.questions = req.body.questions ,
		quiz.dateScheduled = req.body.dateScheduled,
		quiz = await quiz.save ();
		
		return res.status ( 200 ).json ( {
			message : "Quiz Updated!" ,
			success : true ,
			data : await Class.findById (
					req.body.classroom_id )
				.select ( "quizzes" )
				.populate ( {
					path : "quizzes" ,
					populate : {
						path : "creator" ,
						select : "name" ,
					} ,
					options : {
						sort : { createdAt : - 1 }
					}
				} ) ,
		} );
	} else {
		if ( !subject.teachers.includes ( req.user._id ) ) {
			return res.status ( 401 ).json ( {
				success : false ,
				message : "User is not a teacher in this class!" ,
			} );
		}
		return res.status ( 401 ).json ( {
			success : false ,
			message : "User did not create this quiz!" ,
		} );
	}
	
}
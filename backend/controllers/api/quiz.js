const Quiz =require("../../models/quiz")
const Class =require("../../models/class")

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
		
		//create announcement object
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
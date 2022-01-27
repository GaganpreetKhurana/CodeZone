const Classes = require ( "../../models/class" );
const User = require ( "../../models/user" );
const Chats = require ( "../../models/chat" );
const sanitizer = require ( "sanitizer" );

//to generate unique code for classroom
async function createClassCode () {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for ( var i = 0 ; i < 7 ; i ++ ) {
        result += characters.charAt ( Math.floor ( Math.random () * charactersLength ) );
    }
    return result;
}

//to create a new classroom
module.exports.create = async function ( req , res ) {
    let codeGenerated = false ,
        code;
    while ( !codeGenerated ) {
        //generate code first of length 7
        code = await createClassCode ();
        //check that code should not exist for existing classroom
        let classExist = await Classes.findOne ( { code : code } );
        if ( classExist ) {
            //generate code again
            codeGenerated = false;
        } else {
            codeGenerated = true;
        }
    }
    let classExistWithSameSubjectName = await Classes.findOne ( {
        subject : req.body.subject ,
    } );
    if ( classExistWithSameSubjectName ) {
        return res.status ( 422 ).json ( {
            message :
                "Classroom with same subject name already exists plz change subject name and try again!!" ,
        } );
    }
    //find user by id and check role of user should be 'Teacher' only then create the classroom
    //else give error back not authorized to create classroom
    let user = await User.findById ( req.user._id );
    if ( user.role === "Student" ) {
        return res.json ( 422 , {
            message : "Not Authorized to create classroom" ,
        } );
    } else {
        //if user is found then create classroom and in classesCreated add this class _id in it
        let classroom = await Classes.create ( {
            subject : req.body.subject ,
            description : req.body.description ,
            batch : req.body.batch ,
            creator : req.user._id ,
            code : code ,
        } );
        if ( classroom ) {
            //add this user in teachers array of that class as well
            classroom.teachers.push ( req.user._id );
            classroom.save ();
            
            user.classesCreated.push ( classroom );
            user.save ();
            return res.status ( 200 ).json ( {
                message : "Classroom created successfully" ,
                success : true ,
                data : {
                    code : code ,
                } ,
            } );
        } else {
            return res.status ( 422 ).json ( {
                message : "Error in creating classroom" ,
            } );
        }
    }
};

//to join an existing classroom using the code provided
module.exports.join = async function ( req , res ) {
    let classCode = req.body.code;
    let user_id = req.user._id;
    //find user
    let user = await User.findById ( user_id );
    //find class
    if ( !classCode ) {
        return res.status ( 422 ).json ( {
            message : "Please enter valid class Code to join!!" ,
        } );
    }
    let classroom = await Classes.findOne ( { code : classCode } );
    
    if ( user && classroom ) {
        //check if user has already joined it or not
        //add user._id in students[] present in found class
        
        //add class._id in user's classesJoined array
        if ( user.role === "Teacher" ) {
            if ( classroom.teachers.includes ( user_id ) ) {
                return res.status ( 422 ).json ( {
                    message : "Classroom already joined" ,
                } );
            }
            classroom.teachers.push ( user_id );
            classroom.save ();
            user.classesJoined.push ( classroom._id );
            user.save ();
        } else {
            if ( classroom.students.includes ( user_id ) ) {
                return res.status ( 422 ).json ( {
                    message : "Classroom already joined" ,
                } );
            }
            classroom.students.push ( user_id );
            classroom.save ();
            user.classesJoined.push ( classroom._id );
            user.save ();
        }
        return res.status ( 200 ).json ( {
            message : "Classroom joined successfully" ,
            success : true ,
        } );
    }
    return res.status ( 422 ).json ( {
        message : "Error in joining classroom" ,
    } );
};

//to get user class details
module.exports.details = async function ( req , res ) {
    let user_id = req.user._id;
    let userDetails = await User.findById ( user_id )
        .select ( "classesCreated classesJoined" )
        .populate (
            "classesJoined" ,
            "batch code creator description students teachers subject"
        )
        .populate ( {
            path : "classesJoined" ,
            populate : {
                path : "creator students teachers" ,
                select : "SID name email role" ,
            } ,
        } )
        .populate (
            "classesCreated" ,
            "batch code creator description students teachers subject"
        )
        .populate ( {
            path : "classesCreated" ,
            populate : {
                path : "creator students teachers" ,
                select : "SID name email role" ,
            } ,
        } )
        .exec ();
    if ( userDetails ) {
        return res.status ( 200 ).json ( {
            message : "Classroom joined successfully" ,
            data : userDetails ,
            success : true ,
        } );
    } else {
        return res.status ( 422 ).json ( {
            message : "User Details not fetched" ,
            success : false ,
        } );
    }
};

// To get discussion forum
module.exports.dashboard = async function ( req , res ) {
    let user_id = req.user._id;
    
    // get subject
    let subject = await Classes.findById (
        sanitizer.escape ( req.params.classroom_id )
    );
    
    if ( !subject ) {
        return res.status ( 404 ).json ( {
            message : "Subject not found!" ,
        } );
    }
    
    if (
        subject.students.includes ( user_id ) ||
        subject.teachers.includes ( req.user._id )
    ) {
        return res.status ( 200 ).json ( {
            success : true ,
            data : await Classes.findById ( sanitizer.escape ( req.params.classroom_id ) )
                .select ( "teachers students posts announcements code ClassMeetLink" )
                .populate ( "teachers students" , "name SID id email" )
                .populate ( "posts" , "content updatedAt user comments likes" )
                .populate ( {
                    path : "posts" ,
                    populate : {
                        path : "user" ,
                        select : "name role" ,
                    } ,
                } )
                .populate ( {
                    path : "posts" ,
                    populate : {
                        path : "comments" ,
                        select : "content updatedAt user" ,
                    } ,
                } )
                .populate ( {
                    path : "posts" ,
                    populate : {
                        path : "likes" ,
                        select : "user" ,
                    } ,
                } )
                .populate ( {
                    path : "posts" ,
                    populate : {
                        path : "comments" ,
                        populate : {
                            path : "user" ,
                            select : "name role" ,
                        } ,
                    } ,
                } )
                .populate ( {
                    path : "announcements" ,
                    populate : {
                        path : "creator" ,
                        select : "name" ,
                    } ,
                    select : "content createdAt creator" ,
                    options : {
                        sort : { createdAt : - 1 } ,
                    } ,
                } )
                .populate ( {
                    path : "posts" ,
                    populate : {
                        path : "comments" ,
                        populate : {
                            path : "likes" ,
                            select : "users" ,
                        } ,
                        options : {
                            sort : { createdAt : - 1 } ,
                        } ,
                    } ,
                    options : {
                        sort : { createdAt : - 1 } ,
                    } ,
                } ) ,
        } );
    } else {
        return res.status ( 401 ).json ( {
            success : false ,
            message : "Student not enrolled in this class!" ,
        } );
    }
};

//to update Class Meet Link
module.exports.link = async function ( req , res ) {
    // get subject
    let subject = await Classes.findById ( req.body.classroom_id );
    if ( !subject ) {
        return res.status ( 404 ).json ( {
            message : "Subject not found!" ,
        } );
    }
    
    if ( subject.teachers.includes ( req.user._id ) ) {
        // user is a teacher for this subject
        subject.ClassMeetLink = req.body.content;
        subject.save ();
        
        return res.status ( 200 ).json ( {
            message : "Meet Link Updated!" ,
            success : true ,
        } );
    } else {
        return res.status ( 401 ).json ( {
            message : "User is not a teacher in this class!" ,
        } );
    }
};

//to get previous chats
module.exports.previousChats = async function ( req , res ) {
    console.log ( "request came" );
    let room = await Chats.findOne ( { room : sanitizer.escape ( req.params.room ) } );
    // console.log ( room );
    
    if ( !room ) {
        return res.status ( 404 ).json ( {
            message : "Room Code not found!" ,
        } );
    }
    
    if ( room ) {
        return res.status ( 200 ).json ( {
            success : true ,
            data : room.chats ,
        } );
    } else {
        return res.status ( 401 ).json ( {
            success : false ,
            message : "Student not enrolled in this class!" ,
        } );
    }
};

module.exports.unreadMessageCount = async function ( req , res ) {
    // console.log ( "Unread" );
    var classroomId = req.params.classroomId;
    let classroom = await Classes.findById ( classroomId );
    // console.log(classroomId);
    if ( classroom ) {
        // console.log(classroomId)
        let unreadCount = {};
        for ( let i = 0 ; i < classroom.students.length ; i ++ ) {
            if ( classroom.students[ i ]._id != req.user._id ) {
                unreadCount[ classroom.students[ i ]._id ] = 0;
            }
        }
        for ( let i = 0 ; i < classroom.teachers.length ; i ++ ) {
            if ( classroom.teachers[ i ]._id != req.user._id ) {
                unreadCount[ classroom.teachers[ i ]._id ] = 0;
            }
        }
        
        
        var regex = RegExp ( ".*" + classroomId + ".*" + req.user._id + ".*" );
        var rooms = await Chats.find ( { room : regex } );
        // console.log(rooms.length);
        for ( let i = 0 ; i < rooms.length ; i ++ ) {
            let room_name = rooms[ i ].room;
            let receiver = room_name.split ( "--" );
            // console.log(req.user._id)
            if ( receiver[ 1 ] == req.user._id ) {
                receiver = receiver[ 2 ];
            } else {
                receiver = receiver[ 1 ];
            }
            // console.log(room_name,receiver);
            for ( let j = rooms[ i ].chats.length - 1 ; j > - 1 ; j -- ) {
                let currentChat = rooms[ i ].chats[ j ]
                if ( currentChat.sender._id == receiver && currentChat.unread ) {
                    unreadCount[ receiver ] = unreadCount[ receiver ] + 1;
                } else if ( currentChat.sender._id == receiver && !currentChat.unread ) {
                    break;
                }
            }
            
            
        }
        console.log(unreadCount,"XX")
        return res.status ( 200 ).json ( {
            success : true ,
            data : unreadCount ,
        } );
        
    } else {
        return res.status ( 401 ).json ( {
            success : false ,
            message : "Error!" ,
        } );
        
        
    }
}
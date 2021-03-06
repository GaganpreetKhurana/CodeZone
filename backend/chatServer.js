const mongoose = require ( "mongoose" );
const Chats = require ( "./models/chat" );
const User = require ( "./models/user" );
const Classroom = require ( "./models/class" );
mongoose.connect ( "mongodb://localhost/codezone" );

const io = require ( "socket.io" ) ( 3002 , {
    cors : {
        origin : "http://localhost:3000" ,
        methods : [ "GET" , "POST" ] ,
    } ,
} );

io.on ( "connection" , async ( socket ) => {
    console.log ( "Connection Made: " , socket.id );
    var handshake_data = socket.request;
    sender_id = handshake_data._query[ "sender_id" ];
    receiver_id = handshake_data._query[ "receiver_id" ];
    classroom_id = handshake_data._query[ "classroomId" ];
    // console.log(classroom_id)
    // console.log(sender_id, receiver_id, classroom_id);
    
    if ( receiver_id && sender_id && classroom_id ) {
        var sender = await User.findById ( sender_id );
        var receiver = await User.findById ( receiver_id );
        var classroom = await Classroom.findById ( classroom_id );
        var room = null;
        // console.log(sender,receiver,classroom,room,"GGGG");
        if ( sender && receiver && classroom ) {
            // console.log(sender,receiver,classroom,room,"VVVV");
            var room_name = null;
            if ( sender_id > receiver_id ) {
                room_name = classroom_id + "--" + receiver_id + "--" + sender_id;
            } else {
                room_name = classroom_id + "--" + sender_id + "--" + receiver_id;
            }
            // console.log(sender,receiver,classroom,room);
            if ( room_name ) {
                room = await Chats.findOne ( { room : room_name } );
                if ( !room ) {
                    room = await Chats.create ( { room : room_name } );
                }
                //joined socket with that room name
                socket.join ( room_name );
                socket.on ( "ReadAll" , async ( sender_id ) => {
                    room = await Chats.findOne ( { room : room_name } );
                    // console.log("Reading",sender_id,room.chats.length);
                    let count = 0;
                    for ( let counter = 0 ; counter < room.chats.length ; counter ++ ) {
                        let chat = room.chats[ counter ];
                        // if (chat.unread) {
                        //     console.log ( chat.unread , chat.sender._id.toString() , sender_id , chat.sender._id.toString() != sender_id);
                        // }
                        if ( chat.sender._id.toString() != sender_id && chat.unread ) {
                            
                            chat.unread = false;
                            count += 1;
                        }
                    }
                    // console.log(count)
                    if ( count > 0 ) {
                        // console.log ( count );
                        room = await room.save ();
                        // console.log("READD")
                    }
                    let room2 = await Chats.findOne ( { room : room_name } );
                    socket.in ( room_name ).emit ( "ReceiveChat" , room2.chats );
                } );
                socket.on ( "SendChat" , async ( sender_id , message, imageType= false ) => {
                    var sender = await User.findById ( sender_id );
                    if ( sender ) {
                        room.chats.push ( { sender : sender , content : message, file: imageType } );
                        room = await room.save ();
                        let room2 = await Chats.findOne ( { room : room_name } );
                        socket.in ( room_name ).emit ( "ReceiveChat" , room2.chats );
                    }
                } );
                // when the user disconnects.. perform this
                socket.on ( "disconnect" , async () => {
                    socket.leave ( room.room );
                } );
            }
        }
    }
} );

const express = require ( "express" );
const express_server = express ();
const http = require ( "http" );
const chat_server = http.createServer ( express_server );
chat_server.listen ( 8001 , function ( err ) {
    if ( err ) {
        console.log ( "Error in running chat server" );
    } else {
        console.log ( "Chat Server running successfully" );
    }
} );

const io = require ( 'socket.io' ) ( chat_server );
const Chats = require ( "../../models/chat" );
const User = require ( "../../models/user" );
const sanitizer = require ( 'sanitizer' );
const router = express.Router ();

const auth = require ( "../../config/authenticate" );

router.get ( "/chats/:sender_id/:receiver_id" , auth.authenticateToken , () => {
    
    //for chatting
    module.exports.chat = async function ( req , res ) {
        console.log ( "HELLO" );
        var sender = await User.findById ( sanitizer.escape ( req.params.sender_id ) );
        if ( !sender ) {
            return res.status ( 404 ).json ( {
                success : false ,
                message : "Sender not found!" ,
            } );
        }
        var receiver = await User.findById ( sanitizer.escape ( req.params.receiver_id ) );
        if ( !receiver ) {
            return res.status ( 404 ).json ( {
                success : false ,
                message : "Receiver not found!" ,
            } );
        }
        var room_name = sanitizer.escape ( req.params.sender_id ) + "--" + sanitizer.escape ( req.params.receiver_id );
        var room = await Chats.find ( {
            room : room_name ,
        } )
        if ( !room ) {
            room_name = sanitizer.escape ( req.params.receiver_id ) + "--" + sanitizer.escape ( req.params.sender_id );
            room = await Chats.find ( {
                room : room_name ,
            } )
            
            if ( !room ) {
                room = await Chats.create ( {
                    sender : sender ,
                    receiver : receiver
                } )
            }
        }
        
        
        io.sockets.on ( 'connection' , function ( socket , sender_id ) {
            var name = sender.name;
            var message_sender = sender;
            if ( sender._id != sender_id ) {
                name = receiver.name;
                message_sender = receiver;
            }
            io.sockets.in ( room.room ).emit ( 'UpdateChat' , 'SERVER' , name + ' has joined this room' );
            socket.join ( room.room );
            socket.to ( socket.id ).emit ( 'UpdateChat' , 'SERVER' , 'You have joined the room for ' + sender.name + "and" + receiver.name );
            room.chats.push ( { sender : message_sender , content : name + ' has joined this room' } );
            
            socket.on ( 'SendChat' , function ( message , sender_id ) {
                var name = sender.name;
                var message_sender = sender;
                if ( sender._id != sender_id ) {
                    name = receiver.name;
                    message_sender = receiver;
                }
                io.sockets.in ( socket.room ).emit ( 'UpdateChat' , name , message );
                room.chats.push ( { sender : message_sender , content : message } );
            } );
            
            // socket.on('switchRoom', function(sender_id, receiver_id) {
            //     // leave the current room (stored in session)
            //     socket.leave(socket.room);
            //     // join new room, received as function parameter
            //     socket.join(newroom);
            //     socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
            //     // sent message to OLD room
            //     socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
            //     // update socket session room title
            //     socket.room = newroom;
            //     socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
            //     socket.emit('updaterooms', rooms, newroom);
            // });
            
            // when the user disconnects.. perform this
            socket.on ( 'disconnect' , function ( name ) {
                
                socket.leave ( room.room );
                io.sockets.in ( room.room ).emit ( 'UpdateChat' , 'SERVER' , name + ' has left this room' );
                socket.to ( socket.id ).emit ( 'UpdateChat' , 'SERVER' , 'You have left the room for ' + sender.name + "and" + receiver.name );
                room.chats.push ( { sender : message_sender , content : name + ' has left this room' } );
            } );
        } );
        
        
    }
} );
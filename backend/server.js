const mongoose = require('mongoose')
const codeEditor = require("./models/codeEditor")
//to connect to mongoDB
mongoose.connect("mongodb://localhost/codezone");

const io = require('socket.io')(3001,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    },
})

//everytime a client connects it will give us back a socket which we will use to communicate back to client
io.on("connection",socket => {
    //to listen to request from client
    
    socket.on('get-document', async documentId =>{
        //we send the data back
        const document = await codeEditor.findOne({ code: documentId });
        //we create a room for only this document
        socket.join(documentId)
        console.log(documentId);
        socket.emit("load-document",document.content)
        socket.on('send-changes',delta => {
            //console.log(delta)
            //to send the changes to all other users in that room with same documentId except us who have the document opened we  use socket.broadcast
            socket.broadcast.to(documentId).emit("receive-changes",delta)
        })

        //to save the document
        socket.on("save-document", async data => {
            let document1 = await codeEditor.findOne({ code: documentId });
            
            console.log("document1",document1);
            if(document1)
            {
                document1.content = data;
                document1.save();
            }
            
          })
    })

})

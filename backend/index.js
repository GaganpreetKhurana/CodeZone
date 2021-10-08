const express = require('express');
const port = 8000;
const app =express();
app.get('/',function(req,res){
    return res.send("Welcome to Backend of CodeZone");
});

app.listen(port,function(err){
    if(err){
        console.log("Error in running server");
    }
    else{
        console.log("Server running successfully");
    }
})

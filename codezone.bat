@echo off
title CODEZONE
echo Starting MongoDB
net start MongoDB
echo Starting Servers
cd frontend
echo Starting Frontend Server
start npm start
cd ..
cd backend
echo Starting Editor Server
start nodemon server.js
echo Starting Chat Server
start nodemon chatServer.js
echo Starting Video Server
start nodemon videoServer.js
echo Starting Backend Server
nodemon index.js
pause
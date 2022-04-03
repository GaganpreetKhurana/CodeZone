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
echo Starting Backend Server
start nodemon index.js
echo Starting Editor Server
start nodemon server.js
echo Starting Chat Server
start nodemon chatServer.js
echo Starting Video Server
nodemon videoServer.js
pause
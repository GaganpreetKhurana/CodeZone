REM @echo off
title CODEZONE
echo Installing Frontend requirements
cd frontend
npm install
npm audit fix
echo Frontend Requirements Installed
cd ..
cd backend
echo Installing Backend Requirements
npm install
npm audit fix
echo Backend Requirements Installed
pause
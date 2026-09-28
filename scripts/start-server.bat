@echo off
title Portfolio Server - Cao Ngoc Minh
cd /d "%~dp0\.."

echo =========================================================
echo       KHOI DONG SECURE SERVER PORTFOLIO
echo =========================================================
echo.
echo URL: http://localhost:3000
start "" "http://localhost:3000"
node server.js
pause

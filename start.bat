@echo off
title Portfolio Server
echo Dang khoi dong server portfolio...
start "" "http://localhost:3000"
where bun >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    bun server.js
) else (
    node server.js
)
pause

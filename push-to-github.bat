@echo off
title Day Code Len GitHub - Cao Ngoc Minh Portfolio
cd /d "%~dp0"

:: Them duong dan Git vao PATH
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

echo =========================================================
echo       CHUONG TRINH TU DONG DAY CODE LEN GITHUB
echo =========================================================
echo.

echo [1/3] Kiem tra xac thuc GitHub...
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo Ban chua dang nhap GitHub tren may nay.
    echo He thong se tu dong mo trinh duyet, ban chi can bam xac nhan (Authorize)...
    echo.
    gh auth login --web -p https
)

echo.
echo [2/3] Cau hinh Git Credentials...
gh auth setup-git

echo.
echo [3/3] Dang day code len repository: https://github.com/mpc280702/MP ...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo =========================================================
    echo   [THANH CONG] Toan bo code da duoc day len GitHub!
    echo   Xem tai: https://github.com/mpc280702/MP
    echo =========================================================
) else (
    echo =========================================================
    echo   [CHU Y] Neu chua day duoc, hay thu chay lai file nay.
    echo =========================================================
)

echo.
echo Nhan phim bat ky de dong cua so nay...
pause >nul

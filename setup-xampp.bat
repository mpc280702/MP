@echo off
chcp 65001 > NUL
title Ket Noi XAMPP - Cao Ngoc Minh Portfolio

echo.
echo =========================================================
echo       TU DONG TAO LIEN KET XAMPP HTDOCS
echo =========================================================
echo.

set "TARGET_DIR=%~dp0"
if "%TARGET_DIR:~-1%"=="\" set "TARGET_DIR=%TARGET_DIR:~0,-1%"

set "XAMPP_HTDOCS="

:: Auto-detect XAMPP htdocs locations
if exist "E:\MP\XAMPP MP\htdocs" set "XAMPP_HTDOCS=E:\MP\XAMPP MP\htdocs"
if "%XAMPP_HTDOCS%"=="" if exist "C:\xampp\htdocs" set "XAMPP_HTDOCS=C:\xampp\htdocs"
if "%XAMPP_HTDOCS%"=="" if exist "D:\xampp\htdocs" set "XAMPP_HTDOCS=D:\xampp\htdocs"
if "%XAMPP_HTDOCS%"=="" if exist "E:\xampp\htdocs" set "XAMPP_HTDOCS=E:\xampp\htdocs"

set "LINK_NAME=mp-portfolio"

if "%XAMPP_HTDOCS%"=="" (
    echo [!] THONG BAO: Chua tim thay thu muc htdocs cua XAMPP.
    echo [!] Vui long kiem tra lai thu muc cai dat XAMPP.
    echo.
    goto END
)

set "FULL_LINK=%XAMPP_HTDOCS%\%LINK_NAME%"

echo [+] Da tim thay XAMPP tai: %XAMPP_HTDOCS%

if exist "%FULL_LINK%" (
    echo [+] Thu muc lien ket da ton tai tai: %FULL_LINK%
) else (
    echo [*] Dang tao Directory Junction tu "%TARGET_DIR%" sang "%FULL_LINK%"...
    mklink /J "%FULL_LINK%" "%TARGET_DIR%"
)

echo.
echo =========================================================
echo  [SUCCESS] DA KET NOI THANH CONG VOI XAMPP!
echo =========================================================
echo  1. Mo XAMPP Control Panel va nhan Start Apache.
echo  2. Truy cap dia chi: http://localhost/mp-portfolio/
echo =========================================================
echo.

:END
pause

@echo off
echo ======================================
echo   DEPLOY UPDATES TO LIVE WEBSITE
echo ======================================
echo.

git add .
echo [1/3] Changes staged...

set /p message="Enter what you changed (e.g., Added new Ferrari): "
git commit -m "%message%"
echo [2/3] Changes committed...

git push
echo [3/3] Pushing to GitHub...
echo.
echo ======================================
echo Done! Your website will update in 2-3 minutes at:
echo https://rental-super-car.vercel.app/
echo ======================================
pause

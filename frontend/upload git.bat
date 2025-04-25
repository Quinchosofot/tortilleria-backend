@echo off
echo ====== Subiendo cambios a GitHub ======
set /p COMENTARIO=Escribe el mensaje de commit: 
git add .
git commit -m "%COMENTARIO%"
git push
echo ====== Listo. Cambios subidos a GitHub. ======
pause

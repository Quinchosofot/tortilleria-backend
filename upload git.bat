@echo off
echo ====== Subiendo cambios a GitHub ======
git add .
git commit -m "Soporte para Alexa HTTPS"
git push
echo ====== Listo. Cambios subidos a GitHub. ======
pause
@echo off
echo ====== Subiendo cambios a GitHub ======
git add .
git commit -m "Actualización automática: cambios recientes"
git push
echo ====== Listo. Cambios subidos a GitHub. ======
pause
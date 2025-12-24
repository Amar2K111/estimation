@echo off
cd /d "%~dp0"
echo Ajout des fichiers...
git add .
echo.
echo Creation du commit...
git commit -m "Amélioration page estimation: pièces standard, navigation non bloquante, préremplissage automatique"
echo.
echo Envoi vers GitHub...
git push
echo.
echo Termine!
pause


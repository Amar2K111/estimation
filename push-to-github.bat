@echo off
cd /d "%~dp0"
echo Initialisation Git...
git init
echo Ajout des fichiers...
git add .
echo Commit...
git commit -m "Initial commit - Application d'estimation intelligente"
echo Ajout du remote GitHub...
git remote add origin https://github.com/Amar2K111/estimation.git 2>nul
git remote set-url origin https://github.com/Amar2K111/estimation.git
echo Branche main...
git branch -M main
echo Push vers GitHub...
git push -u origin main
echo.
echo Termine! Si vous avez des erreurs d'authentification, configurez Git avec:
echo git config --global user.name "Votre Nom"
echo git config --global user.email "votre@email.com"
pause


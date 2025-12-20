@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo Push vers GitHub
echo ========================================
echo.

echo [1/6] Initialisation Git...
if not exist .git (
    git init
    echo Git initialise.
) else (
    echo Git deja initialise.
)
echo.

echo [2/6] Ajout des fichiers...
git add .
echo Fichiers ajoutes.
echo.

echo [3/6] Commit...
git commit -m "Update - Application d'estimation intelligente"
if %errorlevel% neq 0 (
    echo Aucun changement a commiter.
) else (
    echo Commit reussi.
)
echo.

echo [4/6] Configuration du remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Amar2K111/estimation.git
echo Remote configure.
echo.

echo [5/6] Branche main...
git branch -M main
echo Branche main configuree.
echo.

echo [6/6] Push vers GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ERREUR: Le push a echoue.
    echo.
    echo Solutions possibles:
    echo 1. Verifiez votre connexion Internet
    echo 2. Authentifiez-vous avec GitHub (Personal Access Token)
    echo 3. Verifiez que le depot existe sur GitHub
    echo.
) else (
    echo.
    echo ========================================
    echo SUCCES! Code pousse vers GitHub
    echo ========================================
    echo.
    echo Vous pouvez maintenant deployer sur Vercel:
    echo 1. Allez sur vercel.com
    echo 2. Connectez-vous avec GitHub
    echo 3. Importez le depot "estimation"
    echo.
)
pause


# 🚀 Instructions pour pousser sur GitHub et déployer sur Vercel

## 📋 Étape 1 : Pousser vers GitHub

### Option A : Utiliser le script automatique (Recommandé)

1. Double-cliquez sur le fichier **`push-to-github.bat`**
2. Le script va automatiquement :
   - Initialiser Git
   - Ajouter tous les fichiers
   - Faire un commit
   - Connecter au dépôt GitHub
   - Pousser le code

### Option B : Commandes manuelles

Ouvrez un terminal (Git Bash, PowerShell, ou CMD) dans le dossier du projet et exécutez :

```bash
git init
git add .
git commit -m "Initial commit - Application d'estimation intelligente"
git remote add origin https://github.com/Amar2K111/estimation.git
git branch -M main
git push -u origin main
```

**Note :** Si c'est la première fois, GitHub vous demandera de vous authentifier. Vous pouvez :
- Utiliser un Personal Access Token (recommandé)
- Ou configurer SSH

## 🌐 Étape 2 : Déployer sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub
5. Cliquez sur **"Add New Project"**
6. Sélectionnez le dépôt **`estimation`**
7. Vercel détectera automatiquement Next.js
8. Cliquez sur **"Deploy"**

Vercel va :
- ✅ Installer les dépendances (`npm install`)
- ✅ Builder le projet (`npm run build`)
- ✅ Déployer l'application
- ✅ Vous donner une URL (ex: `estimation.vercel.app`)

### Méthode 2 : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer (depuis le dossier du projet)
vercel

# Pour la production
vercel --prod
```

## ✅ Vérification

Une fois déployé, vous devriez avoir :
- ✅ Une URL de production (ex: `estimation.vercel.app`)
- ✅ Un déploiement automatique à chaque push sur GitHub
- ✅ Des logs de build disponibles sur Vercel

## 🔄 Mises à jour futures

Pour mettre à jour votre application :

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

Vercel déploiera automatiquement la nouvelle version !

## 🆘 Problèmes courants

### Erreur d'authentification GitHub

Si vous avez une erreur d'authentification :

1. Allez sur GitHub → Settings → Developer settings → Personal access tokens
2. Créez un nouveau token avec les permissions `repo`
3. Utilisez ce token comme mot de passe lors du `git push`

### Erreur de build sur Vercel

- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez les logs de build sur Vercel Dashboard
- Assurez-vous que `node_modules` est dans `.gitignore`

### Module not found

- Vérifiez que toutes les dépendances sont listées dans `package.json`
- Exécutez `npm install` localement pour vérifier

## 📝 Configuration Git (si nécessaire)

Si c'est la première fois que vous utilisez Git :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

---

**Votre dépôt GitHub :** https://github.com/Amar2K111/estimation.git


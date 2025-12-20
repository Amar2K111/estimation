# 🌐 Déploiement sur Vercel

## Après avoir poussé sur GitHub

Une fois que votre code est sur GitHub (https://github.com/Amar2K111/estimation.git), suivez ces étapes :

## 📋 Étapes de déploiement

### 1. Aller sur Vercel
- Allez sur [vercel.com](https://vercel.com)
- Cliquez sur **"Sign Up"** ou **"Log In"**

### 2. Se connecter avec GitHub
- Choisissez **"Continue with GitHub"**
- Autorisez Vercel à accéder à votre compte GitHub

### 3. Importer le projet
- Cliquez sur **"Add New Project"**
- Sélectionnez le dépôt **`estimation`** (Amar2K111/estimation)
- Vercel détectera automatiquement Next.js

### 4. Configurer le projet
- **Framework Preset** : Next.js (détecté automatiquement)
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install` (par défaut)

### 5. Déployer
- Cliquez sur **"Deploy"**
- Attendez 2-3 minutes que Vercel build et déploie

## ✅ Résultat

Vous obtiendrez une URL comme : `estimation-xxx.vercel.app`

## 🔄 Déploiements automatiques

À chaque fois que vous faites `git push` sur GitHub, Vercel déploiera automatiquement la nouvelle version !

## 🆘 En cas de problème

- Vérifiez les logs de build sur Vercel Dashboard
- Assurez-vous que toutes les dépendances sont dans `package.json`
- Vérifiez que `node_modules` est dans `.gitignore`


# 🚀 Guide de déploiement sur Vercel

## 📋 Prérequis

1. Un compte GitHub (gratuit)
2. Un compte Vercel (gratuit)
3. Git installé sur votre machine

## 🔧 Étape 1 : Initialiser Git (si pas déjà fait)

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
git init
git add .
git commit -m "Initial commit - Application d'estimation intelligente"
```

## 📦 Étape 2 : Créer un dépôt GitHub

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Donnez un nom à votre dépôt (ex: `estimation-interieur`)
4. **Ne cochez PAS** "Initialize with README" (on a déjà les fichiers)
5. Cliquez sur **"Create repository"**

## 🔗 Étape 3 : Connecter le projet local à GitHub

Dans votre terminal, exécutez (remplacez `VOTRE_USERNAME` et `NOM_DU_REPO`):

```bash
git remote add origin https://github.com/VOTRE_USERNAME/NOM_DU_REPO.git
git branch -M main
git push -u origin main
```

Si vous n'êtes pas connecté à GitHub, vous devrez vous authentifier.

## 🌐 Étape 4 : Déployer sur Vercel

### Option A : Via l'interface Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub
5. Cliquez sur **"Add New Project"**
6. Sélectionnez votre dépôt GitHub
7. Vercel détectera automatiquement Next.js
8. Cliquez sur **"Deploy"**

Vercel va :
- Installer les dépendances
- Builder le projet
- Déployer l'application
- Vous donner une URL (ex: `votre-projet.vercel.app`)

### Option B : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## ✅ Vérification

Une fois déployé, vous devriez avoir :
- ✅ Une URL de production (ex: `votre-projet.vercel.app`)
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

## 📝 Notes importantes

- **Variables d'environnement** : Si vous en ajoutez, configurez-les dans Vercel → Settings → Environment Variables
- **Build errors** : Vérifiez les logs dans Vercel Dashboard → Deployments
- **Domaine personnalisé** : Vous pouvez ajouter votre propre domaine dans Vercel → Settings → Domains

## 🆘 Problèmes courants

### Erreur de build
- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez les logs de build sur Vercel

### Module not found
- Assurez-vous que `node_modules` est dans `.gitignore`
- Vérifiez que toutes les dépendances sont listées dans `package.json`

### Erreur TypeScript
- Vérifiez que `tsconfig.json` est correct
- Les erreurs TypeScript peuvent bloquer le build en production


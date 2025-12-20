# 🏗️ Web App d'Estimation Intelligente - Next.js

## 📋 Description

Application web Next.js pour générer des estimations de rénovation pour architectes d'intérieur, basée sur leurs projets historiques.

**Gain de temps :** 2 heures → 5 minutes par estimation

---

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation des dépendances

```bash
npm install
# ou
yarn install
```

### Lancement en développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure du projet

```
architected'interieur/
├── app/
│   ├── estimation/
│   │   ├── nouvelle/          # Formulaire de saisie
│   │   └── resultat/          # Affichage du résultat
│   ├── projets/               # Liste des projets historiques
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Page d'accueil
│   └── globals.css            # Styles globaux
├── lib/
│   ├── data/
│   │   └── projets-exemple.ts # Base de données exemple (5 projets)
│   └── utils/
│       └── estimation.ts      # Moteur de calcul
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 🗄️ Base de données

### Données d'exemple

Le fichier `lib/data/projets-exemple.ts` contient **5 projets historiques d'exemple** couvrant différents types de projets :

1. **Caroline ROCHE** - Appartement Premium 70m² (Paris)
2. **Martin DUPONT** - Appartement Standard 55m² (Lyon)
3. **Sophie LEBLANC** - Maison Premium 120m² (Bordeaux)
4. **Pierre MARTIN** - Appartement Économique 45m² (Marseille)
5. **Marie DUBOIS** - Appartement Luxe 90m² (Paris)

### Remplacement par les données réelles

**L'architecte devra remplacer ces données par ses propres projets historiques.**

Pour cela :
1. Modifier le fichier `lib/data/projets-exemple.ts`
2. Remplacer le tableau `projetsExemple` par ses propres données
3. Respecter la structure `ProjetHistorique` définie dans le fichier

---

## ⚙️ Fonctionnalités

### 1. Création d'une nouvelle estimation

**Page :** `/estimation/nouvelle`

**Étapes :**
1. Informations client (nom, email, téléphone)
2. Caractéristiques du projet (surface, type, localisation, niveau)
3. Pièces du projet (ajout dynamique)
4. Options (sanitaires, cuisine, climatisation, etc.)

### 2. Calcul automatique

Le moteur de calcul (`lib/utils/estimation.ts`) :

- **Trouve les projets similaires** (même type, surface proche, même ville)
- **Calcule 3 approches :**
  - Approche 1 : Par m² selon le niveau de rénovation
  - Approche 2 : Détail par poste de travaux (basé sur projets similaires)
  - Approche 3 : Calcul par pièce avec correction
- **Génère le budget final** avec synthèse

### 3. Affichage du résultat

**Page :** `/estimation/resultat`

Affiche :
- Les 3 approches de calcul détaillées
- La synthèse finale avec budget global
- Les projets similaires utilisés pour le calcul
- Bouton d'export PDF (impression navigateur)

### 4. Consultation des projets

**Page :** `/projets`

Affiche la liste de tous les projets historiques avec leurs caractéristiques.

---

## 🎨 Technologies utilisées

- **Next.js 15** - Framework React
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS 3.4** - Styles utilitaires
- **PostCSS & Autoprefixer** - Traitement CSS

---

## 📊 Algorithme de calcul

### Recherche de projets similaires

Un projet est considéré comme similaire si :
- Même type de bien (Appartement/Maison)
- Surface proche (±30%)
- Même ville

### Calcul des approches

1. **Approche 1 (m²)** : Prix au m² selon niveau × surface × TVA
2. **Approche 2 (postes)** : Moyenne des postes des projets similaires, ajustée selon la surface
3. **Approche 3 (pièces)** : Prix au m² par type de pièce × surface × niveau × TVA + correction 25%

### Budget final

- Moyenne des 3 approches pour les travaux manuels
- Travaux intellectuels : ~9% des travaux
- Maîtrise d'œuvre : ~10% des travaux
- Total = Travaux + Intellectuels + Maîtrise d'œuvre

---

## 🔧 Personnalisation

### Ajouter des projets historiques

Modifier `lib/data/projets-exemple.ts` et ajouter des objets `ProjetHistorique` au tableau.

### Modifier les prix

Les prix sont définis dans `lib/utils/estimation.ts` :
- `PRIX_M2_PAR_NIVEAU` : Prix au m² par niveau
- `PRIX_M2_PAR_TYPE_PIECE` : Prix au m² par type de pièce
- `POSTES_TRAVAUX_STANDARDS` : Liste des postes

### Modifier les coefficients

Dans `lib/utils/estimation.ts` :
- `TAUX_TVA` : Taux de TVA (actuellement 1.20 = 20%)
- `CORRECTION_PIECES` : Correction pour approche par pièce (actuellement 1.25 = +25%)

---

## 📦 Build et déploiement

### Build de production

```bash
npm run build
# ou
yarn build
```

### Lancement en production

```bash
npm start
# ou
yarn start
```

### Déploiement

L'application peut être déployée sur :
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **Railway**
- Tout hébergeur supportant Node.js

---

## 📝 Notes importantes

1. **Données d'exemple** : Les projets dans `projets-exemple.ts` sont des exemples. L'architecte doit les remplacer par ses propres données.

2. **Stockage** : Actuellement, les estimations sont stockées dans le `localStorage` du navigateur. Pour une utilisation en production, il faudra ajouter une base de données (PostgreSQL, MongoDB, etc.).

3. **Export PDF** : L'export PDF utilise la fonction d'impression du navigateur. Pour un export PDF plus avancé, utiliser une bibliothèque comme `jspdf` (déjà dans les dépendances).

4. **Authentification** : Aucune authentification n'est implémentée. À ajouter pour une utilisation multi-utilisateurs.

---

## 🚀 Prochaines étapes

- [ ] Ajouter une base de données (PostgreSQL/MongoDB)
- [ ] Implémenter l'authentification
- [ ] Améliorer l'export PDF avec jspdf
- [ ] Ajouter la gestion des projets (CRUD)
- [ ] Ajouter des statistiques et graphiques
- [ ] Implémenter l'IA prédictive

---

## 📞 Support

Pour toute question ou modification, adapter le code selon vos besoins.

---

**Version :** 1.0.0  
**Dernière mise à jour :** 2025


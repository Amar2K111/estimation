# 📝 Instructions pour remplacer les données d'exemple

## 🎯 Objectif

Remplacer les **5 projets d'exemple** par les **vrais projets historiques de l'architecte** (5 ans ou plus).

---

## 📍 Fichier à modifier

**Fichier :** `lib/data/projets-exemple.ts`

---

## 📊 Structure d'un projet

Chaque projet doit respecter cette structure :

```typescript
{
  id: "projet_001",                    // Identifiant unique
  client: "Nom du client",             // Nom du client
  date_estimation: "2025-11-16",        // Date au format YYYY-MM-DD
  date_realisation: "2025-12-20",      // Optionnel : date de réalisation
  
  caracteristiques: {
    surface_totale: 70,                // Surface totale en m²
    type_bien: "Appartement",          // "Appartement" ou "Maison"
    localisation: {
      ville: "Paris",                  // Ville
      code_postal: "75001",            // Optionnel
      zone: "Centre"                   // Zone (Centre, Périphérie, etc.)
    },
    niveau_renovation: "Premium",       // "Économique", "Standard", "Premium" ou "Luxe"
    nombre_pieces: 8                   // Nombre de pièces
  },
  
  pieces: [
    {
      id: "piece_001",
      nom: "Entrée / Couloir",         // Nom de la pièce
      surface: 9,                      // Surface en m²
      type: "standard",                 // "standard" ou "premium"
      prix_m2_min: 600,                // Prix min au m² (HT)
      prix_m2_max: 700,                // Prix max au m² (HT)
      montant_min: 5400,                // Montant min (TTC)
      montant_max: 6300                 // Montant max (TTC)
    },
    // ... autres pièces
  ],
  
  postes_travaux: [
    {
      id: "poste_001",
      nom: "Démolition / Alimentation / Protection",
      categorie: "preparation",         // preparation, technique, equipement, finition, structure, divers
      montant_min_ht: 10000,           // Montant min HT
      montant_max_ht: 12000,           // Montant max HT
      type: "standard"                 // "standard", "option_client" ou "mixte"
    },
    // ... autres postes
  ],
  
  approches_calcul: {
    approche_1_m2: {
      prix_m2_ht: [1500, 1700, 1900],  // 3 prix au m² HT
      montants_ttc: [115500, 130900, 146300],  // 3 montants TTC correspondants
      moyenne_ttc: 131000              // Moyenne TTC
    },
    approche_2_postes: {
      total_min_ttc: 125000,
      total_max_ttc: 143000,
      moyenne_ttc: 134000
    },
    approche_3_pieces: {
      total_min_ttc: 91000,
      total_max_ttc: 119000,
      correction_pourcentage: 25,      // Correction appliquée (+25%)
      moyenne_ttc: 105500
    }
  },
  
  budget_final: {
    travaux_intellectuels_ttc: 11560,  // Étude
    maitrise_oeuvre_ttc: 13000,        // Suivi des travaux
    travaux_manuels_min_ttc: 118000,  // Travaux min
    travaux_manuels_max_ttc: 132000,   // Travaux max
    total_min_ttc: 140000,             // Total min
    total_max_ttc: 155000,             // Total max
    moyenne_ttc: 147500                // Total moyen
  }
}
```

---

## 📋 Étapes pour remplacer les données

### 1. Préparer vos données

Rassemblez pour chaque projet :
- ✅ Informations client et dates
- ✅ Caractéristiques (surface, type, localisation, niveau)
- ✅ Liste des pièces avec surfaces et prix
- ✅ Liste des postes de travaux avec montants
- ✅ Les 3 approches de calcul utilisées
- ✅ Budget final réel

### 2. Ouvrir le fichier

Ouvrir `lib/data/projets-exemple.ts` dans votre éditeur.

### 3. Remplacer le tableau

Remplacer le tableau `projetsExemple` par vos propres projets :

```typescript
export const projetsExemple: ProjetHistorique[] = [
  // Votre projet 1
  {
    id: "projet_001",
    client: "Votre Client 1",
    // ... vos données
  },
  // Votre projet 2
  {
    id: "projet_002",
    client: "Votre Client 2",
    // ... vos données
  },
  // ... autres projets
];
```

### 4. Vérifier la cohérence

- ✅ Tous les IDs sont uniques
- ✅ Les surfaces sont en m²
- ✅ Les montants sont cohérents (HT vs TTC)
- ✅ Les dates sont au format YYYY-MM-DD
- ✅ Les types correspondent aux valeurs autorisées

---

## 💡 Conseils

### Nombre de projets recommandé

- **Minimum :** 5 projets pour avoir des données de référence
- **Idéal :** 10-20 projets pour plus de précision
- **Optimal :** 30+ projets couvrant différents types et niveaux

### Diversité des projets

Essayez d'avoir des projets variés :
- ✅ Différentes surfaces (petit, moyen, grand)
- ✅ Différents types (Appartement, Maison)
- ✅ Différents niveaux (Économique, Standard, Premium, Luxe)
- ✅ Différentes villes/zones
- ✅ Différentes périodes (5 ans de données)

### Postes de travaux

Les postes standards sont :
- Démolition / Alimentation / Protection
- Plomberie
- Sanitaires (option)
- Électricité
- Appareillages électriques (option)
- Cuisine (option)
- Aménagements (option)
- Sols
- Cloisons
- Faux plafonds
- Peinture
- Menuiseries intérieures (option)
- Menuiseries extérieures (option)
- Climatisation (option)
- Divers

Vous pouvez ajouter d'autres postes si nécessaire.

---

## 🔍 Vérification après remplacement

1. **Lancer l'application :**
   ```bash
   npm run dev
   ```

2. **Tester une estimation :**
   - Aller sur `/estimation/nouvelle`
   - Créer une estimation avec des critères similaires à vos projets
   - Vérifier que le résultat est cohérent

3. **Vérifier les projets similaires :**
   - Sur la page de résultat, vérifier que les projets similaires sont bien identifiés
   - Vérifier que les calculs sont cohérents avec vos données

---

## ⚠️ Important

- **Sauvegardez vos données** avant de modifier le fichier
- **Testez** après chaque modification
- **Vérifiez** que les calculs sont cohérents
- **Conservez** une copie de vos données originales

---

## 📞 Besoin d'aide ?

Si vous avez des questions sur la structure des données ou besoin d'aide pour l'import, référez-vous au fichier `STRUCTURE_DONNEES.md` pour plus de détails.


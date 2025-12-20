# 📊 Structure de données pour l'application

## Basée sur l'analyse du document type (Caroline ROCHE - 70m²)

---

## 🗄️ Modèle de données - Projet historique

### Structure JSON complète

```json
{
  "id": "projet_001",
  "client": "Caroline ROCHE",
  "date_estimation": "2025-11-16",
  "date_realisation": null,
  
  "caracteristiques": {
    "surface_totale": 70,
    "type_bien": "Appartement",
    "localisation": {
      "ville": "Paris",
      "code_postal": null,
      "zone": "Centre"
    },
    "niveau_renovation": "Premium",
    "nombre_pieces": 8
  },
  
  "pieces": [
    {
      "id": "piece_001",
      "nom": "Entrée / Couloir",
      "surface": 9,
      "type": "standard",
      "prix_m2_min": 600,
      "prix_m2_max": 700,
      "montant_min": 5400,
      "montant_max": 6300
    },
    {
      "id": "piece_002",
      "nom": "Salon / Séjour",
      "surface": 18,
      "type": "standard",
      "prix_m2_min": 500,
      "prix_m2_max": 600,
      "montant_min": 9000,
      "montant_max": 10800
    },
    {
      "id": "piece_003",
      "nom": "Cuisine",
      "surface": 7,
      "type": "premium",
      "prix_m2_min": 1500,
      "prix_m2_max": 2500,
      "montant_min": 10500,
      "montant_max": 17500
    },
    {
      "id": "piece_004",
      "nom": "Chambre 1",
      "surface": 13,
      "type": "standard",
      "prix_m2_min": 900,
      "prix_m2_max": 1200,
      "montant_min": 11700,
      "montant_max": 15600
    },
    {
      "id": "piece_005",
      "nom": "Chambre 2",
      "surface": 17,
      "type": "standard",
      "prix_m2_min": 900,
      "prix_m2_max": 1000,
      "montant_min": 15300,
      "montant_max": 17000
    },
    {
      "id": "piece_006",
      "nom": "Salle de bains",
      "surface": 4,
      "type": "premium",
      "prix_m2_min": 2500,
      "prix_m2_max": 3500,
      "montant_min": 10000,
      "montant_max": 14000
    },
    {
      "id": "piece_007",
      "nom": "WC indépendants",
      "surface": 1,
      "type": "premium",
      "prix_m2_min": 3500,
      "prix_m2_max": 4500,
      "montant_min": 3500,
      "montant_max": 4500
    },
    {
      "id": "piece_008",
      "nom": "Placards divers",
      "surface": 1,
      "type": "standard",
      "prix_m2_min": 800,
      "prix_m2_max": 900,
      "montant_min": 800,
      "montant_max": 900
    }
  ],
  
  "postes_travaux": [
    {
      "id": "poste_001",
      "nom": "Démolition / Alimentation / Protection",
      "categorie": "preparation",
      "montant_min_ht": 10000,
      "montant_max_ht": 12000,
      "type": "standard",
      "details": {
        "demolition": 5000,
        "alimentation": 3000,
        "protection": 2000
      }
    },
    {
      "id": "poste_002",
      "nom": "Plomberie",
      "categorie": "technique",
      "montant_min_ht": 8500,
      "montant_max_ht": 9500,
      "type": "standard"
    },
    {
      "id": "poste_003",
      "nom": "Sanitaires",
      "categorie": "equipement",
      "montant_min_ht": 3500,
      "montant_max_ht": 4000,
      "type": "option_client"
    },
    {
      "id": "poste_004",
      "nom": "Électricité",
      "categorie": "technique",
      "montant_min_ht": 10000,
      "montant_max_ht": 12000,
      "type": "standard"
    },
    {
      "id": "poste_005",
      "nom": "Appareillages électriques",
      "categorie": "equipement",
      "montant_min_ht": 2000,
      "montant_max_ht": 2000,
      "type": "option_client",
      "sous_postes": [
        {
          "nom": "Commande",
          "montant": 500
        },
        {
          "nom": "Éclairage",
          "montant": 1500
        }
      ]
    },
    {
      "id": "poste_006",
      "nom": "Cuisine",
      "categorie": "equipement",
      "montant_min_ht": 12000,
      "montant_max_ht": 14500,
      "type": "option_client",
      "sous_postes": [
        {
          "nom": "Mobilier",
          "montant_min": 5500,
          "montant_max": 6500
        },
        {
          "nom": "Électroménager",
          "montant_min": 3000,
          "montant_max": 3500
        },
        {
          "nom": "Plan de travail",
          "montant_min": 3500,
          "montant_max": 4500
        }
      ]
    },
    {
      "id": "poste_007",
      "nom": "Aménagements",
      "categorie": "equipement",
      "montant_min_ht": 5000,
      "montant_max_ht": 5000,
      "type": "option_client",
      "details": "Dressing entrée + séjour + buanderie + chambres"
    },
    {
      "id": "poste_008",
      "nom": "Sols",
      "categorie": "finition",
      "montant_min_ht": 15000,
      "montant_max_ht": 17500,
      "type": "mixte",
      "sous_postes": [
        {
          "nom": "Structure",
          "montant_min": 8500,
          "montant_max": 10500
        },
        {
          "nom": "Finition",
          "montant_min": 6000,
          "montant_max": 6500
        },
        {
          "nom": "Finition salle de bains",
          "montant_min": 500,
          "montant_max": 500
        }
      ]
    },
    {
      "id": "poste_009",
      "nom": "Cloisons",
      "categorie": "structure",
      "montant_min_ht": 2500,
      "montant_max_ht": 3000,
      "type": "mixte",
      "sous_postes": [
        {
          "nom": "Structure & Isolation",
          "montant": 1500
        },
        {
          "nom": "Finitions salle d'eau & WC",
          "montant_min": 1000,
          "montant_max": 1500
        }
      ]
    },
    {
      "id": "poste_010",
      "nom": "Faux plafonds",
      "categorie": "structure",
      "montant_min_ht": 3000,
      "montant_max_ht": 4000,
      "type": "standard",
      "sous_postes": [
        {
          "nom": "Structure",
          "montant": 1500
        },
        {
          "nom": "Finition",
          "montant_min": 1500,
          "montant_max": 2500
        }
      ]
    },
    {
      "id": "poste_011",
      "nom": "Peinture",
      "categorie": "finition",
      "montant_min_ht": 10000,
      "montant_max_ht": 11500,
      "type": "standard"
    },
    {
      "id": "poste_012",
      "nom": "Menuiseries intérieures",
      "categorie": "equipement",
      "montant_min_ht": 1500,
      "montant_max_ht": 2000,
      "type": "option_client",
      "details": "Portes de communication"
    },
    {
      "id": "poste_013",
      "nom": "Menuiseries extérieures",
      "categorie": "equipement",
      "montant_min_ht": 13000,
      "montant_max_ht": 18000,
      "type": "option_client",
      "sous_postes": [
        {
          "nom": "Fenêtres et portes-fenêtres",
          "montant_min": 6500,
          "montant_max": 8000
        },
        {
          "nom": "Volets",
          "montant_min": 3000,
          "montant_max": 5500
        },
        {
          "nom": "Porte palière",
          "montant_min": 3500,
          "montant_max": 4500
        }
      ]
    },
    {
      "id": "poste_014",
      "nom": "Climatisation",
      "categorie": "equipement",
      "montant_min_ht": 4500,
      "montant_max_ht": 12000,
      "type": "option_client",
      "details": "3 unités murales ou unité plafond air zone"
    },
    {
      "id": "poste_015",
      "nom": "Divers",
      "categorie": "divers",
      "montant_min_ht": 13000,
      "montant_max_ht": 14000,
      "type": "standard",
      "sous_postes": [
        {
          "nom": "Matériaux (miroiterie, VMC, colle, étanchéité, etc.)",
          "montant_min": 7000,
          "montant_max": 7500
        },
        {
          "nom": "Main d'œuvre (menuiserie, montage meuble, etc.)",
          "montant_min": 6000,
          "montant_max": 6500
        }
      ]
    }
  ],
  
  "approches_calcul": {
    "approche_1_m2": {
      "prix_m2_ht": [1500, 1700, 1900],
      "montants_ttc": [115500, 130900, 146300],
      "moyenne_ttc": 131000
    },
    "approche_2_postes": {
      "total_min_ttc": 125000,
      "total_max_ttc": 143000,
      "moyenne_ttc": 134000
    },
    "approche_3_pieces": {
      "total_min_ttc": 91000,
      "total_max_ttc": 119000,
      "correction_pourcentage": 25,
      "total_avec_correction_min": 91000,
      "total_avec_correction_max": 119000,
      "moyenne_ttc": 105500
    }
  },
  
  "budget_final": {
    "travaux_intellectuels_ttc": 11560,
    "maitrise_oeuvre_ttc": 13000,
    "travaux_manuels_min_ttc": 118000,
    "travaux_manuels_max_ttc": 132000,
    "total_min_ttc": 140000,
    "total_max_ttc": 155000,
    "moyenne_ttc": 147500
  },
  
  "duree_travaux": {
    "estimee_semaines": null,
    "reelle_semaines": null
  },
  
  "statut": "estimation"
}
```

---

## 🔄 Modèle de données - Nouvelle demande

### Structure pour la saisie rapide

```json
{
  "client": {
    "nom": "Nouveau Client",
    "email": "client@example.com",
    "telephone": null
  },
  
  "projet": {
    "surface_totale": 70,
    "type_bien": "Appartement",
    "localisation": {
      "ville": "Paris",
      "zone": "Centre"
    },
    "niveau_renovation": "Premium",
    "contraintes_techniques": [],
    "souhaits_client": []
  },
  
  "pieces": [
    {
      "nom": "Entrée",
      "surface": 9,
      "type": "standard"
    },
    {
      "nom": "Séjour",
      "surface": 18,
      "type": "standard"
    }
    // ... autres pièces
  ],
  
  "options": {
    "sanitaires": true,
    "cuisine": true,
    "climatisation": false,
    "menuiseries_exterieures": true
  }
}
```

---

## 🧮 Règles de calcul

### Prix au m² selon la gamme

```javascript
const PRIX_M2_PAR_GAMME = {
  "economique": {
    "ht": 1200,
    "ttc": 1440
  },
  "standard": {
    "ht": 1500,
    "ttc": 1800
  },
  "premium": {
    "ht": 1700,
    "ttc": 2040
  },
  "luxe": {
    "ht": 1900,
    "ttc": 2280
  }
};
```

### Prix par type de pièce

```javascript
const PRIX_M2_PAR_TYPE_PIECE = {
  "entree_couloir": {
    "min": 600,
    "max": 700
  },
  "sejour": {
    "min": 500,
    "max": 600
  },
  "cuisine": {
    "min": 1500,
    "max": 2500
  },
  "chambre": {
    "min": 900,
    "max": 1200
  },
  "salle_bains": {
    "min": 2500,
    "max": 3500
  },
  "wc": {
    "min": 3500,
    "max": 4500
  },
  "placard": {
    "min": 800,
    "max": 900
  }
};
```

### Coefficients de correction

```javascript
const COEFFICIENTS = {
  "correction_pieces": 1.25,  // +25% pour l'approche par pièce
  "taux_tva": 1.20,            // 20% TVA
  "maitrise_oeuvre_pourcentage": 0.10  // 10% du montant travaux
};
```

---

## 📈 Algorithme d'estimation

### Étapes de calcul

1. **Recherche de projets similaires**
   - Même type de bien
   - Surface proche (±20%)
   - Même localisation ou zone similaire
   - Même niveau de rénovation

2. **Calcul approche 1 (m²)**
   - Application du prix au m² selon la gamme
   - Calcul de 3 fourchettes (min, moyen, max)
   - Application de la TVA

3. **Calcul approche 2 (postes)**
   - Pour chaque poste, recherche dans projets similaires
   - Calcul de la moyenne et des fourchettes
   - Ajustement selon options client
   - Somme totale

4. **Calcul approche 3 (pièces)**
   - Pour chaque pièce, application du prix au m²
   - Calcul des fourchettes
   - Application de la correction (+25%)
   - Somme totale

5. **Synthèse**
   - Calcul de la moyenne des 3 approches
   - Ajout des travaux intellectuels
   - Ajout de la maîtrise d'œuvre
   - Génération de la fourchette finale

---

## 💾 Base de données

### Tables principales

1. **projets** - Projets historiques
2. **pieces** - Détail des pièces par projet
3. **postes_travaux** - Détail des postes par projet
4. **estimations** - Nouvelles estimations générées
5. **regles_calcul** - Règles et coefficients
6. **clients** - Informations clients

---

## 🎯 Points clés

- **Structure modulaire** : Permet d'ajouter facilement de nouveaux postes/types
- **Historique complet** : Toutes les données nécessaires pour les calculs
- **Flexibilité** : Gestion des options clients
- **Traçabilité** : Chaque estimation peut être comparée aux projets réels


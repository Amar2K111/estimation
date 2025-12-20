# 📄 Exemple d'estimation - Analyse du document type

## Document analysé : Estimation Caroline ROCHE - 70m²

Ce document représente **exactement** le type d'estimation qui prend 2 heures à réaliser manuellement.

---

## 🔍 Structure du document type

### 1️⃣ Première approche : Calcul par m²

| Surface | Prix HT/m² | Montant TTC | Maîtrise d'Œuvre |
|---------|------------|-------------|-----------------|
| 70 m² × 1 500€ | 115 500€ | 11 500€ | |
| 70 m² × 1 700€ | 130 900€ | 13 900€ | |
| 70 m² × 1 900€ | 146 300€ | 14 600€ | |
| **Moyenne** | **131 000€** | **~13 000€** | |

**Temps manuel estimé :** 20-30 minutes
- Recherche des prix au m² selon la gamme
- Calculs manuels
- Vérification de la cohérence

---

### 2️⃣ Deuxième approche : Détail par poste de travaux

**Temps manuel estimé :** 60-90 minutes
- Recherche dans les anciens projets similaires
- Comparaison des prix par poste
- Ajustements selon les spécificités
- Calculs de fourchettes

#### Postes de travaux identifiés :

| Poste | Fourchette basse (HT) | Fourchette haute (HT) | Type |
|-------|----------------------|----------------------|------|
| Démolition / Alimentation / Protection | 10 000€ | 12 000€ | Standard |
| Plomberie | 8 500€ | 9 500€ | Standard |
| Sanitaires | 3 500€ | 4 000€ | Option client |
| Électricité | 10 000€ | 12 000€ | Standard |
| Appareillages électriques | 2 000€ | 2 000€ | Option client |
| Cuisine (mobilier + électroménager + plan de travail) | 12 000€ | 14 500€ | Option client |
| Aménagements (dressing, buanderie, etc.) | 5 000€ | 5 000€ | Option client |
| Sols (structure + finition) | 15 000€ | 17 500€ | Mixte |
| Cloisons (structure + finition) | 2 500€ | 3 000€ | Mixte |
| Faux plafonds | 3 000€ | 4 000€ | Standard |
| Peinture | 10 000€ | 11 500€ | Standard |
| Menuiseries intérieures | 1 500€ | 2 000€ | Option client |
| Menuiseries extérieures | 13 000€ | 18 000€ | Option client |
| Climatisation | 4 500€ | 12 000€ | Option client |
| Divers (matériaux + main d'œuvre) | 13 000€ | 13 500€ | Standard |

**Total Mat & Main d'Œuvre :** 125 000€ - 143 000€ TTC (moyenne : 134 000€)

---

### 3️⃣ Troisième approche : Calcul par pièce

**Temps manuel estimé :** 30-40 minutes
- Identification des surfaces par pièce
- Application des prix au m² selon le type de pièce
- Calculs et corrections

| Pièce | Surface | Prix/m² | Montant | Type |
|-------|---------|---------|---------|------|
| Entrée / Couloir | 9 m² | 600-700€ | 5 400-6 300€ | Standard |
| Salon / Séjour | 18 m² | 500-600€ | 9 000-10 800€ | Standard |
| Cuisine | 7 m² | 1 500-2 500€ | 10 500-17 500€ | Premium |
| Chambre 1 | 13 m² | 900-1 200€ | 11 700-15 600€ | Standard |
| Chambre 2 | 17 m² | 900-1 000€ | 15 300-17 000€ | Standard |
| Salle de bains | 4 m² | 2 500-3 500€ | 10 000-14 000€ | Premium |
| WC indépendants | 1 m² | 3 500-4 500€ | 3 500-4 500€ | Premium |
| Placards divers | 1 m² | 800-900€ | 800-900€ | Standard |
| **TOTAL 70 m²** | | **+25% correction** | **91 000-119 000€** | |
| **Moyenne** | | | **105 500€** | |

---

### 4️⃣ Synthèse finale

| Type de coût | Montant TTC |
|--------------|-------------|
| Travaux intellectuels (étude) | 11 560€ |
| Suivi des travaux (maîtrise d'œuvre) | ~13 000€ |
| Travaux manuels & Matériaux | 118 000-132 000€ |
| **BUDGET GLOBAL** | **140 000-155 000€ TTC** |

---

## ⏱️ Temps total estimé pour créer ce document manuellement

| Étape | Temps estimé |
|-------|--------------|
| Recherche dans les anciens projets | 30-45 min |
| Calculs première approche (m²) | 20-30 min |
| Détail par poste (recherche + calculs) | 60-90 min |
| Calcul par pièce | 30-40 min |
| Vérification et synthèse | 15-20 min |
| Mise en forme du document | 10-15 min |
| **TOTAL** | **~2 heures** |

---

## 💡 Comment l'application automatiserait ce processus

### Données nécessaires en base :

1. **Projets historiques** avec :
   - Surface totale
   - Type de bien
   - Détail par pièce (surface, type, prix/m²)
   - Détail par poste de travaux
   - Budget final réel
   - Localisation

2. **Règles de calcul** :
   - Prix au m² selon la gamme (1 500€, 1 700€, 1 900€ HT)
   - Prix par type de pièce
   - Fourchettes par poste de travaux
   - Coefficients de correction

### Processus automatisé :

1. **Saisie rapide** (3 min) :
   - Surface : 70 m²
   - Type : Appartement
   - Localisation : [Ville]
   - Niveau de rénovation : [Standard/Premium]
   - Pièces : Entrée 9m², Séjour 18m², Cuisine 7m², etc.

2. **Calcul automatique** (30 secondes) :
   - Analyse des projets similaires
   - Application des 3 approches
   - Génération des fourchettes

3. **Résultat** (1 min) :
   - Document formaté identique
   - Export PDF prêt à envoyer
   - Texte d'accompagnement

**TOTAL : 5 minutes au lieu de 2 heures** ⚡

---

## 📊 Structure de données pour l'application

### Modèle de projet historique :

```json
{
  "id": "projet_001",
  "client": "Caroline ROCHE",
  "date": "2025-11-16",
  "surface_totale": 70,
  "type_bien": "Appartement",
  "localisation": "Paris",
  "niveau_renovation": "Premium",
  
  "pieces": [
    {
      "nom": "Entrée / Couloir",
      "surface": 9,
      "type": "standard",
      "prix_m2_min": 600,
      "prix_m2_max": 700
    },
    // ... autres pièces
  ],
  
  "postes_travaux": [
    {
      "nom": "Démolition / Alimentation / Protection",
      "montant_min": 10000,
      "montant_max": 12000,
      "type": "standard"
    },
    // ... autres postes
  ],
  
  "budget_final": {
    "travaux_intellectuels": 11560,
    "maitrise_oeuvre": 13000,
    "travaux_manuels_min": 118000,
    "travaux_manuels_max": 132000,
    "total_min": 140000,
    "total_max": 155000
  }
}
```

---

## 🎯 Points clés à retenir

1. **3 approches différentes** = Complexité de calcul
2. **Multiples fourchettes** = Besoin de données historiques
3. **Options clients** = Ajustements nécessaires
4. **Synthèse finale** = Mise en forme professionnelle

**C'est exactement ce que l'application doit automatiser !** 🚀


import { projetsExemple, type ProjetHistorique } from "@/lib/data/projets-exemple";

export interface NouvelleEstimation {
  client: {
    nom: string;
    email?: string;
    telephone?: string;
  };
  projet: {
    surface_totale: number;
    type_bien: "Appartement" | "Maison";
    localisation: {
      ville: string;
      zone: string;
    };
    niveau_renovation: "Économique" | "Standard" | "Premium" | "Luxe";
  };
  pieces: Array<{
    nom: string;
    surface: number;
    type: "standard" | "premium";
  }>;
  options: {
    sanitaires: boolean;
    cuisine: boolean;
    climatisation: boolean;
    menuiseries_exterieures: boolean;
    appareillages_electriques: boolean;
    amenagements: boolean;
  };
}

export interface ResultatEstimation {
  approche_1_m2: {
    prix_m2_ht: number[];
    montants_ttc: number[];
    moyenne_ttc: number;
  };
  approche_2_postes: {
    total_min_ttc: number;
    total_max_ttc: number;
    moyenne_ttc: number;
    detail_postes: Array<{
      nom: string;
      montant_min_ttc: number;
      montant_max_ttc: number;
    }>;
  };
  approche_3_pieces: {
    total_min_ttc: number;
    total_max_ttc: number;
    correction_pourcentage: number;
    moyenne_ttc: number;
    detail_pieces: Array<{
      nom: string;
      surface: number;
      montant_min_ttc: number;
      montant_max_ttc: number;
    }>;
  };
  budget_final: {
    travaux_intellectuels_ttc: number;
    maitrise_oeuvre_ttc: number;
    travaux_manuels_min_ttc: number;
    travaux_manuels_max_ttc: number;
    total_min_ttc: number;
    total_max_ttc: number;
    moyenne_ttc: number;
  };
  projets_similaires: ProjetHistorique[];
}

const TAUX_TVA = 1.20; // 20% TVA
const CORRECTION_PIECES = 1.25; // +25% pour approche par pièce

// Prix au m² selon le niveau de rénovation
const PRIX_M2_PAR_NIVEAU = {
  "Économique": { min: 1000, moyen: 1200, max: 1500 },
  "Standard": { min: 1500, moyen: 1700, max: 1900 },
  "Premium": { min: 1700, moyen: 1900, max: 2200 },
  "Luxe": { min: 1900, moyen: 2200, max: 2500 }
};

// Prix par type de pièce
const PRIX_M2_PAR_TYPE_PIECE: Record<string, { min: number; max: number }> = {
  "Entrée": { min: 400, max: 700 },
  "Couloir": { min: 400, max: 700 },
  "Entrée / Couloir": { min: 600, max: 700 },
  "Hall d'entrée": { min: 700, max: 1000 },
  "Salon": { min: 450, max: 900 },
  "Séjour": { min: 450, max: 600 },
  "Salon / Séjour": { min: 500, max: 600 },
  "Cuisine": { min: 1000, max: 3500 },
  "Chambre": { min: 700, max: 1600 },
  "Chambre 1": { min: 900, max: 1200 },
  "Chambre 2": { min: 900, max: 1000 },
  "Chambre principale": { min: 1200, max: 1600 },
  "Chambre secondaire": { min: 1000, max: 1300 },
  "Salle de bains": { min: 1800, max: 4500 },
  "Salle de bains principale": { min: 3000, max: 4500 },
  "Salle de bains secondaire": { min: 2500, max: 3200 },
  "WC": { min: 3000, max: 5000 },
  "WC indépendants": { min: 3500, max: 4500 },
  "Placards": { min: 800, max: 900 },
  "Placards divers": { min: 800, max: 900 }
};

// Postes de travaux standards
const POSTES_TRAVAUX_STANDARDS = [
  { nom: "Démolition / Alimentation / Protection", categorie: "preparation" },
  { nom: "Plomberie", categorie: "technique" },
  { nom: "Sanitaires", categorie: "equipement", option: true },
  { nom: "Électricité", categorie: "technique" },
  { nom: "Appareillages électriques", categorie: "equipement", option: true },
  { nom: "Cuisine", categorie: "equipement", option: true },
  { nom: "Aménagements", categorie: "equipement", option: true },
  { nom: "Sols", categorie: "finition" },
  { nom: "Cloisons", categorie: "structure" },
  { nom: "Faux plafonds", categorie: "structure" },
  { nom: "Peinture", categorie: "finition" },
  { nom: "Menuiseries intérieures", categorie: "equipement", option: true },
  { nom: "Menuiseries extérieures", categorie: "equipement", option: true },
  { nom: "Climatisation", categorie: "equipement", option: true },
  { nom: "Divers", categorie: "divers" }
];

// Trouve les projets similaires
function trouverProjetsSimilaires(estimation: NouvelleEstimation): ProjetHistorique[] {
  return projetsExemple.filter(projet => {
    const surfaceDiff = Math.abs(projet.caracteristiques.surface_totale - estimation.projet.surface_totale);
    const surfacePercent = (surfaceDiff / estimation.projet.surface_totale) * 100;
    
    return (
      projet.caracteristiques.type_bien === estimation.projet.type_bien &&
      surfacePercent <= 30 && // Surface proche (±30%)
      projet.caracteristiques.localisation.ville === estimation.projet.localisation.ville
    );
  });
}

// Calcul approche 1 : Par m²
function calculApproche1(estimation: NouvelleEstimation) {
  const prix = PRIX_M2_PAR_NIVEAU[estimation.projet.niveau_renovation];
  const surface = estimation.projet.surface_totale;
  
  const prix_m2_ht = [prix.min, prix.moyen, prix.max];
  const montants_ttc = prix_m2_ht.map(prix => surface * prix * TAUX_TVA);
  const moyenne_ttc = montants_ttc.reduce((a, b) => a + b, 0) / montants_ttc.length;
  
  return {
    prix_m2_ht,
    montants_ttc,
    moyenne_ttc: Math.round(moyenne_ttc)
  };
}

// Calcul approche 2 : Par postes de travaux
function calculApproche2(estimation: NouvelleEstimation, projetsSimilaires: ProjetHistorique[]) {
  const detail_postes: Array<{ nom: string; montant_min_ttc: number; montant_max_ttc: number }> = [];
  let total_min = 0;
  let total_max = 0;
  
  for (const poste of POSTES_TRAVAUX_STANDARDS) {
    // Si c'est une option et que le client ne l'a pas choisie, on skip
    if (poste.option) {
      if (poste.nom === "Sanitaires" && !estimation.options.sanitaires) continue;
      if (poste.nom === "Cuisine" && !estimation.options.cuisine) continue;
      if (poste.nom === "Climatisation" && !estimation.options.climatisation) continue;
      if (poste.nom === "Menuiseries extérieures" && !estimation.options.menuiseries_exterieures) continue;
      if (poste.nom === "Appareillages électriques" && !estimation.options.appareillages_electriques) continue;
      if (poste.nom === "Aménagements" && !estimation.options.amenagements) continue;
    }
    
    // Trouve les montants dans les projets similaires
    const montants: number[] = [];
    for (const projet of projetsSimilaires) {
      const posteTrouve = projet.postes_travaux.find(p => p.nom === poste.nom);
      if (posteTrouve) {
        montants.push(posteTrouve.montant_min_ht * TAUX_TVA);
        montants.push(posteTrouve.montant_max_ht * TAUX_TVA);
      }
    }
    
    if (montants.length > 0) {
      // Ajuste selon la surface (proportionnel)
      const surfaceMoyenne = projetsSimilaires.reduce((sum, p) => sum + p.caracteristiques.surface_totale, 0) / projetsSimilaires.length;
      const ratio = estimation.projet.surface_totale / surfaceMoyenne;
      
      const montant_min = Math.min(...montants) * ratio;
      const montant_max = Math.max(...montants) * ratio;
      
      detail_postes.push({
        nom: poste.nom,
        montant_min_ttc: Math.round(montant_min),
        montant_max_ttc: Math.round(montant_max)
      });
      
      total_min += montant_min;
      total_max += montant_max;
    } else {
      // Si pas de données, estimation basique
      const montant_base = estimation.projet.surface_totale * 50; // Estimation basique
      detail_postes.push({
        nom: poste.nom,
        montant_min_ttc: Math.round(montant_base * 0.8),
        montant_max_ttc: Math.round(montant_base * 1.2)
      });
      total_min += montant_base * 0.8;
      total_max += montant_base * 1.2;
    }
  }
  
  return {
    total_min_ttc: Math.round(total_min),
    total_max_ttc: Math.round(total_max),
    moyenne_ttc: Math.round((total_min + total_max) / 2),
    detail_postes
  };
}

// Calcul approche 3 : Par pièce
function calculApproche3(estimation: NouvelleEstimation) {
  const detail_pieces: Array<{ nom: string; surface: number; montant_min_ttc: number; montant_max_ttc: number }> = [];
  let total_min = 0;
  let total_max = 0;
  
  for (const piece of estimation.pieces) {
    // Trouve le prix au m² selon le type de pièce
    let prix_m2 = PRIX_M2_PAR_TYPE_PIECE[piece.nom];
    if (!prix_m2) {
      // Si pas trouvé, utilise le type standard/premium
      prix_m2 = piece.type === "premium" 
        ? { min: 1000, max: 2000 }
        : { min: 500, max: 800 };
    }
    
    // Ajuste selon le niveau de rénovation
    const niveauMultiplier = {
      "Économique": 0.8,
      "Standard": 1.0,
      "Premium": 1.2,
      "Luxe": 1.4
    }[estimation.projet.niveau_renovation];
    
    const montant_min = piece.surface * prix_m2.min * niveauMultiplier * TAUX_TVA;
    const montant_max = piece.surface * prix_m2.max * niveauMultiplier * TAUX_TVA;
    
    detail_pieces.push({
      nom: piece.nom,
      surface: piece.surface,
      montant_min_ttc: Math.round(montant_min),
      montant_max_ttc: Math.round(montant_max)
    });
    
    total_min += montant_min;
    total_max += montant_max;
  }
  
  // Application de la correction +25%
  const total_min_corrige = total_min * CORRECTION_PIECES;
  const total_max_corrige = total_max * CORRECTION_PIECES;
  
  return {
    total_min_ttc: Math.round(total_min_corrige),
    total_max_ttc: Math.round(total_max_corrige),
    correction_pourcentage: 25,
    moyenne_ttc: Math.round((total_min_corrige + total_max_corrige) / 2),
    detail_pieces
  };
}

// Calcul du budget final
function calculBudgetFinal(approche1: any, approche2: any, approche3: any) {
  // Moyenne des 3 approches pour les travaux manuels
  const moyenne_travaux = (approche1.moyenne_ttc + approche2.moyenne_ttc + approche3.moyenne_ttc) / 3;
  const min_travaux = Math.min(approche1.montants_ttc[0], approche2.total_min_ttc, approche3.total_min_ttc);
  const max_travaux = Math.max(approche1.montants_ttc[2], approche2.total_max_ttc, approche3.total_max_ttc);
  
  // Travaux intellectuels (environ 8-10% des travaux)
  const travaux_intellectuels = Math.round(moyenne_travaux * 0.09);
  
  // Maîtrise d'œuvre (environ 10% des travaux)
  const maitrise_oeuvre = Math.round(moyenne_travaux * 0.10);
  
  return {
    travaux_intellectuels_ttc: travaux_intellectuels,
    maitrise_oeuvre_ttc: maitrise_oeuvre,
    travaux_manuels_min_ttc: Math.round(min_travaux),
    travaux_manuels_max_ttc: Math.round(max_travaux),
    total_min_ttc: Math.round(min_travaux + travaux_intellectuels + maitrise_oeuvre),
    total_max_ttc: Math.round(max_travaux + travaux_intellectuels + maitrise_oeuvre),
    moyenne_ttc: Math.round(moyenne_travaux + travaux_intellectuels + maitrise_oeuvre)
  };
}

// Fonction principale de calcul
export function calculerEstimation(estimation: NouvelleEstimation): ResultatEstimation {
  const projetsSimilaires = trouverProjetsSimilaires(estimation);
  
  const approche1 = calculApproche1(estimation);
  const approche2 = calculApproche2(estimation, projetsSimilaires);
  const approche3 = calculApproche3(estimation);
  const budget_final = calculBudgetFinal(approche1, approche2, approche3);
  
  return {
    approche_1_m2: approche1,
    approche_2_postes: approche2,
    approche_3_pieces: approche3,
    budget_final,
    projets_similaires: projetsSimilaires
  };
}


// @ts-ignore - jsPDF types may not be available
import jsPDF from "jspdf";
import type { ResultatEstimation, NouvelleEstimation } from "./estimation";

interface EstimationData {
  estimation: NouvelleEstimation;
  resultat: ResultatEstimation;
}

// Fonction pour formater les nombres correctement (avec espaces comme séparateurs de milliers)
function formatNumber(num: number): string {
  return num.toLocaleString("fr-FR", { useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Fonction pour créer un tableau simple avec gestion du texte qui dépasse
function createSimpleTable(
  doc: any,
  startY: number,
  headers: string[],
  rows: string[][],
  columnWidths: number[],
  margin: number
): number {
  let y = startY;
  const lineHeight = 7;
  const cellPadding = 3;
  const headerHeight = 8;

  // Dessiner les en-têtes avec fond gris
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  let x = margin;
  headers.forEach((header, i) => {
    // Fond gris pour l'en-tête
    doc.setFillColor(240, 240, 240);
    doc.rect(x, y - headerHeight, columnWidths[i], headerHeight, "F");
    // Bordure
    doc.setDrawColor(200, 200, 200);
    doc.rect(x, y - headerHeight, columnWidths[i], headerHeight);
    // Texte (centré verticalement et avec gestion du texte long)
    const textLines = doc.splitTextToSize(header || "", columnWidths[i] - cellPadding * 2);
    doc.setTextColor(0, 0, 0);
    doc.text(textLines, x + cellPadding, y - headerHeight / 2 + 2);
    x += columnWidths[i];
  });
  y += 2;

  // Dessiner les lignes
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setFillColor(255, 255, 255);
  rows.forEach((row) => {
    const maxLines = Math.max(...row.map((cell, i) => {
      const textLines = doc.splitTextToSize(cell || "", columnWidths[i] - cellPadding * 2);
      return textLines.length;
    }));
    const rowHeight = lineHeight * maxLines;

    x = margin;
    row.forEach((cell, i) => {
      // Fond blanc
      doc.setFillColor(255, 255, 255);
      doc.rect(x, y - lineHeight, columnWidths[i], rowHeight, "F");
      // Bordure
      doc.setDrawColor(200, 200, 200);
      doc.rect(x, y - lineHeight, columnWidths[i], rowHeight);
      // Texte avec gestion du texte long
      const textLines = doc.splitTextToSize(cell || "", columnWidths[i] - cellPadding * 2);
      doc.setTextColor(0, 0, 0);
      // Aligner à droite pour les colonnes numériques (sauf la première)
      if (i > 0 && cell.match(/[\d\s€]/)) {
        const textWidth = doc.getTextWidth(textLines[0]);
        doc.text(textLines, x + columnWidths[i] - cellPadding - textWidth, y - lineHeight + 4);
      } else {
        doc.text(textLines, x + cellPadding, y - lineHeight + 4);
      }
      x += columnWidths[i];
    });
    y += rowHeight;
  });

  return y;
}

export function exporterEstimationPDF(data: EstimationData) {
  const doc = new jsPDF("landscape", "mm", "a4");
  const { estimation, resultat } = data;

  let yPosition = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // En-tête principal
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ESTIMATION des coûts - Calculs des moyennes", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Mme/M. ${estimation.client.nom}`, margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.text(`Surface pour le calcul de l'étude : Surface trvx int ${estimation.projet.surface_totale} m²`, margin, yPosition);
  yPosition += 10;

  // 1ère APPROCHE : Travaux manuels
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("1er approche - Travaux manuels", margin, yPosition);
  yPosition += 8;

  // Tableau approche 1
  const table1Data = resultat.approche_1_m2.prix_m2_ht.map((prix, index) => [
    `${estimation.projet.surface_totale} m² × ${formatNumber(prix)}€ ht /m²`,
    `${formatNumber(resultat.approche_1_m2.montants_ttc[index])}€ ttc`,
    `${formatNumber(Math.round(resultat.approche_1_m2.montants_ttc[index] * 0.10))}€ ttc`
  ]);

  table1Data.push([
    "S/total des Mat & Main d'Œ",
    "",
    ""
  ]);
  table1Data.push([
    "",
    `${formatNumber(resultat.approche_1_m2.moyenne_ttc)}€ ttc moyenne`,
    ""
  ]);

  yPosition = createSimpleTable(
    doc,
    yPosition,
    ["", "Moyenne Mat & Main d'Œuvre", "Étape N°3 Maîtrise d'Œuvre à titre indicatif"],
    table1Data,
    [70, 60, 60],
    margin
  ) + 5;

  // 2ème APPROCHE : Travaux manuels
  if (yPosition > 150) {
    doc.addPage("landscape");
    yPosition = 15;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("2nd approche - Travaux manuels", margin, yPosition);
  yPosition += 8;

  // Tableau approche 2
  const table2Data = resultat.approche_2_postes.detail_postes.map((poste) => [
    poste.nom,
    `${formatNumber(poste.montant_min_ttc)}€`,
    `${formatNumber(poste.montant_max_ttc)}€`,
    ""
  ]);

  table2Data.push([
    "S/total des Mat & Main d'Œ",
    `Autour de ${formatNumber(resultat.approche_2_postes.total_min_ttc)}€ ttc`,
    `Autour de ${formatNumber(resultat.approche_2_postes.total_max_ttc)}€ ttc`,
    ""
  ]);
  table2Data.push([
    "",
    "",
    "",
    `${formatNumber(resultat.approche_2_postes.moyenne_ttc)}€ ttc moyenne`
  ]);

  yPosition = createSimpleTable(
    doc,
    yPosition,
    ["", "Fourchette estimation basse en ht", "Fourchette estimation haute en ht", "Moyenne"],
    table2Data,
    [90, 50, 50, 50],
    margin
  ) + 5;

  // 3ème APPROCHE : Par pièce
  if (yPosition > 150) {
    doc.addPage("landscape");
    yPosition = 15;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("3ème approche par pièce - Travaux manuels", margin, yPosition);
  yPosition += 5;

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("Incluant tous les corps de métiers. Sauf fenêtres, climatisation et équipements.", margin, yPosition);
  yPosition += 4;
  doc.text("Travaux sur les surfaces de l'état des lieux. Aucune migration des pièces.", margin, yPosition);
  yPosition += 8;

  // Tableau approche 3
  const table3Data = resultat.approche_3_pieces.detail_pieces.map((piece) => {
    const prixMinM2 = Math.round(piece.montant_min_ttc / piece.surface);
    const prixMaxM2 = Math.round(piece.montant_max_ttc / piece.surface);
    return [
      `${piece.nom} = ${piece.surface} m²`,
      `${formatNumber(prixMinM2)} à ${formatNumber(prixMaxM2)}€ / m²`,
      `${formatNumber(piece.montant_min_ttc)} / ${formatNumber(piece.montant_max_ttc)}€`
    ];
  });

  const totalSurface = estimation.pieces.reduce((sum, p) => sum + p.surface, 0);
  table3Data.push([
    `TOTAL = ${totalSurface} m²`,
    `+${resultat.approche_3_pieces.correction_pourcentage}% correction =`,
    `${formatNumber(resultat.approche_3_pieces.total_min_ttc)} / ${formatNumber(resultat.approche_3_pieces.total_max_ttc)}€`
  ]);
  table3Data.push([
    "",
    "",
    `${formatNumber(resultat.approche_3_pieces.moyenne_ttc)}€ ttc moyenne`
  ]);

  yPosition = createSimpleTable(
    doc,
    yPosition,
    ["", "Prix/m²", "Montant"],
    table3Data,
    [80, 60, 60],
    margin
  ) + 5;

  // SYNTHÈSE FINALE
  if (yPosition > 150) {
    doc.addPage("landscape");
    yPosition = 15;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SYNTHÈSE FINALE", margin, yPosition);
  yPosition += 8;

  const synthèseData = [
    [
      "Travaux intellectuels:",
      `${formatNumber(resultat.budget_final.travaux_intellectuels_ttc)}€ ttc`,
      "",
      ""
    ],
    [
      "Suivi des travaux:",
      `Environ ${formatNumber(resultat.budget_final.maitrise_oeuvre_ttc)}€ ttc`,
      "",
      ""
    ],
    [
      "Travaux manuels & Matériaux:",
      `De ${formatNumber(resultat.budget_final.travaux_manuels_min_ttc)}€ à ${formatNumber(resultat.budget_final.travaux_manuels_max_ttc)}€ ttc`,
      "",
      ""
    ],
    [
      "Montant global tt compris:",
      "",
      "",
      `Prévoir un budget entre ${formatNumber(resultat.budget_final.total_min_ttc)}€ à ${formatNumber(resultat.budget_final.total_max_ttc)}€ ttc`
    ]
  ];

  yPosition = createSimpleTable(
    doc,
    yPosition,
    ["", "", "", ""],
    synthèseData,
    [70, 60, 30, 70],
    margin
  ) + 5;

  // Date
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text(`Document généré le ${date}`, margin, yPosition);

  // Télécharger le PDF
  const fileName = `Estimation_${estimation.client.nom.replace(/\s+/g, "_")}_${date.replace(/\//g, "-")}.pdf`;
  doc.save(fileName);
}

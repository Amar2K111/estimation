import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Lancer Puppeteer avec Chromium optimisé pour Vercel
    // Fonctionne aussi en local avec @sparticuz/chromium
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    
    const page = await browser.newPage();
    
    // Générer le HTML de la page
    const html = generatePDFHTML(data);
    
    // Charger le HTML dans la page
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });
    
    // Générer le PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
    });
    
    await browser.close();
    
    // Retourner le PDF
    const safeFileName = data.estimation.client.nom.replace(/[^a-zA-Z0-9]/g, "_");
    const dateStr = new Date().toISOString().split("T")[0];
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="estimation_${safeFileName}_${dateStr}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du PDF" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string | number | undefined | null): string {
  if (text === null || text === undefined) return "";
  const str = String(text);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generatePDFHTML(data: any): string {
  const { estimation, resultat } = data;
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Estimation - ${escapeHtml(estimation.client.nom)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
    body {
      font-family: 'Playfair Display', serif;
      background: #f8f6f4;
    }
    @media print {
      body { background: white; }
    }
  </style>
</head>
<body class="bg-[#f8f6f4] py-12">
  <div class="container mx-auto px-6 lg:px-8 max-w-6xl">
    <!-- En-tête -->
    <div class="bg-white p-8 md:p-12 mb-8">
      <h1 class="text-4xl md:text-5xl font-serif text-gray-900 mb-8">
        Résultat de l'Estimation
      </h1>
      
      <!-- Informations client et projet -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="font-serif text-lg text-gray-900 mb-4">Client</h3>
          <p class="text-gray-900 mb-2">${escapeHtml(estimation.client.nom)}</p>
          ${estimation.client.email ? `<p class="text-gray-600 mb-1">${escapeHtml(estimation.client.email)}</p>` : ""}
          ${estimation.client.telephone ? `<p class="text-gray-600">${escapeHtml(estimation.client.telephone)}</p>` : ""}
        </div>
        <div>
          <h3 class="font-serif text-lg text-gray-900 mb-4">Projet</h3>
          <p class="text-gray-900 mb-2">
            ${escapeHtml(estimation.projet.type_bien)} - ${escapeHtml(estimation.projet.surface_totale)} m²
          </p>
          <p class="text-gray-600 mb-1">
            ${escapeHtml(estimation.projet.localisation.ville)}
            ${estimation.projet.localisation.zone ? ` - ${escapeHtml(estimation.projet.localisation.zone)}` : ""}
          </p>
          <p class="text-gray-600">Niveau : ${escapeHtml(estimation.projet.niveau_renovation)}</p>
        </div>
      </div>
    </div>

    <!-- Approche 1 : Par m² -->
    <div class="bg-white p-8 md:p-12 mb-8">
      <h2 class="text-2xl font-serif text-gray-900 mb-8">1ère Approche : Calcul par m²</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-[#f8f6f4]">
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Surface</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Prix HT/m²</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Montant TTC</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Maîtrise d'Œuvre</th>
            </tr>
          </thead>
          <tbody>
            ${resultat.approche_1_m2.prix_m2_ht.map((prix: number, index: number) => `
              <tr>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${estimation.projet.surface_totale} m² × ${prix}€ HT/m²
                </td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">${prix}€ HT</td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${resultat.approche_1_m2.montants_ttc[index].toLocaleString("fr-FR")}€ TTC
                </td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${Math.round(resultat.approche_1_m2.montants_ttc[index] * 0.10).toLocaleString("fr-FR")}€ TTC
                </td>
              </tr>
            `).join("")}
            <tr class="bg-[#f8f6f4] font-semibold">
              <td colSpan="2" class="border border-gray-200 px-6 py-4 text-gray-900">Sous-total Mat & Main d'Œuvre</td>
              <td class="border border-gray-200 px-6 py-4 text-gray-900">
                ${resultat.approche_1_m2.moyenne_ttc.toLocaleString("fr-FR")}€ TTC (moyenne)
              </td>
              <td class="border border-gray-200 px-6 py-4 text-gray-900">
                ${Math.round(resultat.approche_1_m2.moyenne_ttc * 0.10).toLocaleString("fr-FR")}€ TTC
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Approche 2 : Par postes -->
    <div class="bg-white p-8 md:p-12 mb-8">
      <h2 class="text-2xl font-serif text-gray-900 mb-8">2ème Approche : Détail par poste de travaux</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-[#f8f6f4]">
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Poste de travaux</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Fourchette basse (TTC)</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Fourchette haute (TTC)</th>
            </tr>
          </thead>
          <tbody>
            ${resultat.approche_2_postes.detail_postes.map((poste: any) => `
              <tr>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">${escapeHtml(poste.nom)}</td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${poste.montant_min_ttc.toLocaleString("fr-FR")}€
                </td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${poste.montant_max_ttc.toLocaleString("fr-FR")}€
                </td>
              </tr>
            `).join("")}
            <tr class="bg-[#f8f6f4] font-semibold">
              <td class="border border-gray-200 px-6 py-4 text-gray-900">Sous-total Mat & Main d'Œuvre</td>
              <td class="border border-gray-200 px-6 py-4 text-gray-900">
                Autour de ${resultat.approche_2_postes.total_min_ttc.toLocaleString("fr-FR")}€ TTC
              </td>
              <td class="border border-gray-200 px-6 py-4 text-gray-900">
                Autour de ${resultat.approche_2_postes.total_max_ttc.toLocaleString("fr-FR")}€ TTC
              </td>
            </tr>
            <tr class="bg-gray-900 text-white font-bold">
              <td class="border border-gray-200 px-6 py-4">Moyenne</td>
              <td colSpan="2" class="border border-gray-200 px-6 py-4">
                ${resultat.approche_2_postes.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Approche 3 : Par pièce -->
    <div class="bg-white p-8 md:p-12 mb-8">
      <h2 class="text-2xl font-serif text-gray-900 mb-4">3ème Approche : Calcul par pièce</h2>
      <p class="text-gray-600 mb-8">
        Incluant tous les corps de métiers. Sauf fenêtres, climatisation et équipements.
      </p>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-[#f8f6f4]">
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Pièce</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Surface</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Prix/m²</th>
              <th class="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Montant</th>
            </tr>
          </thead>
          <tbody>
            ${resultat.approche_3_pieces.detail_pieces.map((piece: any) => `
              <tr>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">${escapeHtml(piece.nom)}</td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">${piece.surface} m²</td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${Math.round(piece.montant_min_ttc / piece.surface).toLocaleString("fr-FR")} à ${Math.round(piece.montant_max_ttc / piece.surface).toLocaleString("fr-FR")}€ / m²
                </td>
                <td class="border border-gray-200 px-6 py-4 text-gray-900">
                  ${piece.montant_min_ttc.toLocaleString("fr-FR")} / ${piece.montant_max_ttc.toLocaleString("fr-FR")}€
                </td>
              </tr>
            `).join("")}
            <tr class="bg-[#f8f6f4] font-semibold">
              <td class="border border-gray-200 px-6 py-4 text-gray-900">
                TOTAL = ${estimation.pieces.reduce((sum: number, p: any) => sum + p.surface, 0)} m²
              </td>
              <td class="border border-gray-200 px-6 py-4 text-gray-900">
                +${resultat.approche_3_pieces.correction_pourcentage}% correction
              </td>
              <td colSpan="2" class="border border-gray-200 px-6 py-4 text-gray-900">
                ${resultat.approche_3_pieces.total_min_ttc.toLocaleString("fr-FR")} / ${resultat.approche_3_pieces.total_max_ttc.toLocaleString("fr-FR")}€
              </td>
            </tr>
            <tr class="bg-gray-900 text-white font-bold">
              <td colSpan="3" class="border border-gray-200 px-6 py-4">Moyenne</td>
              <td class="border border-gray-200 px-6 py-4">
                ${resultat.approche_3_pieces.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Synthèse finale -->
    <div class="bg-gray-900 p-8 md:p-12 mb-8 text-white">
      <h2 class="text-3xl md:text-4xl font-serif mb-8">Synthèse Finale</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-serif mb-6">Détail des coûts</h3>
          <div class="space-y-4">
            <div class="flex justify-between border-b border-white/20 pb-3">
              <span class="text-white/90">Travaux intellectuels :</span>
              <span class="font-semibold">
                ${resultat.budget_final.travaux_intellectuels_ttc.toLocaleString("fr-FR")}€ TTC
              </span>
            </div>
            <div class="flex justify-between border-b border-white/20 pb-3">
              <span class="text-white/90">Suivi des travaux (maîtrise d'œuvre) :</span>
              <span class="font-semibold">
                Environ ${resultat.budget_final.maitrise_oeuvre_ttc.toLocaleString("fr-FR")}€ TTC
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/90">Travaux manuels & Matériaux :</span>
              <span class="font-semibold">
                De ${resultat.budget_final.travaux_manuels_min_ttc.toLocaleString("fr-FR")}€ à ${resultat.budget_final.travaux_manuels_max_ttc.toLocaleString("fr-FR")}€ TTC
              </span>
            </div>
          </div>
        </div>
        <div class="bg-white/10 p-8">
          <h3 class="text-xl font-serif mb-6">Budget Global</h3>
          <div class="text-center">
            <p class="text-3xl font-serif mb-3">
              ${resultat.budget_final.total_min_ttc.toLocaleString("fr-FR")}€ à ${resultat.budget_final.total_max_ttc.toLocaleString("fr-FR")}€ TTC
            </p>
            <p class="text-lg text-white/80">
              Moyenne : ${resultat.budget_final.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}


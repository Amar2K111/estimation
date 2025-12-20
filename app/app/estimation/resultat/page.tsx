"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ResultatEstimation, NouvelleEstimation } from "@/lib/utils/estimation";
import { exporterEstimationPDF } from "@/lib/utils/pdf-export";

export default function ResultatEstimationPage() {
  const router = useRouter();
  const [data, setData] = useState<{ estimation: NouvelleEstimation; resultat: ResultatEstimation } | null>(null);

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/connexion");
      return;
    }

    const stored = localStorage.getItem("derniere_estimation");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.push("/app/estimation/nouvelle");
    }
  }, [router]);

  const exporterPDF = () => {
    if (data) {
      exporterEstimationPDF(data);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const { estimation, resultat } = data;

  return (
    <div className="min-h-screen bg-[#f8f6f4] py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* En-tête avec actions */}
        <div className="bg-white p-8 md:p-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900">
            Résultat de l'Estimation
          </h1>
          <div className="flex gap-4">
            <Link
              href="/app/estimation/nouvelle"
              className="bg-white text-gray-900 px-6 py-3 text-sm font-medium tracking-wide uppercase border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Nouvelle estimation
            </Link>
            <button
              onClick={exporterPDF}
              className="bg-gray-900 text-white px-6 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
            >
              Exporter PDF
            </button>
          </div>
        </div>

        {/* Informations client et projet */}
        <div className="bg-white p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-8">Informations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg text-gray-900 mb-4">Client</h3>
              <p className="text-gray-900 mb-2">{estimation.client.nom}</p>
              {estimation.client.email && <p className="text-gray-600 mb-1">{estimation.client.email}</p>}
              {estimation.client.telephone && <p className="text-gray-600">{estimation.client.telephone}</p>}
            </div>
            <div>
              <h3 className="font-serif text-lg text-gray-900 mb-4">Projet</h3>
              <p className="text-gray-900 mb-2">
                {estimation.projet.type_bien} - {estimation.projet.surface_totale} m²
              </p>
              <p className="text-gray-600 mb-1">
                {estimation.projet.localisation.ville}
                {estimation.projet.localisation.zone && ` - ${estimation.projet.localisation.zone}`}
              </p>
              <p className="text-gray-600">Niveau : {estimation.projet.niveau_renovation}</p>
            </div>
          </div>
        </div>

        {/* Approche 1 : Par m² */}
        <div className="bg-white p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-8">1ère Approche : Calcul par m²</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f6f4]">
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Surface</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Prix HT/m²</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Montant TTC</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Maîtrise d'Œuvre</th>
                </tr>
              </thead>
              <tbody>
                {resultat.approche_1_m2.prix_m2_ht.map((prix, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {estimation.projet.surface_totale} m² × {prix}€ HT/m²
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">{prix}€ HT</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {resultat.approche_1_m2.montants_ttc[index].toLocaleString("fr-FR")}€ TTC
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {Math.round(resultat.approche_1_m2.montants_ttc[index] * 0.10).toLocaleString("fr-FR")}€ TTC
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#f8f6f4] font-semibold">
                  <td colSpan={2} className="border border-gray-200 px-6 py-4 text-gray-900">Sous-total Mat & Main d'Œuvre</td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">
                    {resultat.approche_1_m2.moyenne_ttc.toLocaleString("fr-FR")}€ TTC (moyenne)
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">
                    {Math.round(resultat.approche_1_m2.moyenne_ttc * 0.10).toLocaleString("fr-FR")}€ TTC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Approche 2 : Par postes */}
        <div className="bg-white p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-8">2ème Approche : Détail par poste de travaux</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f6f4]">
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Poste de travaux</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Fourchette basse (TTC)</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Fourchette haute (TTC)</th>
                </tr>
              </thead>
              <tbody>
                {resultat.approche_2_postes.detail_postes.map((poste, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">{poste.nom}</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {poste.montant_min_ttc.toLocaleString("fr-FR")}€
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {poste.montant_max_ttc.toLocaleString("fr-FR")}€
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#f8f6f4] font-semibold">
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">Sous-total Mat & Main d'Œuvre</td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">
                    Autour de {resultat.approche_2_postes.total_min_ttc.toLocaleString("fr-FR")}€ TTC
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">
                    Autour de {resultat.approche_2_postes.total_max_ttc.toLocaleString("fr-FR")}€ TTC
                  </td>
                </tr>
                <tr className="bg-gray-900 text-white font-bold">
                  <td className="border border-gray-200 px-6 py-4">Moyenne</td>
                  <td colSpan={2} className="border border-gray-200 px-6 py-4">
                    {resultat.approche_2_postes.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Approche 3 : Par pièce */}
        <div className="bg-white p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">3ème Approche : Calcul par pièce</h2>
          <p className="text-gray-600 mb-8">
            Incluant tous les corps de métiers. Sauf fenêtres, climatisation et équipements.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f6f4]">
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Pièce</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Surface</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Prix/m²</th>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-medium tracking-wide uppercase text-gray-900">Montant</th>
                </tr>
              </thead>
              <tbody>
                {resultat.approche_3_pieces.detail_pieces.map((piece, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">{piece.nom}</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">{piece.surface} m²</td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {Math.round(piece.montant_min_ttc / piece.surface).toLocaleString("fr-FR")} à{" "}
                      {Math.round(piece.montant_max_ttc / piece.surface).toLocaleString("fr-FR")}€ / m²
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-gray-900">
                      {piece.montant_min_ttc.toLocaleString("fr-FR")} / {piece.montant_max_ttc.toLocaleString("fr-FR")}€
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#f8f6f4] font-semibold">
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">
                    TOTAL = {estimation.pieces.reduce((sum, p) => sum + p.surface, 0)} m²
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-900">
                    +{resultat.approche_3_pieces.correction_pourcentage}% correction
                  </td>
                  <td colSpan={2} className="border border-gray-200 px-6 py-4 text-gray-900">
                    {resultat.approche_3_pieces.total_min_ttc.toLocaleString("fr-FR")} /{" "}
                    {resultat.approche_3_pieces.total_max_ttc.toLocaleString("fr-FR")}€
                  </td>
                </tr>
                <tr className="bg-gray-900 text-white font-bold">
                  <td colSpan={3} className="border border-gray-200 px-6 py-4">Moyenne</td>
                  <td className="border border-gray-200 px-6 py-4">
                    {resultat.approche_3_pieces.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Synthèse finale */}
        <div className="bg-gray-900 p-8 md:p-12 mb-8 text-white">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Synthèse Finale</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-6">Détail des coûts</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/20 pb-3">
                  <span className="text-white/90">Travaux intellectuels :</span>
                  <span className="font-semibold">
                    {resultat.budget_final.travaux_intellectuels_ttc.toLocaleString("fr-FR")}€ TTC
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-3">
                  <span className="text-white/90">Suivi des travaux (maîtrise d'œuvre) :</span>
                  <span className="font-semibold">
                    Environ {resultat.budget_final.maitrise_oeuvre_ttc.toLocaleString("fr-FR")}€ TTC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/90">Travaux manuels & Matériaux :</span>
                  <span className="font-semibold">
                    De {resultat.budget_final.travaux_manuels_min_ttc.toLocaleString("fr-FR")}€ à{" "}
                    {resultat.budget_final.travaux_manuels_max_ttc.toLocaleString("fr-FR")}€ TTC
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8">
              <h3 className="text-xl font-serif mb-6">Budget Global</h3>
              <div className="text-center">
                <p className="text-3xl font-serif mb-3">
                  {resultat.budget_final.total_min_ttc.toLocaleString("fr-FR")}€ à{" "}
                  {resultat.budget_final.total_max_ttc.toLocaleString("fr-FR")}€ TTC
                </p>
                <p className="text-lg text-white/80">
                  Moyenne : {resultat.budget_final.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projets similaires utilisés */}
        {resultat.projets_similaires.length > 0 && (
          <div className="bg-white p-8 md:p-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-8">
              Projets similaires utilisés pour le calcul ({resultat.projets_similaires.length})
            </h2>
            <div className="space-y-3">
              {resultat.projets_similaires.map((projet) => (
                <div key={projet.id} className="bg-[#f8f6f4] p-4 border border-gray-200">
                  <p className="font-medium text-gray-900">
                    {projet.client} - {projet.caracteristiques.surface_totale} m² -{" "}
                    {projet.caracteristiques.niveau_renovation} - {projet.date_estimation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


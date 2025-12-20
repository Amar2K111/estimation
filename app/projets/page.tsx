"use client";

import Link from "next/link";
import { projetsExemple } from "@/lib/data/projets-exemple";

export default function ProjetsPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f4] py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="bg-white p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900">
              Mes Projets Historiques
            </h1>
            <Link
              href="/"
              className="bg-white text-gray-900 px-6 py-3 text-sm font-medium tracking-wide uppercase border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Accueil
            </Link>
          </div>
          <p className="text-gray-600 mb-4">
            Base de données de {projetsExemple.length} projets historiques utilisés pour les estimations.
          </p>
          <p className="text-sm text-gray-500 italic">
            Note : Ces données sont des exemples. L'architecte remplacera ces données par ses propres projets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projetsExemple.map((projet) => (
            <div key={projet.id} className="bg-white p-8 border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-serif text-gray-900 mb-2">{projet.client}</h2>
                  <p className="text-sm text-gray-600 mb-1">Estimation : {projet.date_estimation}</p>
                  {projet.date_realisation && (
                    <p className="text-sm text-gray-600">Réalisation : {projet.date_realisation}</p>
                  )}
                </div>
                <span className="bg-[#f8f6f4] text-gray-900 px-4 py-2 text-xs font-medium tracking-wide uppercase border border-gray-200">
                  {projet.caracteristiques.niveau_renovation}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs text-gray-600 mb-1 tracking-wide uppercase">Type</p>
                  <p className="font-medium text-gray-900">{projet.caracteristiques.type_bien}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 tracking-wide uppercase">Surface</p>
                  <p className="font-medium text-gray-900">{projet.caracteristiques.surface_totale} m²</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 tracking-wide uppercase">Localisation</p>
                  <p className="font-medium text-gray-900">
                    {projet.caracteristiques.localisation.ville}
                    {projet.caracteristiques.localisation.zone && ` - ${projet.caracteristiques.localisation.zone}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 tracking-wide uppercase">Nombre de pièces</p>
                  <p className="font-medium text-gray-900">{projet.caracteristiques.nombre_pieces}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-xs text-gray-600 mb-2 tracking-wide uppercase">Budget final</p>
                <p className="text-xl font-serif text-gray-900 mb-1">
                  {projet.budget_final.total_min_ttc.toLocaleString("fr-FR")}€ -{" "}
                  {projet.budget_final.total_max_ttc.toLocaleString("fr-FR")}€ TTC
                </p>
                <p className="text-sm text-gray-600">
                  Moyenne : {projet.budget_final.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <details className="text-sm">
                  <summary className="cursor-pointer text-gray-900 font-medium tracking-wide uppercase hover:text-gray-700 transition-colors">
                    Voir les détails
                  </summary>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="font-serif text-gray-900 mb-1">Approche 1 (m²) :</p>
                      <p className="text-gray-600">
                        {projet.approches_calcul.approche_1_m2.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-gray-900 mb-1">Approche 2 (postes) :</p>
                      <p className="text-gray-600">
                        {projet.approches_calcul.approche_2_postes.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-gray-900 mb-1">Approche 3 (pièces) :</p>
                      <p className="text-gray-600">
                        {projet.approches_calcul.approche_3_pieces.moyenne_ttc.toLocaleString("fr-FR")}€ TTC
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="font-serif text-gray-900 mb-1">Postes de travaux :</p>
                      <p className="text-gray-600">{projet.postes_travaux.length} postes</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


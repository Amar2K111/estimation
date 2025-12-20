"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculerEstimation, type NouvelleEstimation } from "@/lib/utils/estimation";

export default function NouvelleEstimationPage() {
  const router = useRouter();
  const [etape, setEtape] = useState(1);
  const [estimation, setEstimation] = useState<NouvelleEstimation>({
    client: {
      nom: "",
      email: "",
      telephone: ""
    },
    projet: {
      surface_totale: 0,
      type_bien: "Appartement",
      localisation: {
        ville: "",
        zone: ""
      },
      niveau_renovation: "Standard"
    },
    pieces: [],
    options: {
      sanitaires: false,
      cuisine: false,
      climatisation: false,
      menuiseries_exterieures: false,
      appareillages_electriques: false,
      amenagements: false
    }
  });

  const [nouvellePiece, setNouvellePiece] = useState({
    nom: "",
    surface: 0,
    type: "standard" as "standard" | "premium"
  });

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/connexion");
    }
  }, [router]);

  const ajouterPiece = () => {
    if (nouvellePiece.nom && nouvellePiece.surface > 0) {
      setEstimation({
        ...estimation,
        pieces: [...estimation.pieces, { ...nouvellePiece }]
      });
      setNouvellePiece({ nom: "", surface: 0, type: "standard" });
    }
  };

  const supprimerPiece = (index: number) => {
    setEstimation({
      ...estimation,
      pieces: estimation.pieces.filter((_, i) => i !== index)
    });
  };

  const calculer = () => {
    const resultat = calculerEstimation(estimation);
    // Sauvegarder dans le localStorage pour l'affichage
    localStorage.setItem("derniere_estimation", JSON.stringify({
      estimation,
      resultat
    }));
    router.push("/app/estimation/resultat");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f4] py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className="bg-white p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-12">
            Nouvelle Estimation
          </h1>

          {/* Indicateur d'étapes */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex-1 text-center ${etape >= 1 ? "text-gray-900" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-colors ${etape >= 1 ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-300"}`}>
                  {etape > 1 ? "✓" : "1"}
                </div>
                <p className="text-sm font-medium tracking-wide uppercase">Client</p>
              </div>
              <div className={`flex-1 text-center ${etape >= 2 ? "text-gray-900" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-colors ${etape >= 2 ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-300"}`}>
                  {etape > 2 ? "✓" : "2"}
                </div>
                <p className="text-sm font-medium tracking-wide uppercase">Projet</p>
              </div>
              <div className={`flex-1 text-center ${etape >= 3 ? "text-gray-900" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-colors ${etape >= 3 ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-300"}`}>
                  {etape > 3 ? "✓" : "3"}
                </div>
                <p className="text-sm font-medium tracking-wide uppercase">Pièces</p>
              </div>
              <div className={`flex-1 text-center ${etape >= 4 ? "text-gray-900" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-colors ${etape >= 4 ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-300"}`}>
                  4
                </div>
                <p className="text-sm font-medium tracking-wide uppercase">Options</p>
              </div>
            </div>
          </div>

          {/* Étape 1 : Informations client */}
          {etape === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Informations Client</h2>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Nom du client *
                </label>
                <input
                  type="text"
                  value={estimation.client.nom}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    client: { ...estimation.client, nom: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={estimation.client.email}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    client: { ...estimation.client, email: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={estimation.client.telephone}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    client: { ...estimation.client, telephone: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                />
              </div>
              <button
                onClick={() => estimation.client.nom && setEtape(2)}
                className="w-full bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
              >
                Suivant
              </button>
            </div>
          )}

          {/* Étape 2 : Caractéristiques du projet */}
          {etape === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Caractéristiques du Projet</h2>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Surface totale (m²) *
                </label>
                <input
                  type="number"
                  value={estimation.projet.surface_totale || ""}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    projet: { ...estimation.projet, surface_totale: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Type de bien *
                </label>
                <select
                  value={estimation.projet.type_bien}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    projet: { ...estimation.projet, type_bien: e.target.value as "Appartement" | "Maison" }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white"
                >
                  <option value="Appartement">Appartement</option>
                  <option value="Maison">Maison</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Ville *
                </label>
                <input
                  type="text"
                  value={estimation.projet.localisation.ville}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    projet: {
                      ...estimation.projet,
                      localisation: { ...estimation.projet.localisation, ville: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Zone
                </label>
                <input
                  type="text"
                  value={estimation.projet.localisation.zone}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    projet: {
                      ...estimation.projet,
                      localisation: { ...estimation.projet.localisation, zone: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  placeholder="Centre, Périphérie, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                  Niveau de rénovation *
                </label>
                <select
                  value={estimation.projet.niveau_renovation}
                  onChange={(e) => setEstimation({
                    ...estimation,
                    projet: {
                      ...estimation.projet,
                      niveau_renovation: e.target.value as "Économique" | "Standard" | "Premium" | "Luxe"
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white"
                >
                  <option value="Économique">Économique</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxe">Luxe</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setEtape(1)}
                  className="flex-1 bg-white text-gray-900 px-8 py-4 text-sm font-medium tracking-wide uppercase border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  Précédent
                </button>
                <button
                  onClick={() => estimation.projet.surface_totale > 0 && estimation.projet.localisation.ville && setEtape(3)}
                  className="flex-1 bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Étape 3 : Pièces */}
          {etape === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Pièces du Projet</h2>
              
              <div className="bg-[#f8f6f4] p-6 mb-6">
                <h3 className="font-serif text-lg mb-4">Ajouter une pièce</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Nom (ex: Salon)"
                    value={nouvellePiece.nom}
                    onChange={(e) => setNouvellePiece({ ...nouvellePiece, nom: e.target.value })}
                    className="px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Surface (m²)"
                    value={nouvellePiece.surface || ""}
                    onChange={(e) => setNouvellePiece({ ...nouvellePiece, surface: parseFloat(e.target.value) || 0 })}
                    className="px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white"
                  />
                  <select
                    value={nouvellePiece.type}
                    onChange={(e) => setNouvellePiece({ ...nouvellePiece, type: e.target.value as "standard" | "premium" })}
                    className="px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white"
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                  <button
                    onClick={ajouterPiece}
                    className="bg-gray-900 text-white px-4 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {estimation.pieces.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg mb-4">Pièces ajoutées :</h3>
                  {estimation.pieces.map((piece, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#f8f6f4] p-4 border border-gray-200">
                      <span className="font-medium text-gray-900">{piece.nom} - {piece.surface} m² ({piece.type})</span>
                      <button
                        onClick={() => supprimerPiece(index)}
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium tracking-wide uppercase transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setEtape(2)}
                  className="flex-1 bg-white text-gray-900 px-8 py-4 text-sm font-medium tracking-wide uppercase border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setEtape(4)}
                  className="flex-1 bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Étape 4 : Options */}
          {etape === 4 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Options du Projet</h2>
              <p className="text-gray-600 mb-8">Cochez les options souhaitées par le client :</p>
              
              <div className="space-y-4">
                {[
                  { key: "sanitaires", label: "Sanitaires" },
                  { key: "cuisine", label: "Cuisine" },
                  { key: "climatisation", label: "Climatisation" },
                  { key: "menuiseries_exterieures", label: "Menuiseries extérieures" },
                  { key: "appareillages_electriques", label: "Appareillages électriques" },
                  { key: "amenagements", label: "Aménagements (dressing, buanderie, etc.)" }
                ].map((option) => (
                  <label key={option.key} className="flex items-center space-x-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={estimation.options[option.key as keyof typeof estimation.options]}
                      onChange={(e) => setEstimation({
                        ...estimation,
                        options: {
                          ...estimation.options,
                          [option.key]: e.target.checked
                        }
                      })}
                      className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <span className="text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{option.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setEtape(3)}
                  className="flex-1 bg-white text-gray-900 px-8 py-4 text-sm font-medium tracking-wide uppercase border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  Précédent
                </button>
                <button
                  onClick={calculer}
                  className="flex-1 bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
                >
                  Calculer l'estimation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


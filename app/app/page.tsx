"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AppDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/connexion");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8f6f4] py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Tableau de bord
          </h1>
          <p className="text-lg text-gray-600">
            Gérez vos estimations et projets depuis cet espace centralisé.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Nouvelle Estimation */}
          <Link
            href="/app/estimation/nouvelle"
            className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-colors group"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#f8f6f4] flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                <svg
                  className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-3">
              Nouvelle Estimation
            </h2>
            <p className="text-gray-600">
              Créez une nouvelle estimation en 5 minutes basée sur vos projets historiques.
            </p>
          </Link>

          {/* Mes Projets */}
          <Link
            href="/app/projets"
            className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-colors group"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#f8f6f4] flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                <svg
                  className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-3">
              Mes Projets
            </h2>
            <p className="text-gray-600">
              Consultez et gérez votre base de données de projets historiques.
            </p>
          </Link>

          {/* Historique des Estimations */}
          <Link
            href="/app/estimation/historique"
            className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-colors group"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#f8f6f4] flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                <svg
                  className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-3">
              Historique
            </h2>
            <p className="text-gray-600">
              Consultez l'historique de toutes vos estimations précédentes.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}


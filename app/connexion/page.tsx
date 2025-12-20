"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Authentification simple (pour démo, accepte n'importe quel email/mot de passe)
    // En production, remplacer par une vraie authentification
    if (email && password) {
      // Simuler une connexion réussie
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      router.push("/app");
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f4] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 md:p-12">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif text-gray-900 tracking-tight">
                Estimation
              </span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              Connexion
            </h1>
            <p className="text-gray-600">
              Accédez à votre espace d'estimation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <span className="text-gray-500">Mode démo :</span> Utilisez n'importe quel email et mot de passe pour vous connecter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


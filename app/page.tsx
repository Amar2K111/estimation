import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#f8f6f4] pt-24 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6 leading-tight">
              Estimation Intelligente
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Générez une estimation professionnelle en 5 minutes au lieu de 2 heures,
              basée sur vos projets historiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/connexion"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
              >
                Se connecter
              </Link>
              <Link
                href="/connexion"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-sm font-medium tracking-wide uppercase border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Démarrer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
                Pourquoi choisir cet outil ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Un outil conçu pour les architectes d'intérieur qui souhaitent gagner du temps
                tout en fournissant des estimations précises et professionnelles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-[#f8f6f4] rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">Rapide</h3>
                <p className="text-gray-600 leading-relaxed">
                  5 minutes au lieu de 2 heures pour générer une estimation complète et professionnelle.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-[#f8f6f4] rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">Intelligent</h3>
                <p className="text-gray-600 leading-relaxed">
                  Basé sur vos projets réels passés pour des estimations cohérentes et crédibles.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-[#f8f6f4] rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">Professionnel</h3>
                <p className="text-gray-600 leading-relaxed">
                  Export PDF prêt à envoyer directement à vos clients par email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f8f6f4]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Créez votre première estimation en quelques minutes et découvrez
              comment cet outil peut transformer votre façon de travailler.
            </p>
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-200"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

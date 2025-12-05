// src/components/Hero.jsx
export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary via-indigo-900 to-black text-white pt-32 pb-20 overflow-hidden">
      {/* Élément décoratif type "Swoosh" du logo en arrière plan */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-left animate-fade-in-up">
          <span className="text-secondary font-bold tracking-wider uppercase mb-2 block">
            Plateforme de visibilité Hybride
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-tight mb-6">
            Faites passer votre talent au <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">niveau supérieur</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg">
            Transformez vos vues en fans et vos fans en clients. Une solution complète : Média + Agence pour artistes et entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-secondary hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg shadow-xl transition-all">
              Découvrir les offres
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-4 px-8 rounded-lg transition-all">
              Voir la démo
            </button>
          </div>
        </div>
        
        {/* Image illustrative (Mockup dashboard ou artiste heureux) */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                {/* Simulation d'une carte de stats "Level Boost" */}
                <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center font-bold">LB</div>
                    <div>
                        <div className="h-2 w-24 bg-gray-400 rounded mb-2"></div>
                        <div className="h-2 w-16 bg-gray-500 rounded"></div>
                    </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">+ 150%</div>
                <div className="text-sm text-gray-300">Croissance d'audience en 30 jours</div>
            </div>
        </div>
      </div>
    </div>
  );
}
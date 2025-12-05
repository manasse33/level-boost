import { motion } from 'framer-motion';
import { Trophy, Clock, ArrowRight, Star, TrendingUp, Music } from 'lucide-react';

const activeContests = [
  { 
    id: 1, 
    tag: "Viral", 
    title: "#LevelBoostLaunch", 
    prize: "Pack Premium (450k)", 
    deadline: "J-4", 
    color: "bg-red-50 text-red-600 border-red-200",
    icon: <TrendingUp />
  },
  { 
    id: 2, 
    tag: "Musique", 
    title: "Meilleur Clip du Mois", 
    prize: "Booking Festival", 
    deadline: "En cours", 
    color: "bg-blue-50 text-blue-600 border-blue-200",
    icon: <Music />
  },
  { 
    id: 3, 
    tag: "Talent", 
    title: "Top 10 Nouveaux Artistes", 
    prize: "Mise en avant", 
    deadline: "Mensuel", 
    color: "bg-purple-50 text-purple-600 border-purple-200",
    icon: <Star />
  },
];

export default function Concours() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      
      {/* HERO SECTION : Asymétrique et lumineux */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2 text-secondary font-bold uppercase tracking-widest mb-4">
                    <span className="w-8 h-1 bg-secondary"></span>
                    <span>L'Arène des Talents</span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-display font-black text-primary leading-tight mb-6">
                    Prouvez votre <br/>
                    <span className="relative inline-block">
                        valeur.
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>
                <p className="text-xl text-gray-500 mb-8">
                    Participez à nos challenges officiels, gagnez en visibilité et débloquez des financements exclusifs.
                </p>
            </div>
            
            {/* Featured Visual - Abstract Composition */}
            <div className="md:w-1/2 relative h-[400px] w-full bg-gray-100 rounded-[3rem] overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&q=80" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Featured Artist"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8 text-white">
                    <div className="bg-white text-primary px-4 py-1 rounded-full text-sm font-bold w-fit mb-2">Challenge du moment</div>
                    <div className="text-3xl font-bold">#LevelBoostLaunch</div>
                </div>
            </div>
        </div>
      </div>

      {/* LISTE DES CONCOURS : Style "Tickets" */}
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-400 mb-8 border-b border-gray-100 pb-4">Challenges actifs</h2>
        
        <div className="space-y-6">
            {activeContests.map((c, i) => (
                <motion.div 
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#F8FAFC" }}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                    {/* Bande latérale de couleur */}
                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${c.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>

                    <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
                        {/* Icon Box */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 md:mb-0 md:mr-8 ${c.color}`}>
                            {c.icon}
                        </div>

                        {/* Info Principales */}
                        <div className="flex-grow text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start space-x-3 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${c.color}`}>{c.tag}</span>
                                <span className="text-gray-400 text-xs flex items-center"><Clock className="w-3 h-3 mr-1"/> {c.deadline}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">{c.title}</h3>
                            <p className="text-gray-500 text-sm">Récompense : <span className="font-bold text-gray-700">{c.prize}</span></p>
                        </div>

                        {/* Action Button (Arrow) */}
                        <div className="mt-4 md:mt-0">
                            <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Décoration "Ticket Cutout" (Cercles blancs sur les côtés) */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full border-r border-gray-200"></div>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full border-l border-gray-200"></div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
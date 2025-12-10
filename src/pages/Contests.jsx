import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, Mic, Video, Users, TrendingUp, Heart, Star, ArrowRight, X } from 'lucide-react';

// Données basées sur le PDF
const CONTESTS_DATA = [
    {
        id: 1,
        title: "Top 10 Nouveaux Talents",
        category: "Découverte",
        description: "Le classement mensuel des artistes les plus prometteurs. Visibilité massive à la clé.",
        reward: "Mise en avant Newsletter + Post",
        icon: Star,
        color: "bg-yellow-500"
    },
    {
        id: 2,
        title: "Challenge Viral #LevelBoostLaunch",
        category: "Engagement",
        description: "Créez le contenu le plus créatif avec notre filtre officiel. Le plus de vues gagne.",
        reward: "Pack Premium (450k FCFA)",
        icon: Video,
        color: "bg-indigo-500"
    },
    {
        id: 3,
        title: "Pitch Contest Startups",
        category: "Business",
        description: "3 minutes pour convaincre nos investisseurs partenaires. Présentez votre innovation.",
        reward: "Financement Seed 5M FCFA",
        icon: TrendingUp,
        color: "bg-emerald-600"
    },
    {
        id: 4,
        title: "Meilleur Clip #Winter25",
        category: "Création",
        description: "Compétition de réalisation vidéo. Thème : 'Renaissance'.",
        reward: "Diffusion TV partenaire",
        icon: Mic,
        color: "bg-purple-600"
    },
    {
        id: 5,
        title: "Challenge Solidaire",
        category: "Impact",
        description: "Les partages sont transformés en dons pour une association locale.",
        reward: "Sponsoring Projet Social",
        icon: Heart,
        color: "bg-red-500"
    },
    {
        id: 6,
        title: "Ambassadeur Level Boost",
        category: "Fidélisation",
        description: "Recrutez des talents et gagnez des commissions et des accès VIP.",
        reward: "Contrat Ambassadeur 1 an",
        icon: Users,
        color: "bg-blue-500"
    }
];

const FILTERS = ["Tout", "Découverte", "Engagement", "Business", "Création", "Impact"];

export default function Concours() {
    const [activeFilter, setActiveFilter] = useState("Tout");
    const [selectedContest, setSelectedContest] = useState(null);

    const filteredContests = activeFilter === "Tout" 
        ? CONTESTS_DATA 
        : CONTESTS_DATA.filter(c => c.category === activeFilter);

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pb-20"
        >
            {/* Header Section */}
            <div className="bg-slate-900 pt-24 pb-20 px-4 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm font-bold mb-6"
                    >
                        <Trophy className="w-4 h-4" /> Saison 2025 Ouverte
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        L'Arène des <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Champions</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Participez à nos challenges pour gagner en visibilité, décrocher des financements et booster votre carrière.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-12">
                <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-wrap gap-2 justify-center md:justify-start">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeFilter === filter 
                                    ? 'bg-slate-900 text-white shadow-lg transform scale-105' 
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Content */}
            <div className="max-w-7xl mx-auto px-4">
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredContests.map((contest) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={contest.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100"
                            >
                                <div className={`h-3 bg-gradient-to-r ${contest.color === 'bg-yellow-500' ? 'from-yellow-400 to-orange-500' : 'from-indigo-500 to-purple-500'}`} />
                                <div className="p-8">
                                    <div className={`w-14 h-14 ${contest.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                                        <contest.icon className="w-7 h-7" />
                                    </div>
                                    
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                            {contest.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{contest.title}</h3>
                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        {contest.description}
                                    </p>

                                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                                        <div className="text-xs text-slate-400 font-bold uppercase mb-1">Récompense</div>
                                        <div className="font-bold text-indigo-600">{contest.reward}</div>
                                    </div>

                                    <button 
                                        onClick={() => setSelectedContest(contest)}
                                        className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center group/btn"
                                    >
                                        Participer <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal Participation (Simplifiée) */}
            <AnimatePresence>
                {selectedContest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
                        >
                            <button 
                                onClick={() => setSelectedContest(null)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-2xl font-bold mb-2">Participer à {selectedContest.title}</h3>
                            <p className="text-slate-500 mb-6">Remplissez ce formulaire pour valider votre inscription.</p>
                            
                            {/* Formulaire factice pour la démo */}
                            <div className="space-y-4">
                                <input type="text" placeholder="Nom d'artiste / Projet" className="w-full p-3 bg-slate-50 border rounded-lg" />
                                <input type="email" placeholder="Email" className="w-full p-3 bg-slate-50 border rounded-lg" />
                                <input type="text" placeholder="Lien vers votre œuvre (YouTube/Drive)" className="w-full p-3 bg-slate-50 border rounded-lg" />
                                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg mt-4">Envoyer ma participation</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
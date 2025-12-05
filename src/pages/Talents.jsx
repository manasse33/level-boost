import { useState } from 'react';
import Reveal from '../components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["Tous", "Artistes", "Startups", "Influenceurs"];

const items = [
    { id: 1, name: "Sarah L.", role: "Chanteuse Pop", type: "Artistes", img: "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=500" },
    { id: 2, name: "TechFlow", role: "App Fintech", type: "Startups", img: "https://images.unsplash.com/photo-1559136555-930d72f1d30c?w=500" },
    { id: 3, name: "Marc D.", role: "Danseur", type: "Artistes", img: "https://images.unsplash.com/photo-1535525266644-b72ef6a92047?w=500" },
    { id: 4, name: "GreenEat", role: "Bio Food", type: "Startups", img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500" },
    { id: 5, name: "Julie Vlog", role: "Lifestyle", type: "Influenceurs", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500" },
    { id: 6, name: "AfroBeat Z", role: "Groupe", type: "Artistes", img: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500" },
];

export default function Talents() {
  const [filter, setFilter] = useState("Tous");

  const filteredItems = filter === "Tous" ? items : items.filter(item => item.type === filter);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal>
            <h1 className="text-4xl font-display font-bold text-primary mb-8 text-center">Talents & Projets à la Une</h1>
            
            {/* Filtres */}
            <div className="flex justify-center space-x-2 md:space-x-4 mb-12 flex-wrap gap-y-2">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${filter === cat ? 'bg-primary text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </Reveal>

        {/* Grid animée */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {filteredItems.map((item) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={item.id} 
                        className="group relative h-96 rounded-xl overflow-hidden cursor-pointer"
                    >
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                        
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 block">{item.role}</span>
                            <h3 className="text-white text-2xl font-bold">{item.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
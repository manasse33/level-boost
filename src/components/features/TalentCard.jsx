import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Badge } from '../common'; // adapte le chemin selon ta structure
import React from 'react';

export const TalentCard = ({ talent, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    onClick={onClick}
    className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
  >
    <img 
      src={talent.img} 
      alt={talent.name} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]" 
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
    
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
        <Eye className="w-8 h-8" />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 p-6 w-full z-10">
      <Badge variant="primary" size="sm" className="mb-2">
        {talent.role}
      </Badge>
      <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
        {talent.name}
      </h3>
      <p className="text-slate-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Voir le profil complet
      </p>
    </div>
  </motion.div>
);

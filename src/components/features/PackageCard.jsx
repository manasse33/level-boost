
import { motion } from 'framer-motion';
import { Eye ,Check} from 'lucide-react';
import { Badge,Button } from '../common'; // adapte le chemin selon ta structure
import React from 'react';

export const PackageCard = ({ package: pkg, onSelect, isPopular = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`relative bg-white rounded-2xl p-8 ${
      isPopular 
        ? 'border-2 border-indigo-600 shadow-2xl scale-105' 
        : 'border border-slate-200 shadow-lg'
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white rounded-full text-sm font-bold">
        RECOMMANDÉ
      </div>
    )}

    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
      <p className="text-slate-600 text-sm">{pkg.description}</p>
    </div>

    <div className="text-center mb-8">
      <div className="flex items-baseline justify-center mb-2">
        <span className="text-5xl font-bold text-slate-900">{pkg.price}</span>
        <span className="text-slate-600 ml-2">FCFA</span>
      </div>
      <p className="text-sm text-slate-500">/{pkg.duration_days} jours</p>
    </div>

    <ul className="space-y-4 mb-8">
      {pkg.features.map((feature, idx) => (
        <li key={idx} className="flex items-start">
          <Check className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
          <span className="text-slate-600 text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    <Button
      onClick={() => onSelect(pkg)}
      variant={isPopular ? 'primary' : 'secondary'}
      fullWidth
    >
      Choisir ce pack
    </Button>

    {pkg.special_offer && (
      <div className="mt-4 text-center">
        <Badge variant="warning" size="sm">
          🎉 {pkg.special_offer}
        </Badge>
      </div>
    )}
  </motion.div>
);

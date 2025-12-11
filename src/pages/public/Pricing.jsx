// ============= PRICING PAGE =============
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Badge, Card,PageLoader,Button} from '../../components/common'; // adapte selon ton arborescence
import { Modal } from '../../components'; // ou ton chemin exact
import { ContestParticipationForm } from '../../components/forms'; // chemin exact
import { PackageCard } from '../../components/features'; // chemin exact
import {Star} from 'lucide-react'
export const PricingPage = ({ onNavigate }) => {
  const packages = [
    {
      name: "Starter",
      price: "60000",
      description: "L'essentiel pour démarrer votre présence digitale",
      features: [
        "Fiche artiste enrichie",
        "2 posts sociaux / mois",
        "Support par email",
        "Visibilité locale"
      ],
      popular: false,
    },
    {
      name: "Pro Growth",
      price: "150000",
      description: "Pour les artistes et marques en pleine accélération",
      features: [
        "Tout du pack Starter",
        "Mini-vidéo promo (45s)",
        "Campagne Ads sponsorisée",
        "Rapport de performance",
        "Badge 'Vérifié'"
      ],
      popular: true,
    },
    {
      name: "Elite Business",
      price: "450000",
      description: "Une équipe complète dédiée à votre carrière",
      features: [
        "Production vidéo Premium",
        "Community Management complet",
        "Budget Pub inclus (150k)",
        "Mise en relation Label/Investisseurs",
        "Accès prioritaire aux studios"
      ],
      popular: false,
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Nos Tarifs</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des tarifs transparents, sans frais cachés. Choisissez le niveau d'accompagnement 
            qui correspond à vos ambitions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <PackageCard
              key={idx}
              package={pkg}
              isPopular={pkg.popular}
              onSelect={() => onNavigate('/register')}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Besoin d'un pack personnalisé ?
          </p>
          <Button variant="outline">
            Contactez-nous
          </Button>
        </div>
      </div>
    </div>
  );
};
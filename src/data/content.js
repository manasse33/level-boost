// src/data/content.js
import { Music, TrendingUp, Star, Video, Camera, Mic, Users, Megaphone } from 'lucide-react';

export const PACKS = [
    {
        id: 'decouverte',
        name: "Pack Découverte",
        price: "25 000 FCFA",
        description: "L'essentiel pour exister. Idéal pour débuter.",
        features: ["Fiche profil sur la plateforme", "1 Post de mise en avant", "1 Story Instagram/Facebook", "Remontée Newsletter"],
        isPopular: false,
        buttonVariant: "outline"
    },
    {
        id: 'basique',
        name: "Pack Basique",
        price: "60 000 FCFA",
        description: "Enrichissez votre image et engagez votre audience.",
        features: ["Fiche profil enrichie (Bio, Liens)", "2 Posts (Carrousel/Vidéo)", "3 Stories", "2 semaines de promo organique"],
        isPopular: false,
        buttonVariant: "outline"
    },
    {
        id: 'standard',
        name: "Pack Standard",
        price: "150 000 FCFA",
        description: "Le best-seller pour les artistes et startups en croissance.",
        features: ["Tout du pack Basique", "Mini-vidéo promo (45s)", "Campagne Ads (Setup inclus)", "Optimisation SEO", "Rapport complet"],
        isPopular: true,
        buttonVariant: "primary" // Indigo
    },
    {
        id: 'premium',
        name: "Pack Premium",
        price: "450 000 FCFA",
        description: "Une équipe complète dédiée : Production & Ads.",
        features: ["Vidéo Pro (1-2 min)", "Shooting Photo Pro (1h)", "Community Management (1 mois)", "Plan Média Sponsorisé", "Coaching Pitch"],
        isPopular: false,
        buttonVariant: "dark" // Slate-900
    }
];

export const SERVICES = [
    { icon: Video, title: "Production Vidéo", desc: "Clips 4K, snack content, interviews et couverture d'événements.", price: "Dès 60k FCFA" },
    { icon: Megaphone, title: "Publicité Digitale", desc: "Gestion de campagnes Facebook/Insta Ads & Google Ads.", price: "Setup 40k + 10%" },
    { icon: Users, title: "Community Management", desc: "Animation de communauté, modération et calendriers éditoriaux.", price: "100k FCFA/mois" },
    { icon: Camera, title: "Shooting Photo", desc: "Séance photo professionnelle pour votre image de marque.", price: "50k FCFA/h" },
    { icon: Mic, title: "Coaching & Pitch", desc: "Media training et préparation aux pitchs investisseurs.", price: "Sur devis" },
    { icon: TrendingUp, title: "Audit Stratégique", desc: "Analyse complète de votre présence digitale et recommandations.", price: "50k FCFA" },
];

export const TALENTS_DATA = [
    { 
      id: 1, name: "Sarah L.", role: "Pop / R&B", type: "Artistes", 
      img: "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=800&q=80",
      bio: "Sarah L. redéfinit la scène Pop locale avec des textes poignants.",
      stats: { fans: "45k", streams: "1.2M", engagement: "8.5%" }
    },
    { 
      id: 2, name: "TechFlow", role: "Fintech", type: "Startups", 
      img: "https://images.unsplash.com/photo-1559136555-930d72f1d30c?w=800&q=80",
      bio: "La solution de paiement qui simplifie la vie des créateurs africains.",
      stats: { users: "12k", vol: "500M", growth: "+300%" }
    },
    // ... Ajoutez les autres talents ici
];
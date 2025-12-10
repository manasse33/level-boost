// ============= FORM COMPONENTS =============
// Formulaires spécifiques pour les différentes entités

import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Calendar, AlertCircle } from 'lucide-react';
import { Input, Textarea, Select, Button, Alert } from './common';

// ============= PROFILE FORM =============
export const ProfileForm = ({ profile = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: profile?.type || '',
    title: profile?.title || '',
    description: profile?.description || '',
    category: profile?.category || '',
    website: profile?.website || '',
    social_links: profile?.social_links || { instagram: '', facebook: '', twitter: '' },
  });

  const [errors, setErrors] = useState({});

  const profileTypes = [
    { value: 'artist', label: 'Artiste' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'startup', label: 'Startup' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'influencer', label: 'Influenceur' },
    { value: 'event', label: 'Événementiel' },
    { value: 'association', label: 'Association' },
    { value: 'business', label: 'Entreprise' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value }
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.type) newErrors.type = 'Type requis';
    if (!formData.title) newErrors.title = 'Titre requis';
    if (!formData.description) newErrors.description = 'Description requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Alert
        type="info"
        message="Créez un profil professionnel pour commencer à recevoir des opportunités."
      />

      <Select
        label="Type de profil"
        value={formData.type}
        onChange={(val) => handleChange('type', val)}
        options={profileTypes}
        error={errors.type}
        required
      />

      <Input
        label="Nom du profil"
        value={formData.title}
        onChange={(val) => handleChange('title', val)}
        placeholder="Ex: Sarah L. Music"
        error={errors.title}
        required
      />

      <Textarea
        label="Description"
        value={formData.description}
        onChange={(val) => handleChange('description', val)}
        placeholder="Décrivez votre activité, votre style, vos objectifs..."
        error={errors.description}
        rows={4}
        required
      />

      <Input
        label="Catégorie / Genre"
        value={formData.category}
        onChange={(val) => handleChange('category', val)}
        placeholder="Ex: Pop, Tech, Fashion..."
      />

      <Input
        label="Site web"
        value={formData.website}
        onChange={(val) => handleChange('website', val)}
        placeholder="https://..."
        icon={LinkIcon}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-4">
          Réseaux sociaux
        </label>
        <div className="space-y-3">
          <Input
            value={formData.social_links.instagram || ''}
            onChange={(val) => handleSocialChange('instagram', val)}
            placeholder="@votre_compte_instagram"
          />
          <Input
            value={formData.social_links.facebook || ''}
            onChange={(val) => handleSocialChange('facebook', val)}
            placeholder="facebook.com/votre_page"
          />
          <Input
            value={formData.social_links.twitter || ''}
            onChange={(val) => handleSocialChange('twitter', val)}
            placeholder="@votre_twitter"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {profile ? 'Mettre à jour' : 'Créer le profil'}
        </Button>
      </div>
    </div>
  );
};

// ============= ORDER FORM =============
export const OrderForm = ({ packages, profiles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    package_id: '',
    profile_id: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.package_id) newErrors.package_id = 'Sélectionnez un pack';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const selectedPackage = packages.find(p => p.id === formData.package_id);

  return (
    <div className="space-y-6">
      <Alert
        type="info"
        message="Choisissez le pack qui correspond le mieux à vos besoins."
      />

      <Select
        label="Pack"
        value={formData.package_id}
        onChange={(val) => handleChange('package_id', val)}
        options={packages.map(p => ({ value: p.id, label: `${p.name} - ${p.price} FCFA` }))}
        error={errors.package_id}
        required
      />

      {selectedPackage && (
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2">{selectedPackage.name}</h4>
          <p className="text-sm text-indigo-700 mb-3">{selectedPackage.description}</p>
          <div className="text-2xl font-bold text-indigo-900">
            {selectedPackage.price.toLocaleString()} FCFA
          </div>
          <p className="text-xs text-indigo-600 mt-1">Durée: {selectedPackage.duration_days} jours</p>
        </div>
      )}

      {profiles && profiles.length > 0 && (
        <Select
          label="Profil associé (optionnel)"
          value={formData.profile_id}
          onChange={(val) => handleChange('profile_id', val)}
          options={profiles.map(p => ({ value: p.id, label: p.title }))}
          placeholder="Aucun profil"
        />
      )}

      <Textarea
        label="Notes / Instructions spéciales"
        value={formData.notes}
        onChange={(val) => handleChange('notes', val)}
        placeholder="Informations complémentaires pour votre commande..."
        rows={4}
      />

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Passer la commande
        </Button>
      </div>
    </div>
  );
};



// ============= POST FORM =============
export const PostForm = ({ post = null, profiles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    profile_id: post?.profile_id || '',
    type: post?.type || 'image',
    title: post?.title || '',
    content: post?.content || '',
    scheduled_at: post?.scheduled_at || '',
  });

  const [errors, setErrors] = useState({});

  const postTypes = [
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Vidéo' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'story', label: 'Story' },
    { value: 'article', label: 'Article' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.profile_id) newErrors.profile_id = 'Sélectionnez un profil';
    if (!formData.title) newErrors.title = 'Titre requis';
    if (!formData.content) newErrors.content = 'Contenu requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Select
        label="Profil"
        value={formData.profile_id}
        onChange={(val) => handleChange('profile_id', val)}
        options={profiles.map(p => ({ value: p.id, label: p.title }))}
        error={errors.profile_id}
        required
      />

      <Select
        label="Type de post"
        value={formData.type}
        onChange={(val) => handleChange('type', val)}
        options={postTypes}
        required
      />

      <Input
        label="Titre"
        value={formData.title}
        onChange={(val) => handleChange('title', val)}
        placeholder="Titre accrocheur..."
        error={errors.title}
        required
      />

      <Textarea
        label="Contenu"
        value={formData.content}
        onChange={(val) => handleChange('content', val)}
        placeholder="Votre message, hashtags..."
        error={errors.content}
        rows={6}
        required
      />

      <Input
        label="Programmer pour le"
        type="datetime-local"
        value={formData.scheduled_at}
        onChange={(val) => handleChange('scheduled_at', val)}
        icon={Calendar}
      />

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {post ? 'Mettre à jour' : 'Créer le post'}
        </Button>
      </div>
    </div>
  );
};

// ============= CAMPAIGN FORM =============
export const CampaignForm = ({ campaign = null, profiles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    profile_id: campaign?.profile_id || '',
    name: campaign?.name || '',
    type: campaign?.type || 'awareness',
    budget: campaign?.budget || '',
    platform: campaign?.platform || [],
  });

  const [errors, setErrors] = useState({});

  const campaignTypes = [
    { value: 'awareness', label: 'Notoriété' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'conversion', label: 'Conversion' },
    { value: 'traffic', label: 'Trafic' },
  ];

  const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'google', label: 'Google Ads' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const togglePlatform = (platform) => {
    const current = formData.platform || [];
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    handleChange('platform', updated);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.profile_id) newErrors.profile_id = 'Sélectionnez un profil';
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.budget) newErrors.budget = 'Budget requis';
    if (!formData.platform.length) newErrors.platform = 'Sélectionnez au moins une plateforme';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Select
        label="Profil"
        value={formData.profile_id}
        onChange={(val) => handleChange('profile_id', val)}
        options={profiles.map(p => ({ value: p.id, label: p.title }))}
        error={errors.profile_id}
        required
      />

      <Input
        label="Nom de la campagne"
        value={formData.name}
        onChange={(val) => handleChange('name', val)}
        placeholder="Ex: Lancement Album 2025"
        error={errors.name}
        required
      />

      <Select
        label="Type de campagne"
        value={formData.type}
        onChange={(val) => handleChange('type', val)}
        options={campaignTypes}
        required
      />

      <Input
        label="Budget (FCFA)"
        type="number"
        value={formData.budget}
        onChange={(val) => handleChange('budget', val)}
        placeholder="50000"
        error={errors.budget}
        required
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Plateformes <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map(platform => (
            <button
              key={platform.value}
              type="button"
              onClick={() => togglePlatform(platform.value)}
              className={`px-4 py-3 rounded-lg border-2 transition ${
                (formData.platform || []).includes(platform.value)
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>
        {errors.platform && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.platform}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {campaign ? 'Mettre à jour' : 'Créer la campagne'}
        </Button>
      </div>
    </div>
  );
};
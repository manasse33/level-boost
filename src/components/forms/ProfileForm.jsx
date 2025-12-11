
import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Calendar, AlertCircle } from 'lucide-react';
import { Input, Textarea, Select, Button, Alert } from '../common';

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







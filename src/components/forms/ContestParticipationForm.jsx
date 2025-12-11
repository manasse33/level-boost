// ============= CONTEST PARTICIPATION FORM =============
import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Calendar, AlertCircle } from 'lucide-react';
import { Input, Textarea, Select, Button, Alert } from '../common';
export const ContestParticipationForm = ({ contest, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    participant_name: '',
    email: '',
    submission_url: '',
    description: '',
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
    if (!formData.participant_name) newErrors.participant_name = 'Nom requis';
    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.submission_url) newErrors.submission_url = 'Lien requis';
    
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
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-start">
        <AlertCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-indigo-800">
            Vous participez au challenge <strong>{contest.title}</strong>.
          </p>
          <p className="text-xs text-indigo-600 mt-1">
            Assurez-vous que votre lien est public et accessible.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Nom de scène / Projet"
          value={formData.participant_name}
          onChange={(val) => handleChange('participant_name', val)}
          placeholder="Ex: MC Solar"
          error={errors.participant_name}
          required
        />
        <Input
          label="Email de contact"
          type="email"
          value={formData.email}
          onChange={(val) => handleChange('email', val)}
          placeholder="contact@..."
          error={errors.email}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Lien vers votre œuvre <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-500 text-sm">
            https://
          </span>
          <input
            type="text"
            value={formData.submission_url.replace(/^https?:\/\//, '')}
            onChange={(e) => handleChange('submission_url', e.target.value)}
            placeholder="youtube.com/watch?v=..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        {errors.submission_url && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.submission_url}
          </p>
        )}
      </div>

      <Textarea
        label="Description (optionnel)"
        value={formData.description}
        onChange={(val) => handleChange('description', val)}
        placeholder="Expliquez votre démarche artistique..."
        rows={4}
      />

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary" icon={Upload}>
          Envoyer ma participation
        </Button>
      </div>
    </div>
  );
};
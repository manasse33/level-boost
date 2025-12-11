// ============= UTILITY COMPONENTS =============
// Composants utilitaires et helpers

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, X, ChevronDown, Calendar, Download,
  Upload, Image as ImageIcon, File, Check
} from 'lucide-react';
import { Button, Input, Badge } from './common';

// ============= FILTER PANEL =============
export const FilterPanel = ({ filters, activeFilters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        icon={Filter}
      >
        Filtres
        {Object.keys(activeFilters).length > 0 && (
          <Badge variant="primary" size="sm" className="ml-2">
            {Object.keys(activeFilters).length}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Filtres</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {filter.label}
                  </label>
                  
                  {filter.type === 'select' && (
                    <select
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="">Tous</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === 'date' && (
                    <input
                      type="date"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  )}

                  {filter.type === 'checkbox' && (
                    <div className="space-y-2">
                      {filter.options.map((opt) => (
                        <label key={opt.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(activeFilters[filter.key] || []).includes(opt.value)}
                            onChange={(e) => {
                              const current = activeFilters[filter.key] || [];
                              const updated = e.target.checked
                                ? [...current, opt.value]
                                : current.filter(v => v !== opt.value);
                              onFilterChange(filter.key, updated);
                            }}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-slate-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6 pt-6 border-t">
              <Button onClick={onReset} variant="secondary" fullWidth>
                Réinitialiser
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="primary" fullWidth>
                Appliquer
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============= FILE UPLOADER =============
export const FileUploader = ({ 
  onUpload, 
  accept = "image/*",
  maxSize = 5, // MB
  multiple = false,
  preview = true 
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError('');

    // Validation
    const validFiles = selectedFiles.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        setError(`${file.name} dépasse la taille maximale de ${maxSize}MB`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);

    // Generate previews
    if (preview && accept.includes('image')) {
      const newPreviews = [];
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push({ name: file.name, url: e.target.result });
          if (newPreviews.length === validFiles.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (validFiles.length > 0) {
      onUpload(multiple ? validFiles : validFiles[0]);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onUpload(multiple ? newFiles : newFiles[0] || null);
  };

  return (
    <div>
      <label className="block">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer">
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Cliquez pour télécharger ou glissez-déposez
          </p>
          <p className="text-xs text-slate-500">
            {accept.includes('image') ? 'Images' : 'Fichiers'} jusqu'à {maxSize}MB
          </p>
        </div>
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative group">
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeFile(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============= DATE RANGE PICKER =============
export const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange }) => (
  <div className="flex gap-3 items-center">
    <div className="flex-1">
      <label className="block text-sm font-medium text-slate-700 mb-1">Début</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
    <div className="pt-6">→</div>
    <div className="flex-1">
      <label className="block text-sm font-medium text-slate-700 mb-1">Fin</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  </div>
);

// ============= SEARCH BAR WITH SUGGESTIONS =============
export const SearchBar = ({ onSearch, suggestions = [], placeholder = "Rechercher..." }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(query.length > 0 && suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50"
          >
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleSearch(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 transition"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============= TABS =============
export const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="border-b border-slate-200">
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`pb-4 px-1 border-b-2 font-medium transition ${
            activeTab === tab.value
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.value
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

// ============= DROPDOWN MENU =============
export const DropdownMenu = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-20"
            >
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center ${
                    item.danger ? 'text-red-600' : 'text-slate-700'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============= CONFIRMATION DIALOG =============
export const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirmer",
  cancelText = "Annuler",
  danger = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <Button onClick={onClose} variant="secondary" fullWidth>
            {cancelText}
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            variant={danger ? 'danger' : 'primary'} 
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// ============= SKELETON LOADER =============
export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4',
    title: 'h-8',
    button: 'h-10',
    card: 'h-48',
    avatar: 'h-12 w-12 rounded-full',
  };

  return (
    <div className={`bg-slate-200 animate-pulse rounded ${variants[variant]} ${className}`} />
  );
};

export const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <Skeleton variant="title" className="mb-4 w-3/4" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" className="mb-2 w-5/6" />
    <Skeleton variant="text" className="w-2/3" />
    <div className="mt-6">
      <Skeleton variant="button" className="w-32" />
    </div>
  </div>
);


// ============= CHECKLIST =============
export const Checklist = ({ items, onToggle }) => (
  <div className="space-y-2">
    {items.map((item, idx) => (
      <label
        key={idx}
        className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition"
      >
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(idx)}
          className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        />
        <span className={`ml-3 text-sm ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {item.label}
        </span>
      </label>
    ))}
  </div>
);
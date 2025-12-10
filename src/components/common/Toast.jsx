// ============= COMPOSANTS COMMUNS =============
// src/components/common/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  X, ChevronRight, AlertCircle, CheckCircle, 
  Eye, Loader, Menu 
} from 'lucide-react';

// ============= TOAST =============
export const Toast = ({ message, type = 'success', onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 20, x: '-50%' }}
    className={`fixed bottom-8 left-1/2 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 border ${
      type === 'success' 
        ? 'bg-emerald-50 border-emerald-200' 
        : type === 'error'
        ? 'bg-red-50 border-red-200'
        : 'bg-blue-50 border-blue-200'
    }`}
  >
    {type === 'success' ? (
      <CheckCircle className="w-5 h-5 text-emerald-600" />
    ) : type === 'error' ? (
      <AlertCircle className="w-5 h-5 text-red-600" />
    ) : (
      <AlertCircle className="w-5 h-5 text-blue-600" />
    )}
    <span className={`font-medium ${
      type === 'success' 
        ? 'text-emerald-800' 
        : type === 'error'
        ? 'text-red-800'
        : 'text-blue-800'
    }`}>
      {message}
    </span>
    <button onClick={onClose} className="ml-4 hover:opacity-70">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);








// ============= BUTTON =============
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  className = ''
}) => {
  const baseClasses = 'font-bold rounded-lg transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

// ============= INPUT =============
export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  disabled = false,
  icon: Icon,
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg outline-none transition
          ${Icon ? 'pl-11' : ''}
          ${error 
            ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
            : 'border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          }
          ${disabled ? 'bg-slate-50 cursor-not-allowed' : 'bg-white'}
        `}
      />
    </div>
    
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// ============= TEXTAREA =============
export const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  rows = 4,
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full px-4 py-3 border rounded-lg outline-none transition resize-none
        ${error 
          ? 'border-red-300 focus:ring-2 focus:ring-red-500' 
          : 'border-slate-300 focus:ring-2 focus:ring-indigo-500'
        }
      `}
    />
    
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// ============= SELECT =============
export const Select = ({ 
  label, 
  value, 
  onChange, 
  options, 
  error,
  required = false,
  placeholder = 'Sélectionner...',
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full px-4 py-3 border rounded-lg outline-none transition bg-white
        ${error 
          ? 'border-red-300 focus:ring-2 focus:ring-red-500' 
          : 'border-slate-300 focus:ring-2 focus:ring-indigo-500'
        }
      `}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// ============= BADGE =============
export const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variantClasses = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-orange-100 text-orange-700',
    danger: 'bg-red-100 text-red-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`inline-flex items-center font-bold rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};

// ============= CARD =============
export const Card = ({ children, className = '', hover = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      bg-white rounded-xl shadow-sm border border-slate-100 p-6
      ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);



// ============= ALERT =============
export const Alert = ({ type = 'info', title, message, onClose }) => {
  const types = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: AlertCircle },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle },
    warning: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: AlertCircle },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: AlertCircle },
  };

  const { bg, border, text, icon: Icon } = types[type];

  return (
    <div className={`${bg} border ${border} rounded-lg p-4 flex items-start`}>
      <Icon className={`w-5 h-5 ${text} mr-3 flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && <h4 className={`font-bold ${text} mb-1`}>{title}</h4>}
        <p className={`text-sm ${text}`}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className={`${text} hover:opacity-70 ml-3`}>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ============= EMPTY STATE =============
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
    {action && action}
  </div>
);

// ============= PAGINATION =============
export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
    >
      Précédent
    </button>
    
    <div className="flex space-x-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium ${
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
    
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
    >
      Suivant
    </button>
  </div>
);
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
























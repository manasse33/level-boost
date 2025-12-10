// ============= LOADER =============
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  X, ChevronRight, AlertCircle, CheckCircle, 
  Eye, Loader, Menu 
} from
export const Loader = ({ size = 'md', color = 'indigo' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4',
  };

  return (
    <div className={`${sizeClasses[size]} border-${color}-600 border-t-transparent rounded-full animate-spin`}></div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <Loader size="lg" />
      <p className="mt-4 text-slate-600 font-medium">Chargement...</p>
    </div>
  </div>
);
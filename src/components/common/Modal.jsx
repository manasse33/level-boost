// ============= MODAL =============
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  X, ChevronRight, AlertCircle, CheckCircle, 
  Eye, Loader, Menu 
} from
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto relative`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition z-10"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          <div className="p-8">
            {title && (
              <h3 className="text-2xl font-bold text-slate-900 mb-6 pr-10">
                {title}
              </h3>
            )}
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
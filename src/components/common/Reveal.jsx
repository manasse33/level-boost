// ============= REVEAL ANIMATION =============
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  X, ChevronRight, AlertCircle, CheckCircle, 
  Eye, Loader, Menu 
} from
export const Reveal = ({ children, width = '100%', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start('visible');
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: 'relative', width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

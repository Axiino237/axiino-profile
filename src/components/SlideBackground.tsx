import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseItem } from '../types';

interface SlideBackgroundProps {
  item: ShowcaseItem;
}

export const SlideBackground: React.FC<SlideBackgroundProps> = ({ item }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Screenshot or Custom Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat filter blur-[2px] scale-105 transform-gpu transition-all duration-1000"
            style={{
              backgroundImage: `url(${item.screenshotUrl})`,
              backgroundColor: '#030712',
            }}
          />

          {/* Cinematic Color Wash Layer matching Project Accent */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-color"
            style={{ backgroundColor: item.accentColor }}
          />

          {/* Deep Scrim Gradients for Maximum Legibility matching Reference Designs */}
          {/* Horizontal Scrim: Dark on left (for text), transparent in center, dark on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 via-55% to-slate-950/40" />

          {/* Vertical Scrim: Dark at top (for navbar) and bottom (for controls/pagination) */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-transparent via-35% to-slate-950/95" />

          {/* Subtle Ambient Radial Glow on the Left */}
          <div
            className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full filter blur-[140px] opacity-25 pointer-events-none"
            style={{ backgroundColor: item.accentColor }}
          />

          {/* Subtle Dynamic Mesh Lines / Dot Grid for High-Tech Brochure Feel */}
          <div 
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '36px 36px'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

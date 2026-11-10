import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseItem } from '../types';
import { ArrowUpRight, Eye } from 'lucide-react';

interface SlideContentProps {
  item: ShowcaseItem;
  onExplore: (item: ShowcaseItem) => void;
}

export const SlideContent: React.FC<SlideContentProps> = ({ item, onExplore }) => {
  return (
    <div className="relative z-20 w-full max-w-xl text-left select-none pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2.5 sm:space-y-4 lg:space-y-5"
        >
          {/* Subtle Category & Client Line */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-amber-400">
            <span>{item.type}</span>
            <span className="text-white/40">·</span>
            <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{item.clientOrBrand}</span>
          </div>

          {/* Responsive Title */}
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1] sm:leading-[0.95] text-white uppercase drop-shadow-2xl">
            {item.title}
          </h1>

          {/* Clean Text (Compact & Readable on mobile) */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-200/90 font-light leading-relaxed max-w-lg drop-shadow line-clamp-3 sm:line-clamp-none">
            {item.simpleExplanation}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={() => onExplore(item)}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Explore Solution</span>
            </button>

            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-black/50 hover:bg-white/10 border border-white/20 hover:border-white/50 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
              >
                <span>Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

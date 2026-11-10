import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShowcaseItem } from '../types';

interface SlideCarouselProps {
  items: ShowcaseItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const SlideCarousel: React.FC<SlideCarouselProps> = ({
  items,
  currentIndex,
  onSelectIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = isMobile ? 180 : 270;
  const cardGap = isMobile ? 12 : 20;
  const targetX = -(currentIndex * (cardWidth + cardGap));

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none pointer-events-auto py-1 sm:py-2"
    >
      {/* Animated Motion Track: Moves smoothly whenever currentIndex changes */}
      <motion.div
        animate={{ x: targetX }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 28,
          mass: 0.8,
        }}
        className="flex items-end gap-3 sm:gap-5"
        style={{ width: 'max-content' }}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              onClick={() => onSelectIndex(index)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex-shrink-0 cursor-pointer rounded-none overflow-hidden transition-all duration-300 select-none ${
                isActive
                  ? 'border-2 border-amber-400 shadow-xl shadow-amber-500/20 z-10'
                  : 'opacity-55 hover:opacity-90 border border-white/20 hover:border-white/50'
              }`}
              style={{
                width: `${cardWidth}px`,
                height: isActive ? (isMobile ? '110px' : '165px') : (isMobile ? '95px' : '142px'),
              }}
            >
              {/* Landscape Screenshot Background */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-top transition-transform duration-500 hover:scale-105"
                style={{
                  backgroundImage: `url(${item.screenshotUrl})`,
                  backgroundColor: '#0a0f1d',
                }}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

              {/* Top Left: Category Badge */}
              <div className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 z-10">
                <span
                  className={`text-[8px] sm:text-[9px] uppercase font-black tracking-wider px-1.5 sm:px-2 py-0.5 border ${
                    item.type === 'product'
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-black/80 text-slate-200 border-white/30'
                  }`}
                >
                  {item.type}
                </span>
              </div>

              {/* Top Right: Slide Number */}
              <div className="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 z-10 text-[9px] sm:text-[11px] font-mono font-black text-white/90 px-1 sm:px-1.5 py-0.5 bg-black/70 border border-white/10">
                0{index + 1}
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 z-10 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                <div className="text-[8px] sm:text-[10px] uppercase font-bold text-amber-400 tracking-wider truncate mb-0.5">
                  {item.clientOrBrand}
                </div>
                <h3 className="font-display font-black text-xs sm:text-sm text-white uppercase leading-snug line-clamp-1 drop-shadow">
                  {item.title}
                </h3>
              </div>

              {/* Active Bottom Highlight Bar */}
              {isActive && (
                <div className="absolute bottom-0 inset-x-0 h-[2px] sm:h-[3px] bg-amber-400 z-20" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

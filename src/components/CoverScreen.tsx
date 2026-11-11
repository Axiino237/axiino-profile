import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, FileText, ListFilter, Sparkles, ShieldCheck, Zap, Users, ArrowUpRight } from 'lucide-react';
import { ShowcaseItem } from '../types';

interface CoverScreenProps {
  onStartTour: () => void;
  onOpenScrollView: () => void;
  onOpenIndex: () => void;
  onExploreItem: (item: ShowcaseItem) => void;
  items: ShowcaseItem[];
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onStartTour,
  onOpenScrollView,
  onOpenIndex,
  onExploreItem,
  items,
}) => {
  // Listen for mouse wheel or ArrowDown to automatically trigger wipe-up into tour
  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 600) return;
      if (e.deltaY > 30) {
        lastWheelTime = now;
        onStartTour();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        onStartTour();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onStartTour]);

  return (
    <motion.div
      key="cover-screen"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed inset-0 z-50 w-screen h-[100dvh] bg-slate-950 text-white flex flex-col justify-between overflow-y-auto no-scrollbar select-none"
    >
      {/* Leading Accent Edge during wipe up */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 z-50 bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 shadow-lg shadow-amber-400/30" />

      {/* Ambient Radial Lights & Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-indigo-600/20 via-amber-500/10 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Header bar on cover */}
      <header className="relative z-20 w-full px-5 sm:px-10 lg:px-16 pt-5 sm:pt-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 sm:h-11 w-auto flex items-center justify-center">
            <img src="/axiino-logo.png" alt="Axiino Logo" className="h-full w-auto object-contain drop-shadow" decoding="async" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white leading-none">
              AXIINO
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-amber-400 mt-0.5">
              Technologies
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenIndex}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-white/15 hover:border-white/40 bg-white/5 hover:bg-white/10 rounded transition-all active:scale-95"
          >
            <ListFilter className="w-3.5 h-3.5 text-amber-400" />
            <span>Table of Contents</span>
          </button>
          <button
            onClick={onOpenScrollView}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-white/15 hover:border-white/40 bg-white/5 hover:bg-white/10 rounded transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scroll View</span>
          </button>
        </div>
      </header>

      {/* Main Center Hero Area */}
      <main className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 py-6 sm:py-10 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-5 sm:mb-7 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>OFFICIAL DIGITAL SOLUTIONS & CAPABILITIES BROCHURE 2026</span>
        </motion.div>

        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.08] drop-shadow-xl"
        >
          Engineering Intelligent Platforms &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">
            Enterprise Digital Products
          </span>
        </motion.h1>

        {/* Layman Subtitle / Plain English Welcome */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Welcome to our interactive presentation. Explore our flagship SaaS products, high-scale community ecosystems, and bespoke enterprise solutions.
        </motion.p>

        {/* Primary Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 sm:mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <button
            onClick={onStartTour}
            className="group px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base rounded-lg shadow-xl shadow-amber-400/20 flex items-center gap-2.5 transition-all duration-200 hover:scale-[1.03] active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Begin Interactive Tour</span>
            <span className="text-xs bg-black/15 px-2 py-0.5 rounded font-mono">Wipe Up ↑</span>
          </button>

          <button
            onClick={onOpenScrollView}
            className="px-5 sm:px-6 py-3 sm:py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-sm sm:text-base rounded-lg border border-white/20 hover:border-white/40 flex items-center gap-2 transition-all duration-200 active:scale-95"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Read as Scrollable Document</span>
          </button>
        </motion.div>

        {/* Credibility Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 sm:mt-12 w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl"
        >
          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col items-center">
            <Users className="w-5 h-5 text-indigo-400 mb-1" />
            <span className="font-display font-black text-xl sm:text-2xl text-white">50,000+</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Active Users Served</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col items-center">
            <Zap className="w-5 h-5 text-amber-400 mb-1" />
            <span className="font-display font-black text-xl sm:text-2xl text-white">95%</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Automated Payroll Speed</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="font-display font-black text-xl sm:text-2xl text-white">100%</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Enterprise Data Integrity</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-rose-400 mb-1" />
            <span className="font-display font-black text-xl sm:text-2xl text-white">AI-Powered</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Decision & Match Engines</span>
          </div>
        </motion.div>

        {/* Quick Preview Chips of Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-slate-500 font-medium mr-1">Featured In Brochure:</span>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onExploreItem(item)}
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/40 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.accentColor }} />
              <span>{item.title}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </button>
          ))}
        </motion.div>
      </main>

      {/* Footer prompt with bounce animation */}
      <footer className="relative z-20 w-full px-5 py-4 flex flex-col items-center text-center">
        <button
          onClick={onStartTour}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors group cursor-pointer"
        >
          <span className="text-xs font-semibold tracking-wider uppercase">
            Scroll Down or Click to Open Tour
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400 group-hover:translate-y-1 transition-transform" />
        </button>
      </footer>
    </motion.div>
  );
};


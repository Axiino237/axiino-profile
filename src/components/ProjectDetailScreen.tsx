import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShowcaseItem } from '../types';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  HelpCircle, 
  TrendingUp, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

interface ProjectDetailScreenProps {
  item: ShowcaseItem | null;
  onClose: () => void;
}

export const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({ item, onClose }) => {
  // Handle ESC key to return
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div
      key="detail-screen"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed inset-0 z-50 w-screen h-screen bg-slate-950 text-white overflow-y-auto no-scrollbar flex flex-col"
    >
      {/* Leading Edge Accent Line during the Wipe */}
      <div 
        className="fixed top-0 right-0 w-1.5 h-full z-50 pointer-events-none opacity-80"
        style={{ backgroundColor: item.accentColor || '#f59e0b' }}
      />

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-6 sm:px-12 py-5 bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
        {/* Back Button: Triggers Wipe-Left Out Animation */}
        <button
          onClick={onClose}
          className="group flex items-center gap-2.5 px-4 py-2 border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-white/15 text-white text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-95"
          title="Return to Showcase (Wipe Left)"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Showcase</span>
        </button>

        {/* Center / Right Metadata */}
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border ${
              item.type === 'product'
                ? 'bg-purple-600/30 text-purple-200 border-purple-400'
                : 'bg-sky-600/30 text-sky-200 border-sky-400'
            }`}
          >
            {item.type}
          </span>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold hidden sm:inline">
            {item.clientOrBrand}
          </span>
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-95"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Main Case Study Body */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 py-10 space-y-12">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span>{item.category}</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none">
            {item.title}
          </h1>

          <p className="text-base sm:text-xl font-light text-slate-300 max-w-3xl leading-relaxed">
            {item.tagline}
          </p>
        </div>

        {/* Full Landscape Screenshot Canvas */}
        <div className="relative w-full border border-white/20 bg-slate-900 shadow-2xl overflow-hidden group">
          <img
            src={item.screenshotUrl}
            alt={item.title}
            className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 pointer-events-none" />
          
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl transition-transform active:scale-95"
            >
              <span>Launch Live Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Non-Technical Breakdown (3 Editorial Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Card 1: Plain English */}
          <div className="p-6 bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>In Simple Words</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {item.simpleExplanation}
            </p>
          </div>

          {/* Card 2: Problem Solved */}
          <div className="p-6 bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>The Problem Solved</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {item.problemSolved}
            </p>
          </div>

          {/* Card 3: Business ROI */}
          <div className="p-6 bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Business Value & ROI</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {item.businessImpact}
            </p>
          </div>
        </div>

        {/* AI Capabilities & Engineering Section */}
        <div className="p-8 bg-slate-900/80 border border-white/15 space-y-6">
          <div className="flex items-center gap-2.5 text-sm font-black uppercase tracking-wider text-amber-400">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>AI Features & Intelligent Automation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {item.aiCapabilities.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-black/60 border border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-200 font-medium">{feat}</span>
              </div>
            ))}
          </div>

          {/* Key Metrics Row */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
            {item.keyOutcomes.map((metric, idx) => (
              <div key={idx} className="text-left">
                <div className="font-display font-black text-xl sm:text-2xl text-white">
                  {metric.value}
                </div>
                <div className="text-[11px] uppercase font-bold text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Bottom Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 pb-12 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mr-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Stack:
            </span>
            {item.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/50 bg-black/40 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showcase</span>
            </button>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <span>Launch Live Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
};


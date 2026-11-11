import React from 'react';
import { ItemType } from '../types';
import { Layers, ExternalLink, Sparkles, BookOpen, FileText, Play, Home, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentFilter: 'all' | ItemType;
  onFilterChange: (filter: 'all' | ItemType) => void;
  onOpenAdmin: () => void;
  onOpenCover: () => void;
  onOpenIndex: () => void;
  onOpenContact: () => void;
  viewMode: 'tour' | 'scroll';
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentFilter,
  onFilterChange,
  onOpenAdmin: _onOpenAdmin,
  onOpenCover,
  onOpenIndex,
  onOpenContact,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4 pb-2 flex flex-col gap-2 pointer-events-none bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent">
      {/* Top Row: Brand & Action Controls */}
      <div className="w-full flex items-center justify-between">
        {/* Brand: Logo + Axiino + Cover link */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button 
            onClick={onOpenCover}
            className="flex items-center gap-2.5 group focus:outline-none text-left"
            title="Return to Welcome Cover"
          >
            <div className="h-8 sm:h-10 w-auto flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img
                src="/axiino-logo.png"
                alt="Axiino Logo"
                className="h-full w-auto object-contain drop-shadow"
                decoding="async"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white leading-none drop-shadow-md">
                  AXIINO
                </span>
                <span className="hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded uppercase">
                  Brochure
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-300 drop-shadow mt-0.5 flex items-center gap-1">
                <Home className="w-2.5 h-2.5 text-amber-400" />
                <span className="group-hover:text-amber-300 transition-colors">Cover / Overview</span>
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Category Filters */}
        <nav className="hidden lg:flex items-center gap-1.5 pointer-events-auto bg-black/40 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-lg">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 rounded ${
              currentFilter === 'all'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Work
          </button>
          <button
            onClick={() => onFilterChange('product')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 rounded ${
              currentFilter === 'product'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Products
          </button>
          <button
            onClick={() => onFilterChange('project')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 rounded ${
              currentFilter === 'project'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Projects
          </button>
          <button
            onClick={() => onFilterChange('ai_feature')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 rounded ${
              currentFilter === 'ai_feature'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI Features
          </button>
        </nav>

        {/* Right Actions: Mode Toggle, Index, Contact, Subtle Admin */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* View Mode Switcher */}
          <button
            onClick={onToggleViewMode}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/20 hover:border-amber-400 bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-semibold transition-all active:scale-95 shadow-md"
            title={viewMode === 'tour' ? "Switch to Scrollable Document View" : "Switch to Slide Tour View"}
          >
            {viewMode === 'tour' ? (
              <>
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Scroll View</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span className="hidden sm:inline">Tour View</span>
              </>
            )}
          </button>

          {/* Table of Contents Index Button */}
          <button
            onClick={onOpenIndex}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/30 bg-black/50 hover:bg-black/70 text-slate-200 hover:text-white text-xs font-semibold transition-all active:scale-95 shadow-md"
            title="Open Table of Contents"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Index</span>
          </button>

          {/* Primary Action: Contact Us */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold transition-all active:scale-95 shadow-lg shadow-amber-400/20"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Filter Tabs (Visible on small screens) */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar pointer-events-auto flex items-center gap-1.5 pt-1 pb-1">
        <button
          onClick={() => onFilterChange('all')}
          className={`flex-shrink-0 px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 rounded ${
            currentFilter === 'all'
              ? 'bg-white text-slate-950 font-bold shadow-sm'
              : 'bg-black/40 text-slate-300 border border-white/10'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('product')}
          className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 rounded ${
            currentFilter === 'product'
              ? 'bg-white text-slate-950 font-bold shadow-sm'
              : 'bg-black/40 text-slate-300 border border-white/10'
          }`}
        >
          <Layers className="w-3 h-3" />
          Products
        </button>
        <button
          onClick={() => onFilterChange('project')}
          className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 rounded ${
            currentFilter === 'project'
              ? 'bg-white text-slate-950 font-bold shadow-sm'
              : 'bg-black/40 text-slate-300 border border-white/10'
          }`}
        >
          <ExternalLink className="w-3 h-3" />
          Projects
        </button>
        <button
          onClick={() => onFilterChange('ai_feature')}
          className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 rounded ${
            currentFilter === 'ai_feature'
              ? 'bg-white text-slate-950 font-bold shadow-sm'
              : 'bg-black/40 text-slate-300 border border-white/10'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          AI Features
        </button>
      </div>
    </header>
  );
};

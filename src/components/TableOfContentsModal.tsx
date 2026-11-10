import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ArrowRight, Home, PhoneCall } from 'lucide-react';
import { ShowcaseItem } from '../types';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShowcaseItem[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onGoToCover: () => void;
  onOpenContact: () => void;
  viewMode: 'tour' | 'scroll';
  onToggleViewMode: () => void;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectSlide,
  onGoToCover,
  onOpenContact,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md h-full bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col justify-between text-white p-5 sm:p-6 overflow-hidden"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-black text-lg text-white">
                    Brochure Index
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* View Mode Banner inside Drawer */}
              <div className="mt-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Current View</span>
                  <span className="text-xs font-bold text-white capitalize">
                    {viewMode === 'tour' ? '🎴 Tour / Presentation Mode' : '📜 Scrollable Document Mode'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onToggleViewMode();
                    onClose();
                  }}
                  className="px-2.5 py-1 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded border border-white/15 text-slate-200 hover:text-white transition-all"
                >
                  Switch View
                </button>
              </div>
            </div>

            {/* List of Sections */}
            <div className="flex-1 my-4 overflow-y-auto no-scrollbar space-y-2">
              {/* 00 Cover Page */}
              <button
                onClick={() => {
                  onGoToCover();
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-400 px-2 py-1 rounded bg-amber-400/10">
                    00
                  </span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-amber-300 block">
                      Welcome & Capabilities Cover
                    </span>
                    <span className="text-xs text-slate-400">
                      Overview, Credentials & Mission
                    </span>
                  </div>
                </div>
                <Home className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </button>

              {/* Showcase items */}
              {items.map((item, idx) => {
                const isActive = currentIndex === idx;
                const formattedNum = String(idx + 1).padStart(2, '0');

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectSlide(idx);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-amber-400/10 border-amber-400/50 shadow-md'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {formattedNum}
                      </span>
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-sm font-bold transition-colors ${
                              isActive ? 'text-amber-300' : 'text-white group-hover:text-amber-300'
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.type === 'product' && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-semibold">
                              SaaS
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 line-clamp-1">
                          {item.subtitle || item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isActive ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Contact / Next Steps */}
              <button
                onClick={() => {
                  onOpenContact();
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-white transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-sky-400 px-2 py-1 rounded bg-sky-400/20">
                    END
                  </span>
                  <div>
                    <span className="text-sm font-bold text-purple-300">
                      Work With Us & Inquire
                    </span>
                    <span className="text-xs text-slate-400">
                      WhatsApp, Email & Project Booking
                    </span>
                  </div>
                </div>
                <PhoneCall className="w-4 h-4 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Footer with quick action */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Axiino Interactive Brochure
              </span>
              <button
                onClick={() => {
                  onOpenContact();
                  onClose();
                }}
                className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded hover:bg-amber-300 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

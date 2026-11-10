import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseItem } from '../types';
import { X, ExternalLink, Sparkles, CheckCircle2, TrendingUp, Layers, HelpCircle } from 'lucide-react';

interface ProjectDetailModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-xl bg-slate-950/85">
        {/* Backdrop Click */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/20 rounded-none shadow-2xl text-slate-100 flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-slate-950/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                  item.type === 'product'
                    ? 'bg-purple-600/30 text-purple-200 border-purple-400'
                    : 'bg-sky-600/30 text-sky-200 border-sky-400'
                }`}
              >
                {item.type}
              </span>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-400 font-medium">{item.clientOrBrand}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Screenshot Hero Preview */}
            <div className="relative border border-white/20 bg-slate-950 shadow-2xl group overflow-hidden">
              <img
                src={item.screenshotUrl}
                alt={item.title}
                className="w-full h-auto max-h-[480px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Non-Technical Breakdown: 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: What is it? */}
              <div className="p-5 bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>In Simple Words</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.simpleExplanation}
                </p>
              </div>

              {/* Box 2: Problem Solved */}
              <div className="p-5 bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>The Pain Point Solved</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.problemSolved}
                </p>
              </div>

              {/* Box 3: Tangible ROI */}
              <div className="p-5 bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>Business Impact & Value</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.businessImpact}
                </p>
              </div>
            </div>

            {/* AI Capabilities Section */}
            <div className="p-6 bg-slate-900 border border-indigo-500/30 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Features & Intelligent Automation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.aiCapabilities.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 bg-black/60 border border-white/10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                Technology Stack:
              </span>
              {item.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

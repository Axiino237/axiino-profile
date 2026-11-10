import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudyItem } from '../data/caseStudiesData';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  BarChart2, 
  Calendar, 
  Lock, 
  Home, 
  Smartphone, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Eye, 
  Users, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';

interface CaseStudyPanelProps {
  caseStudy: CaseStudyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseStudyPanel: React.FC<CaseStudyPanelProps> = ({
  caseStudy,
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  // Reset active screenshot index whenever active case study changes
  useEffect(() => {
    setActiveScreenshotIdx(0);
  }, [caseStudy?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getFeatureCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'bar-chart':
        return <BarChart2 className="w-5 h-5 text-sky-400" />;
      case 'calendar':
        return <Calendar className="w-5 h-5 text-purple-400" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-fuchsia-400" />;
      case 'lock':
        return <Lock className="w-5 h-5 text-sky-400" />;
      case 'home':
        return <Home className="w-5 h-5 text-[#6BBFBF]" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#D44FD8]" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'trending-up':
        return <TrendingUp className="w-5 h-5 text-[#D44FD8]" />;
      case 'file-text':
        return <FileText className="w-5 h-5 text-[#6BBFBF]" />;
      case 'eye':
        return <Eye className="w-5 h-5 text-fuchsia-400" />;
      case 'users':
        return <Users className="w-5 h-5 text-sky-400" />;
      case 'check':
      default:
        return <CheckCircle2 className="w-5 h-5 text-purple-400" />;
    }
  };

  const screenshots = caseStudy?.screenshots || [];
  const currentScreenshot = screenshots[activeScreenshotIdx] || {
    url: caseStudy?.heroScreenshot || '',
    caption: caseStudy?.title || '',
  };

  const handleNextScreenshot = () => {
    if (screenshots.length <= 1) return;
    setActiveScreenshotIdx((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrevScreenshot = () => {
    if (screenshots.length <= 1) return;
    setActiveScreenshotIdx((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <AnimatePresence>
      {isOpen && caseStudy && (
        <motion.div
          key={`case-study-wipe-${caseStudy.id}`}
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-100%' }}
          transition={{ 
            duration: 0.75, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#070a0f] text-white selection:bg-purple-500 selection:text-white shadow-[35px_0_100px_rgba(0,0,0,0.95)]"
        >
          {/* Leading Right Edge Glowing Line (Curtain Wipe Edge in Brand Gradient) */}
          <div className="fixed top-0 bottom-0 right-0 w-[3px] bg-gradient-to-b from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] shadow-[0_0_35px_rgba(212,79,216,0.95)] z-50 pointer-events-none" />

          {/* Top glowing decorative accent */}
          <div className="sticky top-0 z-50 w-full h-[2px] bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] shadow-md shadow-purple-500/50" />

        {/* Sticky Navigation Bar */}
        <header className="sticky top-[2px] z-40 w-full px-4 sm:px-8 lg:px-12 py-4 bg-[#070a0f]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between shadow-2xl">
          {/* Back to Portfolio Link */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm transition-all group cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          {/* Center Brand Name */}
          <div className="hidden sm:flex items-center gap-2">
            <img src="/axiino-logo.png" alt="Axiino Logo" className="h-6 w-auto object-contain" />
            <span className="font-display font-black text-sm tracking-tight text-white">
              AXIINO
            </span>
            <span className="text-slate-500 text-xs">/</span>
            <span className="text-purple-400 font-bold text-xs uppercase tracking-wider">
              Case Study
            </span>
          </div>

          {/* Right Action: Visit Live Site */}
          {caseStudy.liveUrl && (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-900/30 transition-all active:scale-95"
            >
              <span>Visit Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </header>

        {/* Main Content Container (Smooth Fade & Slide) */}
        <motion.main
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16"
        >
          {/* =========================================================================
              SECTION 1: HEADER
              (name, tagline, tags, hero screenshot, Visit Live Site button)
              ========================================================================= */}
          <section className="space-y-6 sm:space-y-8">
            {/* Tags & Metadata */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-mono text-sm font-bold text-sky-400 px-3 py-1 rounded-lg bg-white/10 border border-white/10">
                {caseStudy.number}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10">
                {caseStudy.badge}
              </span>
              {caseStudy.isAiPowered && (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-fuchsia-300 px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/15">
                  <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>AI Powered</span>
                </span>
              )}
            </div>

            {/* Name & Tagline */}
            <div className="space-y-3">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                {caseStudy.title}
              </h1>
              <p className="text-base sm:text-xl text-[#C9C6E8] max-w-3xl leading-relaxed">
                {caseStudy.tagline}
              </p>
            </div>

            {/* Hero Screenshot */}
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl shadow-purple-950/40 relative group">
              <img
                src={caseStudy.heroScreenshot}
                alt={caseStudy.title}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>

            {/* Visit Live Site Button */}
            {caseStudy.liveUrl && (
              <div className="pt-2">
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/40 transition-all active:scale-95"
                >
                  <span>Visit Live Platform</span>
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </a>
              </div>
            )}
          </section>

          {/* =========================================================================
              SECTION 2: OVERVIEW
              (what it is, who it's for, quick facts)
              ========================================================================= */}
          <section className="space-y-8 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 block">
                01 • Executive Overview
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Project Overview & Scope
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* What It Is */}
              <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0e0c24]/90 space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 block">
                  What It Is
                </span>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  {caseStudy.whatItIs}
                </p>
              </div>

              {/* Who It's For */}
              <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0e0c24]/90 space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Who It’s For</span>
                </span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {caseStudy.whoItsFor}
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            {caseStudy.quickFacts && caseStudy.quickFacts.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Facts
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {caseStudy.quickFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.04] space-y-1 text-left"
                    >
                      <span className="text-xs text-slate-400 font-medium block">
                        {fact.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white block">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* =========================================================================
              SECTION 3: THE PROBLEM
              ========================================================================= */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D44FD8] block">
                02 • Challenge Identified
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                The Problem
              </h2>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.04] shadow-xl">
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                {caseStudy.theProblem}
              </p>
            </div>
          </section>

          {/* =========================================================================
              SECTION 4: OUR SOLUTION
              ========================================================================= */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6BBFBF] block">
                03 • Engineering Strategy
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Our Solution
              </h2>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-xl">
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal">
                {caseStudy.ourSolution}
              </p>
            </div>
          </section>

          {/* =========================================================================
              SECTION 5: KEY FEATURES (Icon Cards)
              ========================================================================= */}
          <section className="space-y-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 block">
                04 • Architecture & Capabilities
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Key Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {caseStudy.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#0e0c24] hover:border-purple-500/40 transition-colors space-y-3 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-white/5">
                      {getFeatureCardIcon(feature.iconName)}
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              SECTION 6: SCREENSHOTS (Carousel With Captions)
              ========================================================================= */}
          <section className="space-y-6 pt-4 border-t border-white/10">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-400 block">
                  05 • Visual Experience
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Interface Screenshots
                </h2>
              </div>

              {/* Previous / Next Navigation Controls */}
              {screenshots.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevScreenshot}
                    className="p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextScreenshot}
                    className="p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Active Screenshot Display */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl relative aspect-video flex items-center justify-center">
                <img
                  src={currentScreenshot.url}
                  alt={currentScreenshot.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Screenshot Caption */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-4">
                <p className="text-sm sm:text-base text-slate-200 leading-snug">
                  {currentScreenshot.caption}
                </p>

                {/* Dot Indicators */}
                {screenshots.length > 1 && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {screenshots.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveScreenshotIdx(dotIdx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeScreenshotIdx === dotIdx
                            ? 'w-6 bg-gradient-to-r from-[#3A9AD9] to-[#D44FD8]'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to screenshot ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 7: RESULTS (Hide If Empty)
              ========================================================================= */}
          {caseStudy.results && caseStudy.results.metrics && caseStudy.results.metrics.length > 0 && (
            <section className="space-y-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D44FD8] block">
                  06 • Verified Outcomes
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Results & Business Impact
                </h2>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-purple-500/35 bg-purple-500/10 shadow-2xl space-y-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-[#D44FD8] flex-shrink-0 mt-0.5" />
                  <p className="font-display font-bold text-lg sm:text-xl text-white leading-relaxed">
                    {caseStudy.results.headline}
                  </p>
                </div>

                {/* Metric Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {caseStudy.results.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-white/10 bg-black/40 text-center space-y-1"
                    >
                      <span className="font-display font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] block">
                        {metric.value}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 font-medium block">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              SECTION 8: CLOSING CALL TO ACTION
              (headline, description, Contact button)
              ========================================================================= */}
          <section className="pt-6 border-t border-white/10 text-center">
            <div className="p-8 sm:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#100d28] to-[#0a081a] shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8]" />

              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Next Steps with Axiino</span>
              </span>

              <div className="space-y-3 max-w-2xl mx-auto">
                <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                  Ready to Build a High-Impact Platform?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Whether you are planning custom software, an AI-powered community network, or enterprise operations infrastructure, let&apos;s turn your vision into reality.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/40 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Contact Our Team</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
                >
                  <span>Back to Portfolio</span>
                </button>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <footer className="pt-8 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-slate-500">
            <span>© 2026 Axiino Technologies.</span>
            <button
              onClick={onClose}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Close Case Study ↑
            </button>
          </footer>
        </motion.main>
      </motion.div>
      )}
    </AnimatePresence>
  );
};


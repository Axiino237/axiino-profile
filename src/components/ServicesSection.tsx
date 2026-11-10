import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Globe,
  Smartphone,
  Brain,
  Layers,
  Database,
  Server,
  Cloud,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';

interface ServicesSectionProps {
  onOpenContact?: (serviceName?: string) => void;
  embedded?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact, embedded = false }) => {
  // First item expanded by default, matching portfolio behavior
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'custom-software': true,
  });

  const [filter, setFilter] = useState<'all' | 'core' | 'ai_saas' | 'cloud'>('all');

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded = SERVICES_DATA.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const filteredServices = useMemo(() => {
    if (filter === 'all') return SERVICES_DATA;
    return SERVICES_DATA.filter(service => service.category === filter);
  }, [filter]);

  // Helper to render matching icon with custom styling
  const renderIcon = (type: ServiceItem['iconType'], color: string) => {
    const props = { className: 'w-5 h-5 sm:w-6 sm:h-6', style: { color } };
    switch (type) {
      case 'code':
        return <Code2 {...props} />;
      case 'globe':
        return <Globe {...props} />;
      case 'mobile':
        return <Smartphone {...props} />;
      case 'ai':
        return <Brain {...props} />;
      case 'saas':
        return <Layers {...props} />;
      case 'database':
        return <Database {...props} />;
      case 'backend':
        return <Server {...props} />;
      case 'cloud':
        return <Cloud {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const content = (
    <>
      {/* If embedded, show filter tabs directly without redundant H2 / 02 Services header */}
      {embedded ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              All ({SERVICES_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('core')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'core'
                  ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Software & Apps
            </button>
            <button
              type="button"
              onClick={() => setFilter('ai_saas')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'ai_saas'
                  ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              AI & SaaS
            </button>
            <button
              type="button"
              onClick={() => setFilter('cloud')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'cloud'
                  ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Backend & Cloud
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-1">
            <button
              type="button"
              onClick={expandAll}
              className="hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Expand All
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={collapseAll}
              className="hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Collapse
            </button>
          </div>
        </div>
      ) : (
        /* Standalone Section Header */
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6BBFBF] mb-2">
              <Sparkles className="w-4 h-4 text-[#8A6FDB]" />
              <span>02 · SERVICES</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Our Services & Capabilities
            </h2>

            <p className="text-sm sm:text-base mt-1.5 max-w-xl text-[#C9C6E8]">
              From custom enterprise software and mobile apps to AI pipelines and cloud infrastructure, here is what we architect, build, and scale.
            </p>
          </div>

          {/* Filter Tabs & Quick Expand Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-end">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                All ({SERVICES_DATA.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('core')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  filter === 'core'
                    ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Software & Apps
              </button>
              <button
                type="button"
                onClick={() => setFilter('ai_saas')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  filter === 'ai_saas'
                    ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                AI & SaaS
              </button>
              <button
                type="button"
                onClick={() => setFilter('cloud')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  filter === 'cloud'
                    ? 'bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Backend & Cloud
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 pl-1">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
              >
                Expand All
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accordion Collapse List of Services */}
      <div className="space-y-4">
        {filteredServices.map(service => {
          const isExpanded = !!expandedIds[service.id];

          return (
            <div
              key={service.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
                isExpanded
                  ? 'bg-[#0e0c24] border-purple-500/50 shadow-black/80 ring-1 ring-purple-500/30'
                  : 'bg-[#090b18]/90 hover:bg-[#0e0c24] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Clickable Header / Summary Bar */}
              <div
                onClick={() => toggleExpand(service.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none group"
              >
                {/* Left: Number + Icon Tile + Badge + Title + Excerpt */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Number Badge */}
                  <span className="font-mono font-black text-xs sm:text-sm px-2.5 py-1 rounded-lg flex-shrink-0 bg-white/10 text-sky-400">
                    {service.number}
                  </span>

                  {/* Icon Container with glowing subtle outline */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      boxShadow: `0 0 20px ${service.accentColor}15`,
                    }}
                  >
                    {renderIcon(service.iconType, service.accentColor)}
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#6BBFBF]">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-base sm:text-xl truncate text-white group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm line-clamp-1 mt-0.5 text-slate-400">
                      {service.excerpt}
                    </p>
                  </div>
                </div>

                {/* Right: Tech Core preview pills + Chevron */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="hidden lg:flex items-center gap-1.5">
                    {service.techCore.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="text-[11px] px-2.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.techCore.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-md text-slate-500 font-mono">
                        +{service.techCore.length - 3}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    aria-label={isExpanded ? 'Collapse service' : 'Expand service'}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-300 border ${
                      isExpanded
                        ? 'bg-purple-500/25 text-purple-300 border-purple-500/40 rotate-180'
                        : 'bg-white/5 text-slate-400 border-white/10 group-hover:bg-white/15'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Details Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="border-t border-white/10 px-5 sm:px-7 py-6 bg-gradient-to-b from-purple-950/20 to-black/40"
                  >
                    <div className="space-y-6">
                      {/* Full Description */}
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                        {service.description}
                      </p>

                      {/* Deliverables & Tech Stack Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Key Deliverables */}
                        <div className="rounded-xl p-4 sm:p-5 bg-white/[0.03] border border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            KEY DELIVERABLES
                          </h4>
                          <ul className="space-y-2.5">
                            {service.keyDeliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                <span className="text-sky-400 mt-1 flex-shrink-0 text-sm leading-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Core */}
                        <div className="rounded-xl p-4 sm:p-5 bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              TECH CORE
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {service.techCore.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-200 font-mono tracking-wide"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Quick Inquiry / Consultation CTA */}
                          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs text-slate-400">Ready to build with this stack?</span>
                            <button
                              type="button"
                              onClick={() => onOpenContact && onOpenContact(service.title)}
                              className="text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <span>Inquire</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Explore Full Service & Deliverables Action Button */}
                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => onOpenContact && onOpenContact(service.title)}
                          className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors group/link cursor-pointer"
                        >
                          <span>{service.actionText}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenContact && onOpenContact(service.title)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] hover:opacity-95 text-white font-semibold text-xs tracking-wide shadow-md shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Discuss {service.title} Project</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Services Bottom Callout Card */}
      <div className="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#0e0c24] via-[#14122E] to-[#1a1236] border border-purple-500/30 text-center flex flex-col items-center justify-center gap-4 shadow-xl">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white">
            Have a project or system you need engineered?
          </h3>
          <p className="text-sm text-[#C9C6E8] max-w-lg mx-auto mt-1">
            We partner with enterprises, startups, and founders from initial architecture to live production deployment.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenContact && onOpenContact()}
          className="px-7 py-3 rounded-full text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-900/40 hover:shadow-[0_0_25px_rgba(212,79,216,0.5)] transition-all cursor-pointer flex items-center gap-2 select-none"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <span>Schedule an Engineering Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id="services-embedded" className="w-full max-w-6xl mx-auto pt-2 pb-12">
        {content}
      </div>
    );
  }

  return (
    <section id="services" className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-16">
      {content}
    </section>
  );
};

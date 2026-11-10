import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShowcaseItem, ItemType } from '../types';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Database, 
  Layers
} from 'lucide-react';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShowcaseItem[];
  onSaveItems: (updatedItems: ShowcaseItem[]) => void;
  onResetDefaults?: () => void;
}

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  items,
  onSaveItems,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'items' | 'database'>('items');
  const [selectedItemId, setSelectedItemId] = useState<string>(items[0]?.id || '');
  const [editableList, setEditableList] = useState<ShowcaseItem[]>(items);

  if (!isOpen) return null;

  const currentItem = editableList.find(i => i.id === selectedItemId) || editableList[0];

  const handleFieldChange = (field: keyof ShowcaseItem, value: any) => {
    setEditableList(prev =>
      prev.map(item => (item.id === currentItem.id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    onSaveItems(editableList);
    alert('Project updates saved to UI state and browser storage!');
  };

  const handleAddNew = () => {
    const newId = `project-${Date.now()}`;
    const newItem: ShowcaseItem = {
      id: newId,
      slug: newId,
      title: 'New Showcase Project',
      type: 'project',
      subtitle: 'Modern Digital Solution',
      tagline: 'High-impact technological transformation',
      clientOrBrand: 'Client Enterprise',
      category: 'Web & Mobile Application',
      simpleExplanation: 'Explain in 1-2 simple sentences how this product helps real people.',
      problemSolved: 'The biggest headache or manual bottleneck this eliminates.',
      businessImpact: 'Key results such as 5x speed, reduced costs, or increased sales.',
      aiCapabilities: ['Smart Workflow Automation', 'Predictive Recommendation Engine'],
      techStack: ['React', 'TypeScript', 'Node.js'],
      keyOutcomes: [
        { label: 'Time Saved', value: '80%' },
        { label: 'Satisfaction', value: '99%' }
      ],
      screenshotUrl: '/screenshots/crm-axiino.jpg',
      accentColor: '#3b82f6',
      gradientOverlay: 'from-[#080d24]/90 via-[#0b1338]/80 to-[#040714]/95',
      liveUrl: 'https://axiino.com',
      caseStudyAvailable: true,
      featured: true,
    };
    setEditableList([newItem, ...editableList]);
    setSelectedItemId(newId);
  };

  const handleDelete = (id: string) => {
    if (editableList.length <= 1) {
      alert('You must keep at least one project in the showcase.');
      return;
    }
    const filtered = editableList.filter(item => item.id !== id);
    setEditableList(filtered);
    setSelectedItemId(filtered[0].id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/90 text-slate-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl h-[85vh] bg-slate-950 border border-white/20 rounded-none shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg text-white">
                Admin Showcase Manager
              </h2>
              <p className="text-xs text-slate-400">
                Update projects, edit plain-English explanations, and manage showcase items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onResetDefaults && (
              <button
                onClick={onResetDefaults}
                className="px-3 py-2 rounded-none bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs border border-white/10 active:scale-95 transition-all"
                title="Reset to default items"
              >
                Reset Defaults
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('items')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'items'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Edit Projects ({editableList.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'database'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            PostgreSQL Docker Architecture
          </button>
        </div>

        {/* Tab 1: Edit Projects */}
        {activeTab === 'items' && currentItem && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar: Project List */}
            <div className="w-64 border-r border-white/10 p-4 space-y-2 overflow-y-auto no-scrollbar bg-slate-950/30">
              <button
                onClick={handleAddNew}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-none bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-dashed border-white/20 mb-3"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Project
              </button>

              {editableList.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-3 rounded-none cursor-pointer text-xs font-semibold flex items-center justify-between group transition-all border ${
                    item.id === currentItem.id
                      ? 'bg-indigo-600/30 text-white border-indigo-500'
                      : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="text-[10px] text-amber-400 block font-mono">0{idx + 1} · {item.type}</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-1"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Panel: Active Project Editor Form */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-900/60 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Project / Product Title
                  </label>
                  <input
                    type="text"
                    value={currentItem.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Category Type
                  </label>
                  <select
                    value={currentItem.type}
                    onChange={(e) => handleFieldChange('type', e.target.value as ItemType)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="product">Product (In-house SaaS / System)</option>
                    <option value="project">Project (Client Solution)</option>
                    <option value="ai_feature">AI Feature Showcase</option>
                  </select>
                </div>

                {/* Client / Organization */}
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Client / Organization Name
                  </label>
                  <input
                    type="text"
                    value={currentItem.clientOrBrand}
                    onChange={(e) => handleFieldChange('clientOrBrand', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Live URL */}
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Live Demo / Site URL
                  </label>
                  <input
                    type="text"
                    value={currentItem.liveUrl}
                    onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Tagline (One-line value statement)
                </label>
                <input
                  type="text"
                  value={currentItem.tagline}
                  onChange={(e) => handleFieldChange('tagline', e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Plain English Explanation */}
              <div>
                <label className="text-[11px] font-bold uppercase text-amber-400 block mb-1">
                  In Simple Words (For Non-Technical Visitors)
                </label>
                <textarea
                  rows={2}
                  value={currentItem.simpleExplanation}
                  onChange={(e) => handleFieldChange('simpleExplanation', e.target.value)}
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-none p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Problem Solved & Business Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    The Pain Point / Problem Solved
                  </label>
                  <textarea
                    rows={2}
                    value={currentItem.problemSolved}
                    onChange={(e) => handleFieldChange('problemSolved', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Business Impact & Tangible Results
                  </label>
                  <textarea
                    rows={2}
                    value={currentItem.businessImpact}
                    onChange={(e) => handleFieldChange('businessImpact', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Screenshot Path & Accent Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Screenshot / Image Path
                  </label>
                  <input
                    type="text"
                    value={currentItem.screenshotUrl}
                    onChange={(e) => handleFieldChange('screenshotUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Accent Theme Color (Hex)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentItem.accentColor}
                      onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                      className="w-9 h-9 rounded-none bg-transparent cursor-pointer border border-white/20"
                    />
                    <input
                      type="text"
                      value={currentItem.accentColor}
                      onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                      className="flex-1 bg-slate-950 border border-white/10 rounded-none px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PostgreSQL & Docker Plan */}
        {activeTab === 'database' && (
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-900/60 no-scrollbar">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
              <Database className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-cyan-300">
                  PostgreSQL & Docker Setup
                </h3>
                <p className="text-xs text-cyan-200/80 mt-1">
                  Your project currently contains a production-ready <code className="bg-cyan-950/80 px-1 text-cyan-100 font-mono">docker-compose.yml</code> and <code className="bg-cyan-950/80 px-1 text-cyan-100 font-mono">Dockerfile</code>.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <p>
                When you are ready to connect the backend API, the PostgreSQL database will store all projects, categories, screenshots, and AI metrics with zero downtime.
              </p>

              <div className="p-4 bg-slate-950 border border-white/10 font-mono text-xs space-y-2">
                <div className="text-indigo-400 font-bold"># Start the full Docker ecosystem with Postgres:</div>
                <div className="text-emerald-400">docker compose up -d</div>
                <div className="text-slate-500 pt-2"># Web UI runs on: http://localhost:3050</div>
                <div className="text-slate-500"># PostgreSQL runs on: localhost:5432 (axiino_brochure)</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

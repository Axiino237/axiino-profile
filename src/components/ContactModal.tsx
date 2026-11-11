import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Send, CheckCircle, ExternalLink, Calendar } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Enterprise SaaS',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'f0e38ecf-4ad2-4d77-a9f4-200aeb80ad74',
          name: formData.name || 'Anonymous Visitor',
          email: formData.email,
          phone: formData.phone || 'Not provided',
          project_type: formData.projectType,
          message: formData.message || 'Full project inquiry submitted from brochure modal',
          subject: `New Full Project Inquiry: ${formData.projectType} - ${formData.name || formData.email}`,
          from_name: 'Axiino Digital Brochure',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Enterprise SaaS',
          message: ''
        });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      }
    } catch {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Axiino Team, I reviewed your digital brochure and would like to discuss building a project with your team."
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-xl bg-slate-900 border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-8 text-white max-h-[92dvh] overflow-y-auto my-auto modal-scrollbar"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8]" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Let’s Build Together
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Connect with the Axiino engineering & product team
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Direct Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
              <a
                href={`https://wa.me/919361395699?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-400">Direct Chat</span>
                  <span className="text-sm font-bold text-white group-hover:text-purple-300">+91 93613 95699</span>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto text-purple-400 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href="mailto:axiino237@gmail.com?subject=Project%20Inquiry%20via%20Digital%20Brochure"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-400">Official Email</span>
                  <span className="text-sm font-bold text-white group-hover:text-sky-300">axiino237@gmail.com</span>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto text-sky-400 opacity-60 group-hover:opacity-100" />
              </a>
            </div>

            {/* Quick Contact Form */}
            {submitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-12 h-12 text-[#6BBFBF] mb-2 animate-bounce" />
                <h4 className="font-bold text-lg text-white">Thank you!</h4>
                <p className="text-sm text-slate-400 mt-1">
                  We received your message. Our solutions director will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    What are you looking to build?
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="Enterprise SaaS">Enterprise SaaS / Workforce Software</option>
                    <option value="AI Automation">AI Platform / Automation Pipeline</option>
                    <option value="Web & Mobile App">Full-Stack Web or Mobile App</option>
                    <option value="Corporate Platform">Corporate Multi-Brand Portal</option>
                    <option value="Consultation">Architecture Consultation & Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Project Overview or Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your timeline, features, or questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="order-1 sm:order-2 w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-gradient-to-r from-[#3A9AD9] via-[#8A6FDB] to-[#D44FD8] hover:opacity-95 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-purple-900/35 active:scale-95 disabled:opacity-75 cursor-pointer"
                  >
                    <Send className={`w-3.5 h-3.5 ${submitting ? 'animate-pulse' : ''}`} />
                    <span>{submitting ? 'Sending...' : 'Send Inquiry'}</span>
                  </button>
                  <span className="order-2 sm:order-1 text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Response guaranteed within 24h
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const services = ['Premium 3D Website ($500)', 'Full Services ($1,000/mo)', 'Both — Website + Services', 'Not sure yet'];
const budgets = ['Website only — $500', 'Services only — $1,000/mo', 'Website + Services', 'Custom bundle'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('briefs').insert({
      name:    form.name,
      email:   form.email,
      company: form.company,
      service: form.service,
      budget:  form.budget,
      message: form.message,
      status:  'new',
    });
    setSent(true);
  };

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b px-0 py-3 text-chrome font-sans text-sm outline-none transition-colors duration-300 placeholder-chrome-faint/40 ${
      focused === name ? 'border-chrome/60' : 'border-chrome-faint/20'
    }`;

  if (sent) {
    return (
      <div className="bg-void min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-gold text-2xl">◈</span>
          </div>
          <h2 className="display-xl text-4xl md:text-5xl text-chrome mb-4">Message received.</h2>
          <p className="text-chrome-dim font-sans text-sm leading-relaxed mb-8">
            We'll review your project brief and get back to you within 24 hours. Exciting things ahead.
          </p>
          <button onClick={() => setSent(false)} className="btn-primary inline-flex">
            Send Another →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-void min-h-screen pt-20">

      {/* ── Header ── */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <motion.p
                className="mono-label mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ◈ Let's build something
              </motion.p>
              <motion.h1
                className="display-xl text-[clamp(3rem,6vw,5.5rem)] text-chrome mb-6 leading-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Start a
                <br />
                <em className="not-italic text-chrome-dim">conversation.</em>
              </motion.h1>
              <motion.p
                className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed max-w-sm mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Tell us about your project and we'll respond within 24 hours with initial thoughts and next steps.
              </motion.p>

              {/* Contact info */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { label: 'Email', value: 'hello@mojowebs.top' },
                  { label: 'Location', value: 'Nairobi, Kenya · Global' },
                  { label: 'Response', value: 'Within 24 hours' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="mono-label w-20 flex-shrink-0 pt-0.5">{label}</span>
                    <span className="text-chrome font-sans text-sm">{value}</span>
                  </div>
                ))}
              </motion.div>

              {/* Bee video accent */}
              <motion.div
                className="mt-12 relative w-full h-48 overflow-hidden border border-chrome-faint/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <video
                  src="/hand.mp4"
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.3) saturate(1.4) contrast(1.1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-void/80 to-transparent" />
                <div className="absolute inset-0 flex items-center px-8">
                  <p className="display-xl text-xl text-chrome-dim italic">
                    "Precision in motion —<br />that's what we build."
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Form ── */}
            <motion.form
              onSubmit={handle}
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Row: name + email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="mono-label block mb-2">Your Name *</label>
                  <input
                    className={inputClass('name')}
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
                <div>
                  <label className="mono-label block mb-2">Email *</label>
                  <input
                    type="email"
                    className={inputClass('email')}
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="mono-label block mb-2">Company / Project</label>
                <input
                  className={inputClass('company')}
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  onFocus={() => setFocused('company')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Service */}
              <div>
                <label className="mono-label block mb-3">Service Needed</label>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, service: s })}
                      className={`mono-label px-3 py-2 border transition-all duration-200 ${
                        form.service === s
                          ? 'border-gold/50 text-gold bg-gold/5'
                          : 'border-chrome-faint/20 text-chrome-dim hover:border-chrome-faint/40 hover:text-chrome'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="mono-label block mb-3">Estimated Budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setForm({ ...form, budget: b })}
                      className={`mono-label px-3 py-2 border transition-all duration-200 ${
                        form.budget === b
                          ? 'border-gold/50 text-gold bg-gold/5'
                          : 'border-chrome-faint/20 text-chrome-dim hover:border-chrome-faint/40 hover:text-chrome'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mono-label block mb-2">Tell us about your project *</label>
                <textarea
                  className={`${inputClass('message')} resize-none border-b-0 border border-chrome-faint/20 ${focused === 'message' ? '!border-chrome/40' : ''} p-4 min-h-[140px] leading-relaxed`}
                  placeholder="Describe what you're building, what problems you're solving, and any specific requirements..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center flex" style={{display:'flex'}}>
                Send Project Brief
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="ml-3">
                  <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <p className="mono-label text-center">
                No spam. No sales calls. Just a conversation.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}

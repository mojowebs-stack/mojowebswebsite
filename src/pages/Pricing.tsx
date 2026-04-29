import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

const everything = [
  'Premium 3D design & animations',
  'Mobile-first responsive build',
  'Custom branded experience',
  'Speed-optimized performance',
  'Conversion-focused layout',
  'On-page SEO structure',
  'Contact & lead capture forms',
  'Speed to lead automation',
  'Full CRM & sales pipelines',
  'Review automation system',
  'Online booking system',
  'SEO strategy & execution',
  'Live SEO & rank tracking',
  'Custom dashboard & reporting',
  'Ongoing support & optimization',
];

const faqs = [
  { q: 'What does the $500 setup fee cover?', a: 'The one-time fee covers the full build of your premium 3D website — designed, developed, and delivered. You own it outright from day one.' },
  { q: 'What is included in the $1,000/month?', a: 'Everything: speed to lead automation, full CRM & sales pipelines, review automation, online booking, SEO strategy & live rank tracking, and a custom reporting dashboard — all fully managed and optimized for you every month.' },
  { q: 'How long does it take to go live?', a: 'Most clients are fully live — website and all services — within 1–2 weeks of kickoff.' },
  { q: 'Can I cancel the monthly plan?', a: 'Yes. Cancel anytime with 30 days notice. No long-term contracts, no penalties.' },
  { q: 'Do I need any technical knowledge?', a: 'None at all. We handle every part of the setup, integration, and ongoing management. You just run your business.' },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-void min-h-screen pt-20">

      {/* ── Header with spaceship ── */}
      <section className="py-16 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p className="mono-label mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>◈ Transparent pricing</motion.p>
              <motion.h1 className="display-xl text-[clamp(3rem,6vw,5.5rem)] text-chrome mb-4"
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                Simple pricing.<br /><em className="not-italic text-chrome-dim">Serious results.</em>
              </motion.h1>
              <motion.p className="text-chrome-dim font-sans text-base leading-relaxed mb-8 max-w-sm"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                One package. Everything included. $500 to build your premium website, then $1,000/month for the full automation stack.
              </motion.p>
              <motion.div className="inline-flex items-center gap-3 border border-chrome-faint/15 px-5 py-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <span className="mono-label text-gold">◈</span>
                <span className="mono-label text-chrome">No contracts · Cancel anytime</span>
              </motion.div>
            </div>

            {/* Spaceship 3D */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }}>
              <Suspense fallback={null}>
                <ModelViewer
                  objUrl="/models/spaceship/spaceship_web.obj"
                  textureUrl="/models/spaceship/spaceship_color.jpg"
                  height={340}
                  autoRotate rotateSpeed={0.0025}
                  cameraZ={3.8}
                  interactive
                  glowColor="#6090ff"
                  initialRotationY={-0.5}
                  initialRotationX={0.25}
                />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

            {/* Full Package */}
            <motion.div
              className="pricing-card featured relative overflow-hidden border-gold/30"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="mono-label text-gold border border-gold/30 px-2 py-1">Most Popular</span>
              </div>
              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <p className="mono-label mb-2">The complete system</p>
                  <h3 className="font-display text-3xl font-light text-chrome mb-4">Full Package</h3>
                  <p className="text-chrome-dim text-sm font-sans leading-relaxed">Your premium website plus every automation, CRM, SEO, and reporting tool — fully built, integrated, and managed for you.</p>
                </div>
                <div className="mb-8 pb-8 border-b border-chrome-faint/10 flex flex-col sm:flex-row sm:items-end gap-6">
                  <div>
                    <p className="mono-label mb-1">Setup fee</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl font-light text-chrome">$500</span>
                      <span className="mono-label">one-time</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-chrome-faint/20" />
                  <div>
                    <p className="mono-label mb-1">Monthly retainer</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl font-light text-chrome">$1,000</span>
                      <span className="mono-label">/month</span>
                    </div>
                  </div>
                </div>
                <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {everything.map((f, i) => (
                    <motion.div key={f} className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                      <span className="text-gold text-xs mt-0.5 flex-shrink-0">◈</span>
                      <span className="text-chrome-dim text-sm font-sans">{f}</span>
                    </motion.div>
                  ))}
                </div>
                <Link to="/contact" className="btn-primary w-full justify-center flex">Get Started</Link>
              </div>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              className="pricing-card relative overflow-hidden border-chrome-faint/10"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}>
              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <p className="mono-label mb-2">Custom scope</p>
                  <h3 className="font-display text-3xl font-light text-chrome mb-4">Enterprise</h3>
                  <p className="text-chrome-dim text-sm font-sans leading-relaxed">For larger operations that need a bespoke system — custom integrations, dedicated team, multi-location setup, or white-label solutions.</p>
                </div>
                <div className="mb-8 pb-8 border-b border-chrome-faint/10">
                  <p className="font-display text-4xl font-light text-chrome">Custom</p>
                  <p className="mono-label mt-1">Scoped on a call</p>
                </div>
                <div className="mb-10 space-y-3">
                  {['Everything in Full Package', 'Custom integrations & APIs', 'Multi-location setup', 'White-label options', 'Dedicated account manager', 'Priority SLA support', 'Custom reporting & analytics', 'On-site strategy sessions'].map((f, i) => (
                    <motion.div key={f} className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                      <span className="text-gold text-xs mt-0.5 flex-shrink-0">◈</span>
                      <span className="text-chrome-dim text-sm font-sans">{f}</span>
                    </motion.div>
                  ))}
                </div>
                <Link to="/contact" className="btn-ghost w-full justify-center pl-0 flex">Book a Call →</Link>
              </div>
            </motion.div>

          </div>
          <motion.p className="text-center mono-label mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            All prices in USD · No contracts · Cancel anytime
          </motion.p>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-16 border-t border-chrome-faint/10 bg-void-2">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.h2 className="display-xl text-3xl md:text-4xl text-chrome mb-10 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Everything in one system.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-chrome-faint/10">
            {[
              { label: 'Premium 3D Website', desc: '$500 one-time · yours forever' },
              { label: 'Speed to Lead', desc: 'Contact new leads within seconds, automatically' },
              { label: 'Full CRM & Pipelines', desc: 'Track every lead and client from first touch to close' },
              { label: 'Review Automation', desc: 'Systematically generate 5-star reviews on autopilot' },
              { label: 'Online Booking System', desc: 'Clients book themselves — no back-and-forth' },
              { label: 'SEO & Rank Tracking', desc: 'Full strategy, execution, and live keyword monitoring' },
              { label: 'Custom Dashboard', desc: 'Every metric that matters, in one place' },
              { label: 'Ongoing Support', desc: 'We manage, optimize, and improve every month' },
            ].map(({ label, desc }, i) => (
              <motion.div key={label} className="bg-void p-6 hover:bg-void-3/60 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-1 flex-shrink-0">◈</span>
                  <div>
                    <p className="text-chrome font-sans text-sm font-medium mb-1">{label}</p>
                    <p className="text-chrome-dim font-sans text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 border-t border-chrome-faint/10">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.h2 className="display-xl text-3xl md:text-4xl text-chrome mb-12 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Common questions.</motion.h2>
          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <motion.div key={i} className="border-b border-chrome-faint/10"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <button className="w-full py-5 flex items-center justify-between text-left gap-6"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-chrome font-sans text-sm md:text-base">{faq.q}</span>
                  <span className={`text-chrome-dim transition-transform duration-300 flex-shrink-0 text-lg ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <motion.div animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  initial={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                  <p className="pb-5 text-chrome-dim font-sans text-sm leading-relaxed pr-8">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-chrome-faint/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <motion.h2 className="display-xl text-4xl md:text-5xl text-chrome mb-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Not sure where to start?
          </motion.h2>
          <p className="text-chrome-dim font-sans text-sm mb-8">Book a free 30-minute call — we'll map out exactly what your business needs and get you moving fast.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book Free Scoping Call</Link>
        </div>
      </section>
    </div>
  );
}

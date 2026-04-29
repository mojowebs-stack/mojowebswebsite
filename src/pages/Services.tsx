import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

const techStack = [
  'Three.js', 'WebGL', 'React', 'Next.js', 'GoHighLevel', 'n8n',
  'Twilio', 'Zapier', 'Make', 'Google Analytics', 'Ahrefs', 'SEMrush',
  'Stripe', 'Calendly', 'Airtable', 'Notion', 'OpenAI', 'Anthropic',
];

export default function Services() {
  return (
    <div className="bg-void min-h-screen pt-20">

      {/* ── Header ── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <video src="/watch.mp4" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.p className="mono-label mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>◈ Our services</motion.p>
          <motion.h1
            className="display-xl text-[clamp(3rem,7vw,6.5rem)] text-chrome mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Premium websites.<br /><em className="not-italic text-chrome-dim">Intelligent systems.</em>
          </motion.h1>
          <motion.p className="text-chrome-dim font-sans text-base md:text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Three integrated solutions built to make your business look elite, attract more customers, and convert them automatically.
          </motion.p>
        </div>
      </section>

      {/* ══ 01 — Premium 3D Websites + ROBO 3D ══ */}
      <section className="py-16 md:py-28 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="mono-label mb-4">01 / ◎</p>
              <h2 className="display-xl text-[clamp(2.5rem,4vw,4rem)] text-chrome mb-2">Premium 3D Websites</h2>
              <p className="display-xl text-[clamp(1.4rem,2.2vw,1.9rem)] text-chrome-dim mb-6 italic">Built to stop the scroll.</p>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-8">
                We craft high-end, visually immersive websites with premium 3D elements, fluid animations, and a level of design craft that makes competitors look outdated the moment yours goes live.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {['Premium 3D design & animations', 'Mobile-first responsive build', 'Custom branded experience', 'Speed-optimized performance', 'Conversion-focused layout', 'On-page SEO structure'].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 text-xs flex-shrink-0">◈</span>
                    <span className="text-chrome-dim text-sm font-sans leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary inline-flex">
                Start This Project
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>

            {/* ROBO — no wrapper, floats freely */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
              <Suspense fallback={null}>
                <ModelViewer
                  objUrl="/models/robo/ROBO_web.obj"
                  height={480}
                  color="#D0C8B8"
                  autoRotate rotateSpeed={0.005}
                  cameraZ={4.0} interactive
                  glowColor="#C9A84C"
                />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 02 — Automation & CRM ══ */}
      <section className="py-16 md:py-28 border-t border-chrome-faint/10 bg-void-2">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Code terminal — left */}
            <motion.div className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
              <div className="relative border border-chrome-faint/10 bg-void-3 overflow-hidden" style={{ height: 420 }}>
                <div className="p-6 pt-10 font-mono text-xs leading-relaxed h-full overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-chrome-faint/40 text-xs">mojowebs/api/v2</span>
                  </div>
                  {[
                    { c: 'text-chrome-dim', t: '// Mojowebs Automation Engine v2.0' },
                    { c: 'text-gold', t: 'import { SpeedToLead, CRM, Reviews } from "@mojo/core"' },
                    { c: 'text-chrome-dim', t: '' },
                    { c: 'text-chrome', t: 'on("new_lead", async (lead) => {' },
                    { c: 'text-chrome-dim', t: '  await SpeedToLead.contact(lead, { within: "60s" })' },
                    { c: 'text-chrome-dim', t: '  await CRM.createContact(lead)' },
                    { c: 'text-chrome-dim', t: '  await CRM.addToPipeline(lead, "New Leads")' },
                    { c: 'text-chrome', t: '})' },
                    { c: 'text-chrome-dim', t: '' },
                    { c: 'text-gold', t: 'on("job_complete", async (customer) => {' },
                    { c: 'text-chrome-dim', t: '  await Reviews.requestReview(customer)' },
                    { c: 'text-chrome-dim', t: '  await CRM.moveToPipeline("Past Clients")' },
                    { c: 'text-chrome-dim', t: '  await Booking.sendRebookReminder(customer)' },
                    { c: 'text-gold', t: '  // revenue loop: active' },
                    { c: 'text-chrome', t: '})' },
                    { c: 'text-chrome-dim', t: '' },
                    { c: 'text-gold/50', t: '// ✓ Running 24/7 · 0 manual steps' },
                  ].map((line, i) => (
                    <motion.div key={i} className={`${line.c} whitespace-pre`}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                      {line.t || '\u00A0'}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="mono-label mb-4">02 / ◈</p>
              <h2 className="display-xl text-[clamp(2.5rem,4vw,4rem)] text-chrome mb-2">Automation & CRM</h2>
              <p className="display-xl text-[clamp(1.4rem,2.2vw,1.9rem)] text-chrome-dim mb-6 italic">Revenue on autopilot.</p>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-8">
                From the moment a lead lands to the moment they pay — every step automated. Speed to lead, full CRM & pipelines, review generation, and a booking system that never sleeps.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {['Speed to lead automation', 'Full CRM & sales pipelines', 'Review automation system', 'Online booking system', 'Lead follow-up sequences', 'Automated notifications & alerts'].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 text-xs flex-shrink-0">◈</span>
                    <span className="text-chrome-dim text-sm font-sans">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary inline-flex">
                Start This Project
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 03 — SEO & Analytics + Monkey 3D ══ */}
      <section className="py-16 md:py-28 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="mono-label mb-4">03 / ◇</p>
              <h2 className="display-xl text-[clamp(2.5rem,4vw,4rem)] text-chrome mb-2">SEO & Analytics</h2>
              <p className="display-xl text-[clamp(1.4rem,2.2vw,1.9rem)] text-chrome-dim mb-6 italic">Found first. Measured always.</p>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-8">
                Full SEO strategy paired with live tracking and custom dashboards — so you know exactly where you rank, what's working, and where revenue is coming from, at all times.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {['Full SEO strategy & execution', 'Live keyword & rank tracking', 'Local SEO & Google Business', 'Custom reporting dashboard', 'Monthly performance reports', 'Competitor analysis'].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 text-xs flex-shrink-0">◈</span>
                    <span className="text-chrome-dim text-sm font-sans">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary inline-flex">
                Start This Project
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>

            {/* Spider Monkey — no wrapper, floats freely */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
              <Suspense fallback={null}>
                <ModelViewer
                  objUrl="/models/monkey/monkey_web.obj"
                  textureUrl="/models/monkey/12958_Spider_Monkey_diff.jpg"
                  height={480}
                  color="#8B7355"
                  autoRotate rotateSpeed={0.004}
                  cameraZ={4.0} interactive
                  glowColor="#888894"
                />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-16 md:py-24 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.p className="mono-label mb-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>◈ Technology stack</motion.p>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((t, i) => (
              <motion.span key={t} className="mono-label px-4 py-2 border border-chrome-faint/15 hover:border-chrome-faint/40 hover:text-chrome transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-chrome-faint/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <motion.h2 className="display-xl text-[clamp(2.5rem,5vw,4rem)] text-chrome mb-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Let's build it.
          </motion.h2>
          <Link to="/contact" className="btn-primary inline-flex">Get in Touch →</Link>
        </div>
      </section>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

const values = [
  { icon: '◎', title: 'Precision', desc: 'Every system we deliver is engineered to exact specifications. No shortcuts, no bloat.' },
  { icon: '◈', title: 'Intelligence', desc: 'We bake AI into everything — not as a feature, but as a foundation.' },
  { icon: '◇', title: 'Velocity', desc: 'From idea to deployment in weeks, not months. Speed without sacrificing quality.' },
  { icon: '△', title: 'Transparency', desc: 'Weekly updates, open codebases, honest timelines. You always know where you stand.' },
];

export default function About() {
  return (
    <div className="bg-void min-h-screen pt-20">

      {/* ── Header ── */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <video src="/robot.mp4" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/60 to-void" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.p className="mono-label mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>◈ Our story</motion.p>
          <motion.h1
            className="display-xl text-[clamp(3rem,7vw,6.5rem)] text-chrome mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Built to build<br /><em className="not-italic text-chrome-dim">the impossible.</em>
          </motion.h1>
        </div>
      </section>

      {/* ── Story + ROBO 3D ── */}
      <section className="py-16 md:py-24 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="mono-label mb-6">◈ Origin</p>
              <p className="text-chrome font-sans text-base md:text-lg leading-relaxed mb-6">
                Mojowebs was built around a clear belief: most businesses deserve to look premium and operate intelligently — but almost none of them have both. They either have a decent website with no automation, or some tools stitched together with no coherent design.
              </p>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-6">
                We solve that completely. We build high-end, immersive 3D-grade websites that make an immediate impression — then back them with a full automation stack: speed to lead, CRM & pipelines, review generation, booking systems, SEO tracking, and custom reporting.
              </p>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed">
                From Nairobi, Kenya, with a globally distributed team, we serve clients across Africa, Europe, and North America — delivering systems that look world-class, work around the clock, and compound in value month after month.
              </p>
            </motion.div>

            {/* ROBO 3D mascot */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div style={{ height: 420 }}>
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/25 z-10" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/25 z-10" />                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border border-chrome-faint/30 border-t-gold rounded-full animate-spin" />
                  </div>
                }>
                  <ModelViewer
                    objUrl="/models/robo/ROBO_web.obj"
                    height={420}
                    color="#C9A84C"
                    autoRotate
                    rotateSpeed={0.006}
                    cameraZ={4.2}
                    interactive
                    glowColor="#C9A84C"
                  />
                </Suspense>              </div>            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 md:py-20 border-t border-chrome-faint/10 bg-void-2">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="mono-label mb-6">◈ Mission</p>
              <div className="border border-chrome-faint/15 p-8 bg-void relative overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/20" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/20" />
                <p className="display-xl text-2xl md:text-3xl font-light text-chrome leading-snug mb-6">
                  "To give every business a premium online presence backed by intelligent automation — so they attract more, convert more, and retain more."
                </p>
                <p className="mono-label">— Mojowebs, 2026</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="mono-label mb-6">◈ Numbers</p>
              <div className="grid grid-cols-2 gap-4">
                {[['2026', 'Founded'], ['40+', 'Projects'], ['3', 'Continents'], ['100%', 'Remote']].map(([n, l]) => (
                  <div key={l} className="border border-chrome-faint/10 p-5 hover:border-gold/20 transition-colors duration-300">
                    <p className="font-display text-4xl font-light text-chrome mb-1">{n}</p>
                    <p className="mono-label">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 md:py-24 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.p className="mono-label mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>◈ What we stand for</motion.p>
          <motion.h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] text-chrome mb-14 md:mb-20"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            Our values.
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-chrome-faint/10">
            {values.map((v, i) => (
              <motion.div key={v.title} className="bg-void p-8 group hover:bg-void-2 transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}>
                <p className="text-2xl mb-4 text-chrome-dim group-hover:text-gold transition-colors duration-300">{v.icon}</p>
                <h3 className="font-display text-2xl font-light text-chrome mb-3">{v.title}</h3>
                <p className="text-chrome-dim text-sm font-sans leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D Showcase — Monkey (adaptability/intelligence) ── */}
      <section className="py-16 md:py-24 border-t border-chrome-faint/10 bg-void-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="mono-label mb-4">◈ Philosophy</p>
              <h2 className="display-xl text-[clamp(2.5rem,4vw,3.8rem)] text-chrome mb-4">
                Adaptive by nature.
              </h2>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-6">
                Like nature's most intelligent creatures, our systems are designed to adapt. Every workflow we build learns from its environment, finds efficiencies over time, and evolves as your business does.
              </p>
              <p className="text-chrome-dim font-sans text-sm leading-relaxed">
                Intelligence isn't a feature — it's the architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
            >
              <div style={{ height: 400 }}>                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border border-chrome-faint/30 border-t-gold rounded-full animate-spin" />
                  </div>
                }>
                  <ModelViewer
                    objUrl="/models/monkey/monkey_web.obj"
                    textureUrl="/models/monkey/12958_Spider_Monkey_diff.jpg"
                    height={400}
                    color="#8B7355"
                    autoRotate
                    rotateSpeed={0.003}
                    cameraZ={4.0}
                    interactive
                    glowColor="#888894"
                  />
                </Suspense>              </div>            </motion.div>
          </div>
        </div>
      </section>


      {/* ══ HORSE 3D — Speed & Velocity ══ */}
      <section className="py-16 md:py-20 border-t border-chrome-faint/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
            >
              <Suspense fallback={
                <div style={{ height: 380 }}>
                  <div className="w-7 h-7 border border-chrome-faint/30 border-t-gold rounded-full animate-spin" />
                </div>
              }>
                <ModelViewer
                  objUrl="/models/horse/horse_web.obj"
                  height={380}
                  color="#C8C8D0"
                  autoRotate
                  rotateSpeed={0.006}
                  cameraZ={3.2}
                  interactive
                  glowColor="#C9A84C"
                  initialRotationY={0.8}
                  initialRotationX={0.05}
                />
              </Suspense>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <p className="mono-label mb-4">◈ Velocity</p>
              <h2 className="display-xl text-[clamp(2.5rem,4vw,3.8rem)] text-chrome mb-4">
                Built for<br /><em className="not-italic text-chrome-dim">full gallop.</em>
              </h2>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-6">
                We don't iterate slowly. We diagnose, architect, and ship — most systems go from discovery to production in 3–6 weeks. Speed without compromising the integrity of the architecture.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[['3–6 wks', 'MVP to Production'], ['< 2 wks', 'Kickoff Timeline'], ['Weekly', 'Delivery Cadence'], ['Always', 'Full Transparency']].map(([n, l]) => (
                  <div key={l} className="border border-chrome-faint/10 p-4 hover:border-gold/20 transition-colors duration-300">
                    <p className="font-display text-2xl font-light text-chrome mb-1">{n}</p>
                    <p className="mono-label">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* ── Team ── */}
      <section className="py-16 md:py-24 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.p className="mono-label mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>◈ The people</motion.p>
          <motion.h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] text-chrome mb-14"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Who builds this.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Mojo', role: 'Founder & Systems Architect', desc: 'Obsessed with AI-native product architecture and intelligent infrastructure.' },
              { name: 'Core Team', role: 'Engineers & Designers', desc: 'A distributed crew of specialists across AI, web, mobile, and DevOps.' },
            ].map((t, i) => (
              <motion.div key={t.name} className="border border-chrome-faint/10 p-8 hover:border-chrome-faint/30 transition-colors duration-400 bg-void-2/40"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="w-10 h-10 border border-chrome-faint/20 flex items-center justify-center mb-6">
                  <div className="w-3 h-3 bg-chrome-dim/50" />
                </div>
                <h3 className="font-display text-2xl text-chrome font-light mb-1">{t.name}</h3>
                <p className="mono-label mb-4">{t.role}</p>
                <p className="text-chrome-dim text-sm font-sans leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-chrome-faint/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <motion.h2 className="display-xl text-[clamp(2.5rem,5vw,4rem)] text-chrome mb-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Work with us.
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex">Get in Touch</Link>
            <Link to="/pricing" className="btn-ghost">View Pricing →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

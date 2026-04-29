import { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const videoScale  = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.85;
  }, []);

  return (
    <div className="bg-void min-h-screen">

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        {/* Robot video background */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: videoOpacity, scale: videoScale }}>
          <video
            ref={videoRef}
            src="/robot.mp4"
            autoPlay loop muted playsInline
            poster="/robot-poster.jpg"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-void to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-void via-void/80 to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-void/60 to-transparent z-10" />
          <div className="absolute inset-0 vignette z-10" />
        </motion.div>

        {/* Hero text + CTAs */}
        <motion.div
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full"
          style={{ y: textY }}
        >
          <motion.p
            className="mono-label mb-4 md:mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            ◈ Est. 2026 · Nairobi, Kenya · Global Reach
          </motion.p>

          <motion.h1
            className="display-xl text-[clamp(3rem,8vw,7rem)] text-chrome mb-4 md:mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Intelligence
            <br />
            <em className="not-italic text-chrome-dim">in every system.</em>
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link to="/services" className="btn-primary">
              View Our Systems
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="btn-ghost">Start a Project</Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-10 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="mono-label" style={{ writingMode: 'vertical-rl' }}></span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-chrome-dim to-transparent"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ══ SERVICES OVERVIEW ══ */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
            <div>
              <motion.p className="mono-label mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>◈ What we build</motion.p>
              <motion.h2
                className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] text-chrome"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
              >
                Core capabilities.
              </motion.h2>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Link to="/services" className="btn-ghost px-0">All Services →</Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-chrome-faint/10">
            {[
              { icon: '◎', title: 'Premium 3D Websites', desc: 'High-end, visually immersive websites built to attract, impress, and convert — with a look that puts competitors years behind.', delay: 0 },
              { icon: '◈', title: 'Intelligent Automation', desc: 'Speed to lead, full CRM & pipelines, review automation, and online booking — integrated into one seamless growth engine.', delay: 0.1 },
              { icon: '◇', title: 'SEO & Reporting', desc: 'Full SEO strategy, live keyword tracking, and custom dashboards giving you complete visibility over every metric that matters.', delay: 0.2 },
            ].map(({ icon, title, desc, delay }) => (
              <motion.div
                key={title}
                className="group relative p-8 bg-void hover:bg-void-2 transition-colors duration-400"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay }}
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-chrome-faint/20 group-hover:border-gold/40 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-chrome-faint/20 group-hover:border-gold/40 transition-colors duration-500" />
                <p className="text-3xl mb-6">{icon}</p>
                <h3 className="font-display text-2xl font-light text-chrome mb-3">{title}</h3>
                <p className="text-chrome-dim text-sm leading-relaxed font-sans">{desc}</p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mono-label text-gold">Explore</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5h12M8 1l4 4-4 4" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPACESHIP SHOWCASE ══ */}
      <section className="py-20 md:py-28 border-t border-chrome-faint/10 bg-void-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <p className="mono-label mb-4">◈ Beyond boundaries</p>
              <h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] text-chrome mb-4">
                We build for<br /><em className="not-italic text-chrome-dim">the frontier.</em>
              </h2>
              <p className="text-chrome-dim font-sans text-sm md:text-base leading-relaxed mb-8 max-w-md">
                We don't build generic websites or bolt-on tools. We engineer a complete premium presence — a website that stops people in their tracks, backed by automation that turns visitors into paying customers on autopilot.
              </p>
              <Link to="/services" className="btn-primary inline-flex">
                Explore Our Services
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
            >
              <Suspense fallback={null}>
                <ModelViewer
                  objUrl="/models/spaceship/spaceship_web.obj"
                  textureUrl="/models/spaceship/spaceship_color.jpg"
                  height={400}
                  autoRotate
                  rotateSpeed={0.003}
                  cameraZ={4.0}
                  interactive
                  glowColor="#6090ff"
                  initialRotationY={0.4}
                  initialRotationX={0.15}
                />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WATCH INTERLUDE ══ */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <video src="/watch.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-void/60" />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <motion.p className="mono-label mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              ◈ Precision by design
            </motion.p>
            <motion.h2
              className="display-xl text-[clamp(2.5rem,6vw,5.5rem)] text-chrome max-w-3xl"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Every moving part.<br /><em className="not-italic text-chrome-dim">Perfectly timed.</em>
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.p className="mono-label mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>◈ How we work</motion.p>
          <motion.h2
            className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] text-chrome mb-14 md:mb-20"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            Our process.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { n: '01', title: 'Diagnose', desc: 'Deep discovery into your workflows, pain points, and automation opportunities.' },
              { n: '02', title: 'Architect', desc: 'We design the system — AI models, integrations, data flows, infrastructure.' },
              { n: '03', title: 'Build', desc: 'Rapid, iterative development with full transparency and weekly deliverables.' },
              { n: '04', title: 'Deploy', desc: 'Launch, monitor, optimize. Systems that get smarter over time.' },
            ].map(({ n, title, desc }, i) => (
              <motion.div
                key={n} className="relative"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <p className="font-display text-7xl md:text-8xl font-light text-chrome-faint/20 mb-4 leading-none">{n}</p>
                <h3 className="font-display text-2xl font-light text-chrome mb-3">{title}</h3>
                <p className="text-chrome-dim text-sm leading-relaxed font-sans">{desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-10 -right-4 w-8 h-px bg-chrome-faint/20" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="py-20 md:py-28 border-t border-chrome-faint/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <motion.h2
            className="display-xl text-[clamp(2.5rem,6vw,5.5rem)] text-chrome mb-6"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
          >
            Ready to build<br /><em className="not-italic text-chrome-dim">something powerful?</em>
          </motion.h2>
          <motion.p
            className="text-chrome-dim font-sans text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
          >
            Most projects begin within 2 weeks of our first call.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="btn-primary">Book a Discovery Call</Link>
            <Link to="/pricing" className="btn-ghost">View Pricing →</Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

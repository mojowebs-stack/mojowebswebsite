import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Exact background color sampled from the video
const BG_R = 241, BG_G = 233, BG_B = 222;
const THRESHOLD = 24;   // distance below = fully transparent
const FEATHER = 52;     // distance above = fully opaque (soft edge between)
const SIZE = 300;       // canvas render size px

export default function FloatingHand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const rafRef    = useRef<number>(0);
  const [visible,  setVisible]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth * 0.82 : 1200);
  const handY = useMotionValue(200);
  const springX = useSpring(handX, { stiffness: 22, damping: 16 });
  const springY = useSpring(handY, { stiffness: 22, damping: 16 });

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Canvas chroma-key render loop
  useEffect(() => {
    if (isMobile || !visible) return;
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let running = true;

    const drawFrame = () => {
      if (!running) return;
      if (!video.paused && !video.ended && video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, SIZE, SIZE);
        const imgData = ctx.getImageData(0, 0, SIZE, SIZE);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          const dr = d[i]   - BG_R;
          const dg = d[i+1] - BG_G;
          const db = d[i+2] - BG_B;
          const dist = Math.sqrt(dr*dr + dg*dg + db*db);

          if (dist < THRESHOLD) {
            d[i+3] = 0; // fully transparent
          } else if (dist < FEATHER) {
            // smooth feathered edge
            const t = (dist - THRESHOLD) / (FEATHER - THRESHOLD);
            d[i+3] = Math.round(t * t * 255);
          }
          // else keep d[i+3] = 255 (fully opaque hand)
        }
        ctx.putImageData(imgData, 0, 0);
      }
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const onPlay = () => { if (running) rafRef.current = requestAnimationFrame(drawFrame); };
    video.addEventListener('play', onPlay);
    if (!video.paused) rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('play', onPlay);
    };
  }, [visible, isMobile]);

  // Scroll tracking + entrance
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setVisible(true), 2400);
    const onScroll = () => {
      const p  = Math.max(0, Math.min(1, window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)));
      const w  = window.innerWidth;
      const tx = w * 0.80 + Math.sin(p * Math.PI * 2.5) * (w * 0.14) + Math.cos(p * Math.PI * 1.4) * (w * 0.05);
      const ty = 140 + p * (window.innerHeight * 0.52) + Math.sin(p * Math.PI * 3.5) * 75 + Math.cos(p * Math.PI * 2.1) * 30;
      handX.set(Math.min(Math.max(tx, 80), w - 120));
      handY.set(Math.max(100, ty));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, [isMobile, handX, handY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed z-[500] pointer-events-none select-none hidden md:block"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      initial={{ opacity: 0, scale: 0, rotate: -25 }}
      animate={visible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -25 }}
      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        animate={{ y: [0,-18,-7,-22,-5,0], rotate: [0,5,-2,4,-1,0], scale: [1,1.03,0.98,1.04,0.99,1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0,0.2,0.4,0.6,0.8,1] }}
      >
        {/* Hidden video source for the canvas */}
        <video
          ref={videoRef}
          src="/hand.mp4"
          autoPlay loop muted playsInline
          style={{ display: 'none' }}
        />

        {/* Canvas renders chroma-keyed frames — fully transparent background */}
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ display: 'block' }}
        />

        {/* Gold glow halo */}
        <div style={{
          position: 'absolute', inset: '-28px', borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 60%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 50%, transparent 70%)',
          zIndex: -1, animation: 'pulseGlow 3.5s ease-in-out infinite',
        }} />

        {/* Ground shadow */}
        <div style={{
          position: 'absolute', bottom: '-10px', left: '50%',
          transform: 'translateX(-50%)', width: '55%', height: '10px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
          filter: 'blur(4px)', zIndex: -1,
        }} />
      </motion.div>
    </motion.div>
  );
}

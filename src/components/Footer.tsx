import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="border-t border-chrome-faint/20 bg-void py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-6 h-6 border border-chrome-faint group-hover:border-gold transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-chrome-dim group-hover:bg-gold transition-colors duration-300" />
              </div>
              <span className="font-display text-lg font-light tracking-widest text-chrome">
                MOJO<span className="text-chrome-dim">WEBS</span>
              </span>
            </Link>
            <p className="text-chrome-dim text-sm leading-relaxed max-w-xs font-sans">
              Premium 3D websites paired with intelligent automation — speed to lead, CRM, reviews, SEO, and reporting. All in one system.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.tiktok.com/@mojowebs4?_r=1&_t=ZN-95w1dlvbZNm" target="_blank" rel="noopener noreferrer" className="mono-label hover:text-chrome transition-colors duration-200">TikTok</a>
              <a href="https://github.com/calemaley" target="_blank" rel="noopener noreferrer" className="mono-label hover:text-chrome transition-colors duration-200">GitHub</a>
              <a href="https://www.instagram.com/mojwebs?igsh=OWl5bTZnNnB5aHE=" target="_blank" rel="noopener noreferrer" className="mono-label hover:text-chrome transition-colors duration-200">Instagram</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mono-label mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {[['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([l, t]) => (
                <Link key={t} to={t} className="text-chrome-dim hover:text-chrome text-sm transition-colors duration-200 font-sans">{l}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mono-label mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@mojowebs.top" className="text-chrome-dim hover:text-chrome text-sm transition-colors duration-200 font-sans">hello@mojowebs.top</a>
              <p className="text-chrome-dim text-sm font-sans">Nairobi, Kenya</p>
              <p className="text-chrome-dim text-sm font-sans">Global · Remote-first</p>
            </div>
          </div>
        </div>

        <div className="border-t border-chrome-faint/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="mono-label">© 2026 Mojowebs. All rights reserved.</p>
          <p className="mono-label">Built with precision — Powered by intelligence</p>
        </div>
      </div>
    </footer>
  );
}

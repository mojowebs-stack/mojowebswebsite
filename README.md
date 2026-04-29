# Mojowebs — Premium Agency Website

A cinematic, AI-agency website built with React + TypeScript + Framer Motion + Tailwind CSS.

---

## 🎬 Video Assets Used

| File | Usage |
|------|-------|
| `robot.mp4` | Hero section background (full-screen cinematic) |
| `watch.mp4` | Services page header + interlude section + workflow accent |
| `bee.mp4` | Floating scroll-following bee element + contact page accent |

All videos have been:
- Cropped to remove watermark regions
- Compressed from original (42MB → 2.1MB for robot, 6.6MB → 1.3MB for others)
- Optimized for web with `+faststart` flag (streams immediately)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
mojowebs/
├── public/
│   ├── robot.mp4          # Hero video (13s cinematic robot)
│   ├── robot-poster.jpg   # Hero poster frame
│   ├── watch.mp4          # Watch/gears video
│   ├── bee.mp4            # Bee floating element video
│   └── ...
├── src/
│   ├── components/
│   │   ├── Cursor.tsx     # Custom magnetic cursor (desktop)
│   │   ├── FloatingBee.tsx # Scroll-following bee
│   │   ├── Layout.tsx     # Page wrapper with transitions
│   │   ├── Nav.tsx        # Responsive navigation
│   │   └── Footer.tsx     # Site footer
│   ├── pages/
│   │   ├── Home.tsx       # Hero + services + watch interlude + process
│   │   ├── Services.tsx   # Full services with watch bg
│   │   ├── About.tsx      # Story, values, team
│   │   ├── Pricing.tsx    # 3 tiers, FAQ, comparison table
│   │   └── Contact.tsx    # Form with bee accent
│   ├── hooks/
│   │   └── useInView.ts   # Intersection Observer hook
│   ├── App.tsx            # Router setup
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles, animations, grain
├── index.html             # Root HTML with Google Fonts
├── tailwind.config.js     # Design system config
├── vite.config.ts         # Vite config
└── tsconfig.json
```

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `void` | `#0B0B0F` | Page background |
| `void-2` | `#0F0F14` | Elevated surfaces |
| `void-3` | `#141419` | Card backgrounds |
| `chrome` | `#C8C8D0` | Primary text |
| `chrome-dim` | `#888894` | Secondary text, labels |
| `chrome-faint` | `#3A3A46` | Borders, dividers |
| `gold` | `#C9A84C` | Accent, CTAs, highlights |

### Typography
- **Display:** Cormorant Garamond (editorial, cinematic headings)
- **Mono:** DM Mono (labels, tags, code)
- **Body:** DM Sans (readable, modern)

### Key CSS Classes
```css
.display-xl       /* Big editorial headings */
.mono-label       /* Small uppercase monospace labels */
.btn-primary      /* Gold-accent primary button */
.btn-ghost        /* Text-only ghost button */
.grain-overlay    /* Animated film grain */
.scanline         /* Horizontal scan line animation */
.vignette         /* Radial darkening overlay */
.nav-glass        /* Frosted glass nav on scroll */
.pricing-card     /* Hover-lift pricing tier card */
```

---

## 📄 Pages

### `/` — Home
- **Hero:** Full-screen robot.mp4 with cinematic overlays, parallax on scroll
- **Stats:** 4 animated counters (40+ systems, 98% retention, 3× efficiency, 24h response)
- **Services:** 3 cards (AI Automations, Software Dev, Workflow Systems)
- **Interlude:** watch.mp4 cinematic quote section
- **Process:** 4-step numbered process (Diagnose → Architect → Build → Deploy)
- **CTA Band:** Call-to-action with pricing link

### `/services` — Services
- Header with watch.mp4 as transparent background
- Full alternating sections per service with capabilities grid
- Tech stack pill cloud (18 technologies)

### `/about` — About
- Hero with robot.mp4 at low opacity
- Story + mission quote panel
- 4 value pillars (Precision, Intelligence, Velocity, Transparency)
- Team section

### `/pricing` — Pricing ⭐
- Monthly/Annual toggle (20% savings)
- 3 tiers: Starter ($1,200/mo), Growth ($3,800/mo), Enterprise (Custom)
- Feature comparison table
- Animated FAQ accordion (5 questions)

### `/contact` — Contact
- Split layout: info panel + form
- Service selector (chip buttons)
- Budget selector (chip buttons)
- Bee.mp4 accent panel with quote
- Success state animation

---

## ✨ Animations & Effects

| Effect | Implementation |
|--------|---------------|
| Film grain | CSS `@keyframes grain` + SVG noise filter |
| Scan line | Animated 1px horizontal gradient |
| Custom cursor | RAF-based spring cursor (desktop only) |
| Floating bee | Scroll-position + spring physics (Framer Motion) |
| Hero parallax | `useScroll` + `useTransform` (Framer Motion) |
| Page transitions | `AnimatePresence` slide-fade |
| Scroll reveals | `whileInView` with `once: true` |
| Nav indicator | `layoutId` shared layout animation |
| Pricing hover | CSS transform + border-color transition |

---

## 📱 Responsive Design

- **Mobile:** Hamburger nav, full-screen overlay menu, single-column layouts, no custom cursor
- **Tablet:** 2-column grids, scaled typography
- **Desktop:** Full 3-column grids, custom cursor, floating bee, all animations
- Typography uses `clamp()` for fluid scaling across all breakpoints

---

## 🚀 Deployment

### Netlify (recommended)
```bash
npm run build
# Upload dist/ folder to Netlify, or connect your repo
# Set publish directory: dist
# Build command: npm run build
```

### Vercel
```bash
npm run build
# Or connect repo — Vercel auto-detects Vite
```

### Self-hosted
```bash
npm run build
# Serve the dist/ folder with any static file server
npx serve dist
```

---

## 🔧 Customization

### Update agency name/info
- `index.html` — meta title, description
- `src/components/Nav.tsx` — logo text
- `src/components/Footer.tsx` — contact info, socials
- `src/pages/About.tsx` — story, team
- `src/pages/Pricing.tsx` — pricing tiers, amounts

### Add/change videos
Drop `.mp4` files into `/public/` and update `src` props in:
- `src/pages/Home.tsx` (robot + watch)
- `src/components/FloatingBee.tsx` (bee)
- `src/pages/Services.tsx` (watch)
- `src/pages/Contact.tsx` (bee)

### Update pricing
Edit the `tiers` array at the top of `src/pages/Pricing.tsx`

---

Built by Mojowebs · © 2025

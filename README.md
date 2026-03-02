# Portfolio — Bhavya kokaria
### F1 × Taylor Swift Aesthetic.

---

## ✨ About

A personal portfolio website with a bold, high-contrast **pink** (obviously) aesthetic that fuses:
- **Formula 1** — speed lines, racing typography, sharp clip-path angles, precision
- **Taylor Swift** — elegance, emotional storytelling, italic serif display text, warmth

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Single-page portfolio
├── css/
│   └── styles.css      ← All styles (fully commented, section-by-section)
├── js/
│   └── main.js         ← Cursor, animations, scroll reveal, interactions
└── README.md           ← You're here
```

---

## 🚀 How to Run Locally

### Option 1 — Just open the file (simplest)
```bash
# No build step needed. Just open index.html in your browser:
open index.html
```
Or double-click `index.html` in Finder / Explorer.

> **Note:** Google Fonts require an internet connection. Everything else works fully offline.

---

### Option 2 — Local dev server (recommended for best experience)

**Using Python (built-in, no install needed):**
```bash
cd portfolio
python3 -m http.server 3000
# → Open http://localhost:3000
```

**Using Node.js / npx:**
```bash
cd portfolio
npx serve .
# → Follow the URL shown in terminal
```

**Using VS Code:**
Install the **Live Server** extension, right-click `index.html` → *Open with Live Server*.

---

## 🎨 Design Decisions

| Choice | Reasoning |
|---|---|
| `Playfair Display` | Elegant serif — Taylor Swift editorial energy |
| `Barlow Condensed` | Racing numbering, bold caps — F1 paddock style |
| `DM Sans` | Clean body copy — readable, not corporate |
| Pink palette | `#E91E8C` hot pink as hero, deep `#C0135A` for depth |
| `clip-path` angled buttons | F1 chevron / aero shape references |
| Speed lines animation | F1 straight-line speed visual motif |
| Marquee ticker | F1 TV timing tower / championship ticker |
| Dark background | Premium, gallery-quality feel |

---

## 🖱️ Interactions

- **Custom cursor** — floating dot + ring + trailing fade particles
- **Hover effects** — cursor enlarges on interactive elements
- **Scroll reveal** — sections animate in with staggered timing
- **Skill bars** — animate in when scrolled into view
- **Project card tilt** — subtle 3D perspective on hover
- **Hero parallax** — orbs shift with scroll + mouse movement
- **Stat counters** — numbers count up on hero enter
- **Marquee tape** — F1-style ticker, pauses on hover
- **Glitch on headline** — subtle chromatic aberration on hero hover

---

## 🔧 Customisation

### Change the name / info
Edit `index.html` — search for `Alexandra Rose` and replace throughout.

### Change the color theme
Edit the CSS variables at the top of `css/styles.css`:
```css
:root {
  --pink-hot: #E91E8C;   /* ← Main accent */
  --pink-deep: #C0135A;  /* ← Dark accent */
  --pink-vivid: #FF4DB8; /* ← Bright highlight */
  /* ... */
}
```

### Add/edit projects
Find the `#projects` section in `index.html`. Each `.project-card` article follows the same pattern — copy/paste and update the content.

### Change fonts
Update the `@import` line in `styles.css` and the `--font-*` variables.

---

## 📱 Responsive

- ✅ Desktop (1440px+) — full layout, hero stats visible
- ✅ Laptop (1200px) — slightly tightened padding
- ✅ Tablet (1024px) — stacked about section, single-column projects
- ✅ Mobile (768px) — hamburger nav, full single-column layout

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox, `clip-path`, CSS animations) |
| Interactivity | Vanilla JavaScript (ES2020+) |
| Fonts | Google Fonts (Playfair Display, Barlow Condensed, DM Sans) |
| No dependencies | Zero npm packages, zero frameworks |

---

## 🏎️ Performance

- No frameworks = fast load
- Google Fonts preconnected
- CSS animations use `transform` + `opacity` only (GPU-accelerated)
- `IntersectionObserver` for lazy-trigger animations (no scroll event spam)
- `requestAnimationFrame` for cursor animation loop
- `passive: true` on scroll listeners

---

*Built with 🌸 and the energy of a perfect qualifying lap + a Taylor Swift bridge*

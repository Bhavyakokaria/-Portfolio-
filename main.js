/* ============================================
   PORTFOLIO — INTERACTIONS & ANIMATIONS
   Custom Cursor | Scroll Reveal | Speed Lines
   ============================================ */

'use strict';

/* ==========================================
   CUSTOM CURSOR
   Dot + Ring + Fading Trails
   ========================================== */
class CustomCursor {
  constructor() {
    this.dot  = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    this.trails = [];
    this.trailCount = 6;

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.trailPositions = Array(this.trailCount).fill({ x: -100, y: -100 });

    this.createTrails();
    this.bindEvents();
    this.tick();
  }

  createTrails() {
    for (let i = 0; i < this.trailCount; i++) {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail');
      trail.style.opacity = (1 - i / this.trailCount) * 0.25;
      trail.style.width = trail.style.height = `${Math.max(3, 6 - i)}px`;
      document.body.appendChild(trail);
      this.trails.push(trail);
    }
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      // shift trail positions
      for (let i = this.trailCount - 1; i > 0; i--) {
        this.trailPositions[i] = { ...this.trailPositions[i - 1] };
      }
      this.trailPositions[0] = { x: e.clientX, y: e.clientY };
    });

    // Hover states
    const hoverEls = document.querySelectorAll('a, button, .project-card, .skill-category, .persona-block, .badge, .skill-pill');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      this.dot.style.opacity = '0';
      this.ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      this.dot.style.opacity = '';
      this.ring.style.opacity = '';
    });
  }

  tick() {
    // Smooth ring follow
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.14;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.14;

    // Position dot (immediate)
    this.dot.style.left  = this.mouse.x + 'px';
    this.dot.style.top   = this.mouse.y + 'px';

    // Position ring (lagged)
    this.ring.style.left = this.ringPos.x + 'px';
    this.ring.style.top  = this.ringPos.y + 'px';

    // Position trails
    this.trails.forEach((trail, i) => {
      const pos = this.trailPositions[Math.min(i * 2, this.trailCount - 1)];
      if (pos) {
        trail.style.left = pos.x + 'px';
        trail.style.top  = pos.y + 'px';
        trail.style.opacity = (1 - i / this.trailCount) * 0.18;
      }
    });

    requestAnimationFrame(() => this.tick());
  }
}

/* ==========================================
   SPEED LINES (F1-INSPIRED)
   ========================================== */
class SpeedLines {
  constructor(container) {
    this.container = container;
    this.lines = [];
    this.count = 12;
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      const line = document.createElement('div');
      line.classList.add('speed-line');

      const topPct = 5 + Math.random() * 90;
      const widthPct = 10 + Math.random() * 25;
      const delay = Math.random() * 4;
      const duration = 2 + Math.random() * 2;
      const opacity = 0.1 + Math.random() * 0.35;

      line.style.top      = `${topPct}%`;
      line.style.width    = `${widthPct}%`;
      line.style.animationDelay    = `-${delay}s`;
      line.style.animationDuration = `${duration}s`;
      line.style.opacity  = opacity;

      this.container.appendChild(line);
      this.lines.push(line);
    }
  }
}

/* ==========================================
   SCROLL REVEAL
   ========================================== */
class ScrollReveal {
  constructor() {
    this.els = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    this.els.forEach(el => observer.observe(el));
  }
}

/* ==========================================
   SKILL BARS — ANIMATE ON SCROLL
   ========================================== */
class SkillBars {
  constructor() {
    this.bars = document.querySelectorAll('.skill-bar-fill');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.dataset.pct || '80';
          setTimeout(() => {
            bar.style.width = pct + '%';
          }, 100);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    this.bars.forEach(bar => observer.observe(bar));
  }
}

/* ==========================================
   STICKY NAV
   ========================================== */
function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ==========================================
   SMOOTH ANCHOR SCROLLING
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================
   HERO PARALLAX
   ========================================== */
function initParallax() {
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (orb1) orb1.style.transform = `translateY(${y * 0.3}px)`;
    if (orb2) orb2.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });

  // Mouse parallax in hero
  const hero = document.querySelector('#hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const cy = (e.clientY - rect.top  - rect.height / 2) / rect.height;

    if (orb1) orb1.style.transform += ` translate(${cx * 20}px, ${cy * 20}px)`;
    if (orb2) orb2.style.transform += ` translate(${cx * -15}px, ${cy * -15}px)`;
  });
}

/* ==========================================
   STAT COUNTER (hero numbers)
   ========================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur = 1500;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================
   MARQUEE (duplicate content for seamless loop)
   ========================================== */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const clone = track.cloneNode(true);
  track.parentNode.appendChild(clone);
}

/* ==========================================
   MOBILE HAMBURGER (basic toggle)
   ========================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navCta    = document.querySelector('.nav-cta');

  if (!hamburger) return;

  let open = false;

  hamburger.addEventListener('click', () => {
    open = !open;
    if (open) {
      navLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 70px; left: 0; right: 0;
        background: rgba(10,10,10,0.97);
        padding: 32px 24px;
        gap: 24px;
        border-bottom: 1px solid rgba(255,77,184,0.15);
        backdrop-filter: blur(20px);
        z-index: 999;
      `;
      hamburger.children[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      hamburger.children[1].style.opacity   = '0';
      hamburger.children[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      navLinks.style.cssText = 'display: none;';
      hamburger.children[0].style.transform = '';
      hamburger.children[1].style.opacity   = '';
      hamburger.children[2].style.transform = '';
    }
  });

  // close on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (open) hamburger.click();
    });
  });
}

/* ==========================================
   TILT EFFECT ON PROJECT CARDS
   ========================================== */
function initTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });
}

/* ==========================================
   GLITCH EFFECT ON HOVER (hero headline)
   ========================================== */
function initGlitch() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  let glitchTimeout;

  headline.addEventListener('mouseenter', () => {
    clearTimeout(glitchTimeout);
    headline.style.textShadow = `
      2px 0 var(--pink-vivid),
      -2px 0 rgba(0, 255, 200, 0.4)
    `;
    glitchTimeout = setTimeout(() => {
      headline.style.textShadow = '';
    }, 150);
  });
}

/* ==========================================
   INIT ALL
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Cursor (desktop only)
  if (window.matchMedia('(pointer: fine)').matches) {
    new CustomCursor();
  }

  // Speed lines in hero
  const speedContainer = document.querySelector('.speed-lines');
  if (speedContainer) new SpeedLines(speedContainer);

  // Core interactions
  new ScrollReveal();
  new SkillBars();

  initNav();
  initSmoothScroll();
  initParallax();
  initCounters();
  initMarquee();
  initMobileMenu();
  initTilt();
  initGlitch();

  // Re-check hover elements (for dynamically added cursor class)
  setTimeout(() => {
    const newHoverEls = document.querySelectorAll('a, button, .project-card, .skill-category, .persona-block, .badge, .skill-pill');
    newHoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }, 500);

  console.log('%c🏎️ Portfolio Loaded — Fast & Fearless', 'color: #E91E8C; font-family: monospace; font-size: 14px;');
});

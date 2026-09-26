/**
 * CAO NGOC MINH PORTFOLIO — ADVANCED INTERACTIVE EFFECTS & MAIN LOGIC
 * Includes:
 * 1. Scroll Progress Bar (Top)
 * 2. Back To Top Floating Action with Circular Progress Ring
 * 3. Custom Glowing Ambient Cursor (Desktop Fine Pointer)
 * 4. Card Spotlight Illumination (Mouse Track)
 * 5. Subtle 3D Tilt Effect on Project Cards
 * 6. Scroll Reveal Observer (Staggered Fade-in)
 * 7. Ambient Hero Star-Dust Particles Canvas
 * 8. Button Shimmer & Click Ripple Waves
 * 9. Number Counter Animation with Smooth Easing
 * 10. Responsive Navigation & Dynamic Year
 */

// ==========================================================================
// 1. NUMBER COUNTER ANIMATION WITH SMOOTH EASING
// ==========================================================================
function animateCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        obs.unobserve(el);

        const target = parseFloat(el.getAttribute('data-target') || '0');
        const duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const padLength = parseInt(el.getAttribute('data-pad') || '1', 10);
        const isDecimal = el.getAttribute('data-decimal') === 'true';

        let startTime = null;

        function updateCount(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Smooth easeOutExpo curve for premium feel
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = easeProgress * target;

          let displayVal = '';
          if (isDecimal) {
            displayVal = currentVal.toFixed(1);
          } else {
            displayVal = Math.floor(currentVal).toString().padStart(padLength, '0');
          }

          el.textContent = `${prefix}${displayVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            let finalVal = isDecimal ? target.toFixed(1) : target.toString().padStart(padLength, '0');
            el.textContent = `${prefix}${finalVal}${suffix}`;
          }
        }

        requestAnimationFrame(updateCount);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

// ==========================================================================
// 2. SCROLL PROGRESS BAR (TOP)
// ==========================================================================
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

// ==========================================================================
// 3. BACK TO TOP BUTTON WITH CIRCULAR SVG PROGRESS
// ==========================================================================
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Cuộn lên đầu trang');
    btn.innerHTML = `
      <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle class="progress-ring-bg" cx="24" cy="24" r="21" fill="transparent" stroke="rgba(0, 223, 137, 0.15)" stroke-width="2.5"></circle>
        <circle class="progress-ring-circle" id="btt-circle" cx="24" cy="24" r="21" fill="transparent" stroke="#00DF89" stroke-width="2.5" stroke-dasharray="131.95" stroke-dashoffset="131.95" stroke-linecap="round"></circle>
      </svg>
      <span class="material-symbols-outlined text-[20px] text-[#00DF89] transition-transform duration-200">arrow_upward</span>
    `;
    document.body.appendChild(btn);
  }

  const circle = document.getElementById('btt-circle');
  const circumference = 2 * Math.PI * 21; // ~131.95

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrollTop > 320) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }

    if (circle) {
      const offset = circumference - (Math.min(1, Math.max(0, progress)) * circumference);
      circle.style.strokeDashoffset = offset;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================================================
// 4. CUSTOM GLOWING AMBIENT CURSOR (DESKTOP)
// ==========================================================================
function initCustomCursor() {
  // Only enable on devices with hover and mouse pointer
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      dot.classList.add('is-active');
      ring.classList.add('is-active');
    }
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }, { passive: true });

  // Smooth lerp trailing for ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on interactive items
  const interactiveSelector = 'a, button, input, textarea, select, .project-card, .capability-card, .stat-item, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    }
  });

  document.addEventListener('mousedown', () => {
    ring.classList.add('cursor-click');
  });

  document.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-click');
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('is-active');
    ring.classList.remove('is-active');
    isMoving = false;
  });
}

// ==========================================================================
// 5. CARD SPOTLIGHT HOVER ILLUMINATION
// ==========================================================================
function initSpotlightCards() {
  const cards = document.querySelectorAll('.project-card, .capability-card, .case-card, .spotlight-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.classList.add('spotlight-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });
}

// ==========================================================================
// 6. SUBTLE 3D TILT EFFECT ON CARDS
// ==========================================================================
function initTiltCards() {
  // Only on desktop fine pointer
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card, .project-card');
  if (!tiltCards.length) return;

  tiltCards.forEach(card => {
    card.classList.add('tilt-card');
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        // Max tilt of 4.5 degrees for smooth subtle elegance
        const tiltX = -deltaY * 4.5;
        const tiltY = deltaX * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
        ticking = false;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ==========================================================================
// 7. SCROLL REVEAL OBSERVER
// ==========================================================================
function initScrollReveal() {
  // Auto-decorate sections and project grids if not explicitly set
  const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger, .reveal-scale, .reveal-slide-left, .reveal-slide-right');
  
  if (!elements.length) {
    // Add default reveal to main sections
    const sections = document.querySelectorAll('main > div > section');
    sections.forEach(sec => sec.classList.add('reveal-on-scroll'));
  }

  const revealTargets = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger, .reveal-scale, .reveal-slide-left, .reveal-slide-right');
  if (!revealTargets.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(target => observer.observe(target));
}

// ==========================================================================
// 8. AMBIENT HERO PARTICLES CANVAS
// ==========================================================================
function initHeroParticles() {
  let canvas = document.getElementById('hero-particles');
  const heroSection = document.querySelector('section:has(.heading-hero), section');
  
  if (!canvas && heroSection) {
    canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    heroSection.prepend(canvas);
  }

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth);
  let height = (canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight);

  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
  }, { passive: true });

  const particleCount = Math.min(50, Math.floor((width * height) / 18000));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(0, 223, 137,' : 'rgba(163, 230, 53,',
      alpha: Math.random() * 0.45 + 0.2
    });
  }

  let animationFrameId = null;
  let isPaused = false;

  function draw() {
    if (isPaused) return;
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();

      // Constellation lines to nearest neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 223, 137, ${(1 - dist / 110) * 0.14})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Optimize: Pause animation when hero is offscreen
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (isPaused) {
          isPaused = false;
          draw();
        }
      } else {
        isPaused = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.05 });

  heroObserver.observe(canvas.parentElement || canvas);
  draw();
}

// ==========================================================================
// 9. BUTTON CLICK RIPPLE WAVES
// ==========================================================================
function initButtonRipples() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-primary, .btn-secondary, .btn-accent-gradient');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-circle';

    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;

    btn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// ==========================================================================
// 10. DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Effects
  initScrollProgressBar();
  initBackToTop();
  initCustomCursor();
  initSpotlightCards();
  initTiltCards();
  initScrollReveal();
  initHeroParticles();
  initButtonRipples();

  // 2. Animated Counters
  animateCounters();

  // 3. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-[24px]">close</span>';
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-[24px]">menu</span>';
      }
    });
  }

  // 5. Active Link Highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const normalizedHref = href.replace('./', '').replace('../', '');
      const normalizedPath = currentPath.split('/').pop() || 'index.html';

      if (
        (normalizedPath === '' || normalizedPath === 'index.html') &&
        (normalizedHref === 'index.html' || normalizedHref === './index.html' || normalizedHref === '../index.html')
      ) {
        if (link.classList.contains('nav-pill-item')) {
          link.classList.add('nav-pill-active');
        } else {
          link.classList.add('nav-link-active-mobile');
        }
      } else if (normalizedPath && normalizedHref.includes(normalizedPath) && normalizedHref !== '../index.html' && normalizedHref !== 'index.html') {
        if (link.classList.contains('nav-pill-item')) {
          link.classList.add('nav-pill-active');
        } else {
          link.classList.add('nav-link-active-mobile');
        }
      }
    }
  });

  // 6. Project Card Navigation Click Handling
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    const onclickAttr = card.getAttribute('onclick') || '';
    if (onclickAttr.includes('openProjectModal')) {
      return;
    }

    const href = card.getAttribute('href') || card.getAttribute('data-href');
    if (href && !e.target.closest('a')) {
      e.preventDefault();
      window.location.href = href;
    }
  });
});

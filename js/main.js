/**
 * CAO NGOC MINH PORTFOLIO — MAIN INTERACTIONS (FIXED)
 * Keeps the existing visual system while improving:
 * - reduced-motion accessibility
 * - mobile menu accessibility
 * - animation lifecycle / battery usage
 * - safe keyboard interactions
 * - current-year rendering
 */

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const hasFinePointer = window.matchMedia(
  '(hover: hover) and (pointer: fine)'
).matches;

function animateCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const setFinal = (el) => {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const padLength = parseInt(el.getAttribute('data-pad') || '1', 10);
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const finalVal = isDecimal
      ? target.toFixed(1)
      : target.toString().padStart(padLength, '0');

    el.textContent = `${prefix}${finalVal}${suffix}`;
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach(setFinal);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      obs.unobserve(el);

      const target = parseFloat(el.getAttribute('data-target') || '0');
      const duration = parseInt(
        el.getAttribute('data-duration') || '1800',
        10
      );
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const padLength = parseInt(
        el.getAttribute('data-pad') || '1',
        10
      );
      const isDecimal =
        el.getAttribute('data-decimal') === 'true';

      let startTime = null;

      function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min(
          (timestamp - startTime) / duration,
          1
        );

        const eased =
          progress === 1
            ? 1
            : 1 - Math.pow(2, -10 * progress);

        const currentVal = eased * target;

        const displayVal = isDecimal
          ? currentVal.toFixed(1)
          : Math.floor(currentVal)
              .toString()
              .padStart(padLength, '0');

        el.textContent =
          `${prefix}${displayVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setFinal(el);
        }
      }

      requestAnimationFrame(updateCount);
    });
  }, { threshold: 0.2 });

  counters.forEach((counter) => observer.observe(counter));
}

function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');

  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const scrollPercent =
      docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;

    bar.style.width =
      `${Math.min(100, Math.max(0, scrollPercent))}%`;
  };

  window.addEventListener(
    'scroll',
    updateProgress,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateProgress,
    { passive: true }
  );

  updateProgress();
}

function initBackToTop() {
  let btn = document.getElementById('back-to-top');

  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.type = 'button';
    btn.setAttribute(
      'aria-label',
      'Cuộn lên đầu trang'
    );
    btn.innerHTML = `
      <svg class="progress-ring" width="48" height="48"
           viewBox="0 0 48 48" aria-hidden="true">
        <circle class="progress-ring-bg"
                cx="24" cy="24" r="21"
                fill="transparent"
                stroke="rgba(0, 223, 137, 0.15)"
                stroke-width="2.5"></circle>
        <circle class="progress-ring-circle"
                id="btt-circle"
                cx="24" cy="24" r="21"
                fill="transparent"
                stroke="#00DF89"
                stroke-width="2.5"
                stroke-dasharray="131.95"
                stroke-dashoffset="131.95"
                stroke-linecap="round"></circle>
      </svg>
      <span class="material-symbols-outlined text-[20px] text-[#00DF89]"
            aria-hidden="true">arrow_upward</span>
    `;
    document.body.appendChild(btn);
  }

  const circle =
    document.getElementById('btt-circle');

  const circumference =
    2 * Math.PI * 21;

  const onScroll = () => {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrollTop > 320) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }

    if (circle) {
      circle.style.strokeDashoffset =
        circumference -
        Math.min(1, Math.max(0, progress)) *
        circumference;
    }
  };

  window.addEventListener(
    'scroll',
    onScroll,
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion
        ? 'auto'
        : 'smooth'
    });
  });

  onScroll();
}

function initCustomCursor() {
  // Custom cursor disabled
}

function initSpotlightCards() {
  const cards = document.querySelectorAll(
    '.project-card, .capability-card, ' +
    '.case-card, .spotlight-card'
  );

  if (!cards.length || prefersReducedMotion) return;

  cards.forEach((card) => {
    card.classList.add('spotlight-card');

    card.addEventListener(
      'mousemove',
      (event) => {
        const rect =
          card.getBoundingClientRect();

        card.style.setProperty(
          '--mouse-x',
          `${event.clientX - rect.left}px`
        );

        card.style.setProperty(
          '--mouse-y',
          `${event.clientY - rect.top}px`
        );
      },
      { passive: true }
    );
  });
}

function initTiltCards() {
  if (!hasFinePointer || prefersReducedMotion) return;

  const tiltCards = document.querySelectorAll(
    '.tilt-card, .project-card'
  );

  if (!tiltCards.length) return;

  tiltCards.forEach((card) => {
    let ticking = false;

    card.classList.add('tilt-card');

    card.addEventListener(
      'mousemove',
      (event) => {
        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {
          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const deltaX =
            (x - centerX) / centerX;

          const deltaY =
            (y - centerY) / centerY;

          const tiltX = -deltaY * 4.5;
          const tiltY = deltaX * 4.5;

          card.style.transform =
            `perspective(1000px) ` +
            `rotateX(${tiltX.toFixed(2)}deg) ` +
            `rotateY(${tiltY.toFixed(2)}deg) ` +
            `translateY(-4px)`;

          ticking = false;
        });
      },
      { passive: true }
    );

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-stagger, ' +
    '.reveal-scale, .reveal-slide-left, ' +
    '.reveal-slide-right'
  );

  if (!elements.length) return;

  if (
    prefersReducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    elements.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach((target) =>
    observer.observe(target)
  );
}

function initHeroParticles() {
  if (prefersReducedMotion) return;

  let canvas =
    document.getElementById('hero-particles');

  const heroSection =
    document.querySelector(
      'section:has(.heading-hero), section'
    );

  if (!canvas && heroSection) {
    canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    heroSection.prepend(canvas);
  }

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;

  const resize = () => {
    const parent = canvas.parentElement;
    width =
      canvas.width =
      parent ? parent.offsetWidth : window.innerWidth;

    height =
      canvas.height =
      parent ? parent.offsetHeight : window.innerHeight;
  };

  resize();

  window.addEventListener(
    'resize',
    resize,
    { passive: true }
  );

  const particleCount = Math.min(
    50,
    Math.floor((width * height) / 18000)
  );

  const particles = Array.from(
    { length: particleCount },
    () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.8,
      color:
        Math.random() > 0.4
          ? 'rgba(0, 223, 137,'
          : 'rgba(163, 230, 53,',
      alpha: Math.random() * 0.45 + 0.2
    })
  );

  let frameId = null;
  let paused = false;

  const draw = () => {
    if (paused) return;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        p.radius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle =
        `${p.color}${p.alpha})`;
      ctx.fill();

      for (
        let j = i + 1;
        j < particles.length;
        j += 1
      ) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist =
          Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle =
            `rgba(0, 223, 137, ` +
            `${(1 - dist / 110) * 0.14})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    frameId = requestAnimationFrame(draw);
  };

  if ('IntersectionObserver' in window) {
    const heroObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (paused) {
                paused = false;
                draw();
              }
            } else {
              paused = true;
              if (frameId) {
                cancelAnimationFrame(frameId);
                frameId = null;
              }
            }
          });
        },
        { threshold: 0.05 }
      );

    heroObserver.observe(
      canvas.parentElement || canvas
    );
  }

  draw();
}

function initButtonRipples() {
  if (prefersReducedMotion) return;

  document.addEventListener('click', (event) => {
    const button =
      event.target.closest(
        '.btn-primary, .btn-secondary, ' +
        '.btn-accent-gradient'
      );

    if (!button) return;

    const rect =
      button.getBoundingClientRect();

    const ripple =
      document.createElement('span');

    ripple.className = 'ripple-circle';

    const diameter =
      Math.max(rect.width, rect.height);

    const radius = diameter / 2;

    ripple.style.width =
      ripple.style.height =
      `${diameter}px`;

    ripple.style.left =
      `${event.clientX - rect.left - radius}px`;

    ripple.style.top =
      `${event.clientY - rect.top - radius}px`;

    button.appendChild(ripple);

    window.setTimeout(
      () => ripple.remove(),
      600
    );
  });
}

function closeMobileMenu(
  mobileMenu,
  mobileMenuBtn
) {
  if (!mobileMenu || !mobileMenuBtn) return;

  mobileMenu.classList.add('hidden');
  mobileMenuBtn.setAttribute(
    'aria-expanded',
    'false'
  );

  mobileMenuBtn.innerHTML =
    '<span class="material-symbols-outlined text-[24px]" ' +
    'aria-hidden="true">menu</span>';
}

function initNavigation() {
  const mobileMenuBtn =
    document.getElementById('mobile-menu-btn');

  const mobileMenu =
    document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.setAttribute(
      'aria-expanded',
      'false'
    );
    mobileMenuBtn.setAttribute(
      'aria-controls',
      'mobile-menu'
    );

    mobileMenuBtn.addEventListener('click', () => {
      const isHidden =
        mobileMenu.classList.contains('hidden');

      mobileMenu.classList.toggle(
        'hidden',
        !isHidden
      );

      mobileMenuBtn.setAttribute(
        'aria-expanded',
        String(isHidden)
      );

      mobileMenuBtn.innerHTML = isHidden
        ? '<span class="material-symbols-outlined text-[24px]" aria-hidden="true">close</span>'
        : '<span class="material-symbols-outlined text-[24px]" aria-hidden="true">menu</span>';
    });

    mobileMenu
      .querySelectorAll('a')
      .forEach((link) => {
        link.addEventListener('click', () =>
          closeMobileMenu(
            mobileMenu,
            mobileMenuBtn
          )
        );
      });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu(
          mobileMenu,
          mobileMenuBtn
        );
      }
    });
  }

  const currentPath =
    window.location.pathname;

  const navLinks =
    document.querySelectorAll(
      'header nav a, #mobile-menu a'
    );

  navLinks.forEach((link) => {
    const href =
      link.getAttribute('href');

    if (!href) return;

    const cleanHref =
      href.split('#')[0]
        .split('?')[0];

    const normalizedHref =
      cleanHref
        .replace('./', '')
        .replace('../', '');

    const normalizedPath =
      currentPath.split('/').pop() ||
      'index.html';

    const isHome =
      (
        normalizedPath === '' ||
        normalizedPath === 'index.html'
      ) &&
      (
        normalizedHref === 'index.html' ||
        normalizedHref === './index.html' ||
        normalizedHref === '../index.html'
      );

    const isCurrent =
      normalizedPath &&
      normalizedHref.includes(normalizedPath) &&
      normalizedHref !== '../index.html' &&
      normalizedHref !== 'index.html';

    if (isHome || isCurrent) {
      if (
        link.classList.contains(
          'nav-pill-item'
        )
      ) {
        link.classList.add(
          'nav-pill-active'
        );
      } else {
        link.classList.add(
          'nav-link-active-mobile'
        );
      }
    }
  });
}

function initProjectCardNavigation() {
  document.addEventListener('click', (event) => {
    const card =
      event.target.closest('.project-card');

    if (!card) return;

    const onclickAttr =
      card.getAttribute('onclick') || '';

    if (
      onclickAttr.includes(
        'openProjectModal'
      )
    ) {
      return;
    }

    const href =
      card.getAttribute('href') ||
      card.getAttribute('data-href');

    if (
      href &&
      !event.target.closest('a')
    ) {
      event.preventDefault();
      window.location.href = href;
    }
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadDynamicHomeProjects() {
  const selectedWorkSection = document.getElementById('selected-work');
  if (!selectedWorkSection) return;

  const grid = selectedWorkSection.querySelector('.grid');
  if (!grid) return;

  document.querySelectorAll('.home-dynamic-project-card').forEach(el => el.remove());

  let customProjects = [];
  try {
    customProjects = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
  } catch (e) {
    console.error('Error reading mp_custom_projects', e);
  }

  if (customProjects.length === 0) return;

  customProjects.forEach((p) => {
    if (!p || !p.name) return;
    const cat = String(p.category || 'Brand Identity');
    let catBadge = p.badge || 'Branding';
    let subBadge = cat;

    if (cat.includes('Packaging')) {
      if (!p.badge) catBadge = 'Packaging';
      subBadge = 'Eco / Commercial';
    } else if (cat.includes('Key Visual')) {
      if (!p.badge) catBadge = 'Key Visual';
      subBadge = 'Digital Ads';
    } else if (cat.includes('UI/UX')) {
      if (!p.badge) catBadge = 'UI/UX';
      subBadge = 'Web & Mobile';
    } else if (cat.includes('Menu') || cat.includes('POSM')) {
      if (!p.badge) catBadge = 'Menu & POSM';
      subBadge = 'F&B Design';
    }

    // Split tags if string
    let tagList = [];
    if (typeof p.tags === 'string' && p.tags.trim()) {
      tagList = p.tags.split(',').map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(p.tags)) {
      tagList = p.tags;
    }
    if (tagList.length === 0) {
      tagList = [cat, 'Portfolio 2026'];
    }

    let rawImg = p.image || 'assets/images/ulibee-product-campaign-kv.jpg';
    let imgPath = rawImg;
    if (!imgPath.startsWith('http') && !imgPath.startsWith('data:')) {
      imgPath = imgPath.replace(/^\.\.\//, '').replace(/^\.\//, '');
    }

    const tagsHtml = tagList.slice(0, 3).map(t => 
      `<span class="badge-tag">${escapeHtml(t)}</span>`
    ).join('');

    const card = document.createElement('a');
    card.href = 'pages/selected-work.html';
    card.className = 'project-card home-dynamic-project-card group';
    card.innerHTML = `
      <div class="relative w-full h-64 sm:h-72 overflow-hidden bg-[#04201A]">
        <img src="${imgPath}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" draggable="false" width="400" height="320">
        <div class="badge-overlay absolute top-3.5 left-3.5 flex gap-2">
          <span class="badge-pill">${catBadge}</span>
          <span class="badge-pill badge-accent">${subBadge}</span>
        </div>
      </div>
      <div class="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <div>
          <div class="flex items-center justify-between text-xs text-[#B8D3CB] mb-1.5 font-medium">
            <span>${escapeHtml(p.client || 'Khách hàng')} • ${escapeHtml(p.year || '2026')}</span>
            <span class="text-[#00DF89] font-bold">Role: ${escapeHtml(p.role || 'Graphic Designer')}</span>
          </div>
          <h3 class="font-roboto text-lg sm:text-xl font-bold text-white group-hover:text-[#00DF89] transition-colors mb-2">${escapeHtml(p.name)}</h3>
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${tagsHtml}
          </div>
          <p class="body-text line-clamp-2">${escapeHtml(p.description || 'Dự án thiết kế sáng tạo hoàn thiện bởi Cao Ngọc Minh.')}</p>
        </div>
        <div class="flex items-center justify-between mt-5 pt-3.5 border-t border-[#00DF89]/15">
          <span class="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#00DF89] gap-1 group-hover:underline">
            <span>Xem Chi Tiết</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
          <span class="material-symbols-outlined text-[#00DF89] text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
        </div>
      </div>
    `;

    grid.insertBefore(card, grid.firstChild);
  });
}

// Background sync from MySQL API for root
async function syncHomeProjectsFromApi() {
  try {
    const res = await fetch('api/projects.php');
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      let local = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
      const localIds = new Set(local.map(p => String(p.id)));
      let added = false;
      data.data.forEach(dbItem => {
        if (!localIds.has(String(dbItem.id))) {
          local.push(dbItem);
          added = true;
        }
      });
      if (added) {
        localStorage.setItem('mp_custom_projects', JSON.stringify(local));
        loadDynamicHomeProjects();
      }
    }
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initBackToTop();
  initCustomCursor();
  initSpotlightCards();
  initTiltCards();
  initScrollReveal();
  initHeroParticles();
  initButtonRipples();

  animateCounters();
  initNavigation();
  initProjectCardNavigation();
  loadDynamicHomeProjects();
  syncHomeProjectsFromApi();

  const yearEl =
    document.getElementById('current-year');

  if (yearEl) {
    yearEl.textContent =
      String(new Date().getFullYear());
  }

  // Accessibility: expose reduced-motion state to CSS.
  document.documentElement.dataset.reducedMotion =
    String(prefersReducedMotion);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'mp_custom_projects') {
    loadDynamicHomeProjects();
  }
});


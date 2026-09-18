/**
 * HIẾU PORTFOLIO - MAIN JAVASCRIPT
 */

// Number Counting Animation with Smooth Easing
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

document.addEventListener('DOMContentLoaded', () => {
  // Initialize number counters
  animateCounters();

  // Update footer year dynamically if element exists
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
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

  // Highlight active link based on current path
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

  // Bulletproof click navigation for project cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    // If card triggers a modal preview, let its onclick run
    const onclickAttr = card.getAttribute('onclick') || '';
    if (onclickAttr.includes('openProjectModal')) {
      return;
    }

    const href = card.getAttribute('href') || card.getAttribute('data-href');
    if (href) {
      e.preventDefault();
      window.location.href = href;
    }
  });
});




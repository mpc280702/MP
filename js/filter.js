/**
 * SELECTED WORK FILTER SCRIPT (CAO NGỌC MINH)
 */

function filterProjects(category, event) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  // Find active button reliably
  let activeBtn = event ? event.currentTarget : (window.event ? window.event.currentTarget : null);

  // Update button active state
  buttons.forEach(btn => {
    btn.classList.remove('btn-accent-gradient', 'shadow-md', 'bg-white', 'text-primary-green', 'text-[#04201A]');
    btn.classList.add('bg-[#0B3B30]', 'text-[#DDE8E4]', 'border', 'border-white/15');
  });

  if (activeBtn) {
    activeBtn.classList.remove('bg-[#0B3B30]', 'text-[#DDE8E4]', 'border-white/15');
    activeBtn.classList.add('btn-accent-gradient', 'shadow-md');
  }

  // Filter project cards
  let visibleCount = 0;
  cards.forEach(card => {
    const cardCategories = (card.getAttribute('data-category') || '').split(' ');
    if (category === 'all' || cardCategories.includes(category)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update count indicator if present
  const countEl = document.getElementById('project-count');
  if (countEl) {
    countEl.textContent = visibleCount;
  }
}



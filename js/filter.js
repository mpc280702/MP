/**
 * SELECTED WORK FILTER SCRIPT (CAO NGỌC MINH)
 */

function filterProjects(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  // Update button active state
  buttons.forEach(btn => {
    btn.classList.remove('btn-accent-gradient', 'shadow-md');
    btn.classList.add('bg-[#072C24]', 'text-[#B8D3CB]', 'border', 'border-[#00DF89]/20');
  });

  const activeBtn = window.event ? window.event.currentTarget : null;
  if (activeBtn) {
    activeBtn.classList.remove('bg-[#072C24]', 'text-[#B8D3CB]', 'border-[#00DF89]/20');
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


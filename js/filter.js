/**
 * SELECTED WORK FILTER & DYNAMIC PORTFOLIO SCRIPT (CAO NGỌC MINH)
 */

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function filterProjects(category, event) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  // Find active button reliably
  let activeBtn = event ? event.currentTarget : (window.event ? window.event.currentTarget : null);

  // Update button active state
  buttons.forEach(btn => {
    btn.classList.remove('btn-accent-gradient', 'shadow-md', 'bg-white', 'text-primary-green', 'text-[#04201A]');
    btn.classList.add('bg-[#072C24]', 'text-[#DDE8E4]', 'border', 'border-white/15');
  });

  if (activeBtn) {
    activeBtn.classList.remove('bg-[#072C24]', 'text-[#DDE8E4]', 'border-white/15');
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

/* ==========================================================================
   PROJECT LIGHTBOX MODAL PREVIEW (PROJECTS 5 - 12 & DYNAMIC CUSTOM PROJECTS)
   ========================================================================== */
const PROJECT_DETAILS = {
  5: {
    title: 'Dê Âm Chay — Menu & POSM F&B',
    client: 'Dê Âm Chay • 2023 - 2024',
    role: 'In-house Designer',
    image: '../assets/images/portfolio-workspace-mockup.jpg',
    badges: [
      { text: 'F&B Design', class: 'text-white border-white/15' },
      { text: 'Menu & POSM', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Menu nhiều trang', 'Standee POSM', 'Event Banner', 'In-house Branding'],
    desc: 'Hệ thống thiết kế nhận diện F&B hoàn chỉnh cho chuỗi nhà hàng Dê Âm Chay: Menu gáy lò xo nhiều trang, standee để bàn, banner sự kiện khai trương, đồng phục nhân viên và ấn phẩm POSM truyền thông trực tiếp tại điểm bán.'
  },
  6: {
    title: 'Vincent Holdings — Identity System',
    client: 'Vincent Holdings • 2021 - 2022',
    role: 'Graphic Designer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQj4tBwWsRL4cYfcUhZhqpizXDufObLbldt2MPiLxT3qx9FfK8_0lul99mEdCJVYlP4TUl-pg49us8biNcFpFitoFJKvx_I_tWT37vzNjR2t3QEJJiEl0QrIKI71nnmrx279wMemlI4FESJEu-mSo7x6EGyDBixqtHA4RenHGWlR6eMWXF4sjT8Hcsnvo2M0nJE6YSL3zunXR6-jNx5Ib9-XSElaliqNA-eZLfO1CZ6HbXvmrjlh21',
    badges: [
      { text: 'Corporate', class: 'text-white border-white/15' },
      { text: 'Brand Identity', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Letterhead', 'Company Profile', 'Marketing Assets', 'Stationery'],
    desc: 'Thiết kế hệ thống văn phòng phẩm, ấn phẩm truyền thông nội bộ, profile doanh nghiệp chuẩn B2B và bộ mẫu tiếp thị số nhận diện thương hiệu cho tập đoàn Vincent Holdings.'
  },
  7: {
    title: 'Vortex — Kinetic Typography',
    client: 'Creative Lab • 2024',
    role: 'Type Designer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCajGjM2pgdQmHSjT4yMnt-C50C2EKZ5N42MC2CVjPXDKobbI7tSzwD3TaKtHgtjQnrKYwVJjsAUGPD5Iu8pkSo4qi3v9ddggTAcoBtFuQzNpx5JsgVPFz2w3JXJnKnEvBhrSNtZvOrhoVHUKtDjNCO3ac0CbyOSaVVnLL3cr8J1u173pcf6fYlar1C9FYK-VfbOxfwwaeGWn-Ab9PB3xdFEAru97qhdepnq5VR_EopDdj_ZoiYqqVV',
    badges: [
      { text: 'Motion', class: 'text-white border-white/15' },
      { text: 'Typography', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Variable Font', 'Sound Reactive', 'Motion Poster', 'Experimental'],
    desc: 'Dự án nghệ thuật chữ chuyển động thể nghiệm áp dụng thuật toán tương tác âm thanh: các đường nét font chữ biến đổi độ dày và giãn nở linh hoạt theo tần số nhịp điệu âm nhạc.'
  },
  8: {
    title: 'EcoPack — Sustainable Packaging',
    client: 'EcoPack Concept • 2024',
    role: 'Graphic Designer',
    image: '../assets/images/lamee-isometric-mockup.jpg',
    badges: [
      { text: 'Packaging', class: 'text-white border-white/15' },
      { text: 'Eco-Friendly', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Kraft Box', 'Eco Tag', 'Dieline Layout', 'Minimal Ink'],
    desc: 'Thiết kế bao bì nhãn mác sinh học từ giấy kraft tái chế và mực in gốc đậu nành. Quy chuẩn bế khuôn dieline chính xác, tối ưu hóa diện tích in ấn và thân thiện môi trường.'
  },
  9: {
    title: 'Glow Cosmetics — E-Commerce KV',
    client: 'Glow Cosmetics • 2024',
    role: 'Visual Designer',
    image: '../assets/images/ulibee-product-campaign-kv.jpg',
    badges: [
      { text: 'E-Commerce', class: 'text-white border-white/15' },
      { text: 'Key Visual', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Shopee Mall Banner', 'TikTok Shop', 'Mega Sale Ads', 'CTR Optimization'],
    desc: 'Thiết kế trọn gói visual bán hàng cho chiến dịch Mega Sale: banner trang chủ Shopee Mall, gian hàng TikTok Shop, ảnh sản phẩm thumbnail và video mockup tăng tỷ lệ click (CTR).'
  },
  10: {
    title: 'Neon Nights — Music Event Posters',
    client: 'Music Festival • 2023',
    role: 'Poster Designer',
    image: '../assets/images/net-que-isometric-mockup.jpg',
    badges: [
      { text: 'Poster', class: 'text-white border-white/15' },
      { text: 'Event Series', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Event Poster', 'Neon Glow', 'Typography', 'Social Teaser'],
    desc: 'Chuỗi poster quảng bá đại nhạc hội Neon Nights: xử lý dải màu phát quang Cyberpunk, nghệ thuật xếp chữ đa tầng và các ấn phẩm truyền thông mạng xã hội viral.'
  },
  11: {
    title: 'Urban Coffee — Takeaway Identity',
    client: 'Urban Coffee • 2024',
    role: 'Graphic Designer',
    image: '../assets/images/lamee-isometric-mockup.jpg',
    badges: [
      { text: 'Coffee Brand', class: 'text-white border-white/15' },
      { text: 'Takeaway POSM', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['Paper Cup', 'Wall Menu', 'Loyalty Card', 'Packaging'],
    desc: 'Hệ thống nhận diện cà phê mang đi phong cách hiện đại tối giản: ly giấy in 2 mặt, túi chữ T, thẻ thành viên tích điểm và bảng menu LED điện tử tại quầy order.'
  },
  12: {
    title: 'Aura App — UI/UX Experience',
    client: 'Aura Concept • 2025',
    role: 'UI/UX Designer',
    image: '../assets/images/portfolio-3d-screens.jpg',
    badges: [
      { text: 'Mobile App', class: 'text-white border-white/15' },
      { text: 'UI/UX', class: 'text-[#00DF89] border-[#00DF89]/30' }
    ],
    tags: ['UX User Flow', 'Dark Theme UI', 'Figma Prototype', 'Design System'],
    desc: 'Nghiên cứu trải nghiệm người dùng và xây dựng giao diện ứng dụng phong cách sống trên Figma: hệ thống Dark Mode dịu mắt, micro-interactions tinh tế và interactive prototype.'
  }
};

function openProjectModal(id) {
  const data = PROJECT_DETAILS[id];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const modalImg = document.getElementById('modal-img');
  if (modalImg) {
    modalImg.src = data.image;
    modalImg.alt = data.title;
  }
  
  const clientEl = document.getElementById('modal-client');
  if (clientEl) clientEl.textContent = data.client;

  const roleEl = document.getElementById('modal-role');
  if (roleEl) roleEl.textContent = 'Role: ' + (data.role || 'Graphic Designer');

  const titleEl = document.getElementById('modal-title');
  if (titleEl) titleEl.textContent = data.title;

  const descEl = document.getElementById('modal-desc');
  if (descEl) descEl.textContent = data.desc;

  const badgesContainer = document.getElementById('modal-badges');
  if (badgesContainer && Array.isArray(data.badges)) {
    badgesContainer.innerHTML = data.badges.map(b => 
      `<span class="px-3 py-1 rounded-full bg-[#04201A]/90 backdrop-blur font-roboto text-[10px] font-bold uppercase border ${b.class || 'border-white/20 text-white'}">${b.text}</span>`
    ).join('');
  }

  const tagsContainer = document.getElementById('modal-tags');
  if (tagsContainer && Array.isArray(data.tags)) {
    tagsContainer.innerHTML = data.tags.map(t => 
      `<span class="text-[11px] font-bold bg-[#04201A] text-[#B8D3CB] px-2.5 py-1 rounded border border-[#00DF89]/20">${t}</span>`
    ).join('');
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    const modalBox = modal.querySelector('.transform');
    if (modalBox) {
      modalBox.classList.remove('scale-95');
      modalBox.classList.add('scale-100');
    }
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.add('opacity-0');
  const inner = modal.querySelector('.transform');
  if (inner) {
    inner.classList.remove('scale-100');
    inner.classList.add('scale-95');
  }
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }, 300);
}

// Global modal event handlers
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (modal && e.target === modal) {
    closeProjectModal();
  }
});

/* ==========================================================================
   DYNAMIC PROJECT LOADER FOR SELECTED WORK PAGE
   ========================================================================== */
function loadDynamicPortfolioProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Remove previously appended dynamic cards to avoid duplicates on re-render
  document.querySelectorAll('.dynamic-project-card').forEach(el => el.remove());

  let customProjects = [];
  try {
    customProjects = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
  } catch (e) {
    console.error('Error loading custom projects from localStorage', e);
  }

  // Update counter always (even if 0 custom projects)
  const totalCount = 12 + (Array.isArray(customProjects) ? customProjects.length : 0);
  const countEl = document.getElementById('project-count');
  if (countEl) countEl.textContent = totalCount;

  const allFilterBtn = document.querySelector('.filter-btn');
  if (allFilterBtn && allFilterBtn.textContent.includes('Tất Cả')) {
    allFilterBtn.textContent = `Tất Cả (${totalCount})`;
  }

  if (!Array.isArray(customProjects) || customProjects.length === 0) return;

  // Prepend each custom project (reverse order so newest is at the very top)
  [...customProjects].reverse().forEach((p, idx) => {
    if (!p || !p.name) return;
    const modalKey = `custom_${p.id || idx}`;
    
    // Determine category slug safely
    const cat = String(p.category || 'Brand Identity');
    let catSlug = 'brand';
    let catBadge = p.badge || 'Branding';
    let subBadge = cat;

    if (cat.includes('Packaging')) {
      catSlug = 'brand editorial';
      if (!p.badge) catBadge = 'Packaging';
      subBadge = 'Eco / Commercial';
    } else if (cat.includes('Key Visual')) {
      catSlug = 'brand motion';
      if (!p.badge) catBadge = 'Key Visual';
      subBadge = 'Digital Ads';
    } else if (cat.includes('UI/UX')) {
      catSlug = 'uiux';
      if (!p.badge) catBadge = 'UI/UX';
      subBadge = 'Web & Mobile';
    } else if (cat.includes('Menu') || cat.includes('POSM')) {
      catSlug = 'brand editorial';
      if (!p.badge) catBadge = 'Menu & POSM';
      subBadge = 'F&B Design';
    } else if (cat.includes('Đồ Họa') || cat.includes('Poster')) {
      catSlug = 'motion';
      if (!p.badge) catBadge = 'Motion Poster';
      subBadge = 'Typography';
    }

    // Split tags if string
    let tagList = [];
    if (typeof p.tags === 'string' && p.tags.trim()) {
      tagList = p.tags.split(',').map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(p.tags)) {
      tagList = p.tags;
    }
    if (tagList.length === 0) {
      tagList = [cat, p.status || 'Hoàn thành', 'Portfolio 2026'];
    }

    // Determine correct image path
    let rawImg = p.image || 'assets/images/ulibee-product-campaign-kv.jpg';
    let imgPath = rawImg;
    if (!imgPath.startsWith('http') && !imgPath.startsWith('data:') && !imgPath.startsWith('../')) {
      imgPath = '../' + imgPath.replace(/^\.\//, '');
    }

    // Register into modal registry
    PROJECT_DETAILS[modalKey] = {
      title: p.name,
      client: `${p.client || 'Khách hàng'} • ${p.year || '2026'}`,
      role: p.role || 'Graphic Designer',
      image: imgPath,
      badges: [
        { text: catBadge, class: 'text-white border-white/15' },
        { text: subBadge, class: 'text-[#00DF89] border-[#00DF89]/30' }
      ],
      tags: tagList,
      desc: p.description || 'Dự án thiết kế sáng tạo hoàn thiện bởi Cao Ngọc Minh.'
    };

    // Create Card element
    const card = document.createElement('div');
    card.className = 'project-card dynamic-project-card group flex flex-col bg-[#072C24] rounded-2xl overflow-hidden shadow-xl border border-[#00DF89]/40 hover:border-[#00DF89] hover:shadow-2xl hover:shadow-[#00DF89]/20 transition-all duration-300 cursor-pointer text-left';
    card.setAttribute('data-category', catSlug);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Xem preview dự án ${escapeHtml(p.name)}`);
    card.onclick = () => openProjectModal(modalKey);
    card.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') openProjectModal(modalKey);
    };

    const tagsHtml = tagList.slice(0, 3).map(t => 
      `<span class="text-[10px] font-bold bg-[#04201A] text-[#B8D3CB] px-2 py-0.5 rounded border border-[#00DF89]/20">${escapeHtml(t)}</span>`
    ).join('');

    card.innerHTML = `
      <div class="relative w-full h-72 sm:h-80 overflow-hidden bg-[#04201A]">
        <img src="${imgPath}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" draggable="false" width="400" height="320">
        <div class="badge-overlay absolute top-4 left-4 flex gap-2 pointer-events-none">
          <span class="px-3 py-1 rounded-full bg-[#04201A]/90 backdrop-blur font-roboto text-[10px] font-bold text-white uppercase border border-white/15">${catBadge}</span>
          <span class="px-3 py-1 rounded-full bg-[#00DF89]/20 backdrop-blur font-roboto text-[10px] font-bold text-[#00DF89] uppercase border border-[#00DF89]/40">${subBadge}</span>
        </div>
      </div>
      <div class="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-[#B8D3CB] mb-1.5 font-medium">
            <span>${escapeHtml(p.client || 'Khách hàng')} • ${escapeHtml(p.year || '2026')}</span>
            <span class="text-[#00DF89] font-bold">Role: ${escapeHtml(p.role || 'Graphic Designer')}</span>
          </div>
          <h3 class="font-roboto text-xl font-bold text-white group-hover:text-[#00DF89] transition-colors mb-2">${escapeHtml(p.name)}</h3>
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${tagsHtml}
          </div>
          <p class="text-xs sm:text-sm text-[#DDE8E4] line-clamp-2 leading-relaxed">${escapeHtml(p.description || 'Dự án thiết kế sáng tạo hoàn thiện bởi Cao Ngọc Minh.')}</p>
        </div>
        <div class="mt-6 pt-4 flex items-center justify-between text-white font-roboto text-xs font-bold uppercase tracking-wider border-t border-white/15 group-hover:text-[#00DF89] transition-colors">
          <span>Xem Preview Chi Tiết</span>
          <span class="material-symbols-outlined text-sm group-hover:scale-125 transition-transform">visibility</span>
        </div>
      </div>
    `;

    grid.insertBefore(card, grid.firstChild);
  });
}

// Background sync from MySQL PHP API or Node API with multiple fallbacks
async function syncProjectsFromApi() {
  const endpoints = [
    '../api/projects.php',
    '/MP/api/projects.php',
    '../api/projects',
    '/api/projects.php',
    '/api/projects'
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        let local = [];
        try {
          local = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
        } catch (_) {
          local = [];
        }
        const localNames = new Set(local.map(p => String(p.name).toLowerCase().trim()));
        let added = false;
        data.data.forEach(dbItem => {
          if (!localNames.has(String(dbItem.name).toLowerCase().trim())) {
            local.unshift(dbItem);
            localNames.add(String(dbItem.name).toLowerCase().trim());
            added = true;
          }
        });
        if (added || local.length > 0) {
          localStorage.setItem('mp_custom_projects', JSON.stringify(local));
          loadDynamicPortfolioProjects();
        }
        break; // Successfully synced from first working endpoint
      }
    } catch (_) {
      // try next endpoint
    }
  }
}

// Auto-run on DOM load and immediately
loadDynamicPortfolioProjects();
syncProjectsFromApi();

document.addEventListener('DOMContentLoaded', () => {
  loadDynamicPortfolioProjects();
  syncProjectsFromApi();
});

window.addEventListener('load', () => {
  loadDynamicPortfolioProjects();
  syncProjectsFromApi();
});

// Sync cross-tab when added from Admin tab
window.addEventListener('storage', (e) => {
  if (e.key === 'mp_custom_projects') {
    loadDynamicPortfolioProjects();
  }
});




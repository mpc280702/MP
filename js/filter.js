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

/* ==========================================================================
   PROJECT LIGHTBOX MODAL PREVIEW (PROJECTS 5 - 12)
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

  document.getElementById('modal-img').src = data.image;
  document.getElementById('modal-img').alt = data.title;
  document.getElementById('modal-client').textContent = data.client;
  document.getElementById('modal-role').textContent = 'Role: ' + data.role;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;

  const badgesContainer = document.getElementById('modal-badges');
  badgesContainer.innerHTML = data.badges.map(b => 
    `<span class="px-3 py-1 rounded-full bg-[#04201A]/90 backdrop-blur font-roboto text-[10px] font-bold uppercase border ${b.class}">${b.text}</span>`
  ).join('');

  const tagsContainer = document.getElementById('modal-tags');
  tagsContainer.innerHTML = data.tags.map(t => 
    `<span class="text-[11px] font-bold bg-[#04201A] text-[#B8D3CB] px-2.5 py-1 rounded border border-[#00DF89]/20">${t}</span>`
  ).join('');

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



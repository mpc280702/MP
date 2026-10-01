/**
 * admin/js/admin.js — Shared JavaScript utilities and interactive dashboard for Admin Panel
 */

function showToast(text) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.id = 'toast';
    toast.innerHTML = '<span class="material-symbols-outlined" style="color: #34D399; font-size: 20px;">check_circle</span><span id="toast-text"></span>';
    document.body.appendChild(toast);
  }
  document.getElementById('toast-text').textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let currentContactModalData = null;

function ensureContactModalExists() {
  let modal = document.getElementById('contactModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'contactModal';
  modal.innerHTML = `
    <div class="modal-content-card" style="max-width: 580px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #E2E8F0;">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: #00875A; text-transform: uppercase;" id="modal-category">LIÊN HỆ KHÁCH HÀNG</span>
          <h2 style="font-size: 20px; font-weight: 800; color: #0F172A; margin-top: 4px;" id="modal-name">Khách hàng</h2>
          <p style="font-size: 13px; color: #64748B;" id="modal-email">email@domain.com</p>
        </div>
        <button onclick="closeContactModal()" style="background: #F1F5F9; border: none; width: 32px; height: 32px; border-radius: 8px; font-size: 18px; cursor: pointer;">✕</button>
      </div>

      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin-bottom: 6px;">Nội dung lời nhắn</div>
        <div style="font-size: 14px; color: #1E293B; line-height: 1.6; white-space: pre-wrap;" id="modal-content">...</div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; gap: 8px;">
          <button onclick="copyContactToClipboard()" class="btn-secondary-action" title="Sao chép nội dung">
            <span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span>
            <span>Sao chép</span>
          </button>
          <button onclick="forwardToAdminGmail()" class="btn-secondary-action" title="Chuyển tiếp yêu cầu này về Gmail cá nhân" style="color: #EA4335; border-color: #FECACA;">
            <span class="material-symbols-outlined" style="font-size: 16px;">forward_to_inbox</span>
            <span>Về Gmail của tôi</span>
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="closeContactModal()" class="btn-secondary-action">Đóng</button>
          <button onclick="replyViaGmail()" class="btn-primary-action" id="modal-reply-btn" style="background-color: #00DF89; color: #04201A; font-weight: 800;">
            <span>Gửi Email Phản Hồi</span>
            <span class="material-symbols-outlined" style="font-size: 16px;">outgoing_mail</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function openContactDetail(id, name, email, purpose, content, date) {
  const modal = ensureContactModalExists();
  currentContactModalData = { id, name, email, purpose, content, date };

  const nameEl = document.getElementById('modal-name');
  const emailEl = document.getElementById('modal-email');
  const catEl = document.getElementById('modal-category');
  const contentEl = document.getElementById('modal-content');

  if (nameEl) nameEl.textContent = name || 'Khách hàng';
  if (emailEl) emailEl.textContent = email || 'N/A';
  if (catEl) catEl.textContent = purpose || 'LIÊN HỆ KHÁCH HÀNG';
  if (contentEl) contentEl.textContent = content || '(Chưa có nội dung)';

  modal.classList.add('show');
  if (typeof showToast === 'function') {
    showToast(`Đang mở lời nhắn từ: ${name}`);
  }
}

function replyViaGmail() {
  if (!currentContactModalData) return;
  const { name, email, purpose, content } = currentContactModalData;
  const targetEmail = email && email !== 'N/A' ? email : '';
  const subject = `Re: [Cao Ngọc Minh Portfolio] Phản hồi trao đổi: ${purpose || 'Dự án'}`;
  const body = `Chào bạn ${name || 'bạn'},\n\nCảm ơn bạn đã liên hệ qua Portfolio của mình (Mục đích: ${purpose || 'Liên hệ'}).\n\n--- Trích dẫn yêu cầu của bạn ---\n"${content || ''}"\n--------------------------------\n\nMình xin phép phản hồi thông tin như sau:\n[Nhập nội dung trao đổi của bạn tại đây]\n\nTrân trọng,\nCao Ngọc Minh — Graphic & UI/UX Designer\nPortfolio: https://mpc280702.github.io\nEmail: mngoc1285l@gmail.com`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.open(gmailUrl, '_blank');
  if (typeof showToast === 'function') {
    showToast(`✉ Đã mở cửa sổ soạn thư Gmail phản hồi tới ${name}!`);
  }
}

function forwardToAdminGmail() {
  if (!currentContactModalData) return;
  const { name, email, purpose, content, date, id } = currentContactModalData;
  const myGmail = 'mngoc1285l@gmail.com';
  const subject = `[Lưu trữ yêu cầu] ${purpose || 'Liên hệ'} — Từ ${name || 'Khách hàng'} (#${id || 'ID'})`;
  const body = `Chào Minh,\n\nThông tin chi tiết yêu cầu liên hệ từ website Portfolio:\n\n- Khách hàng: ${name || 'N/A'}\n- Email: ${email || 'N/A'}\n- Mục đích: ${purpose || 'N/A'}\n- Thời gian gửi: ${date || 'Mới gửi'}\n- Mã phản hồi: #${id || 'N/A'}\n\nNội dung lời nhắn / yêu cầu:\n"${content || ''}"\n\n----------------------------------------\nHệ thống quản trị MINH. Portfolio Admin`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(myGmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.open(gmailUrl, '_blank');
  if (typeof showToast === 'function') {
    showToast(`📥 Đã mở Gmail chuyển tiếp yêu cầu về hộp thư cá nhân!`);
  }
}

function copyContactToClipboard() {
  if (!currentContactModalData) return;
  const { name, email, purpose, content } = currentContactModalData;
  const text = `Khách hàng: ${name}\nEmail: ${email}\nMục đích: ${purpose}\nNội dung:\n${content}`;
  
  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === 'function') {
      showToast(`📋 Đã sao chép thông tin và nội dung của ${name} vào bộ nhớ tạm!`);
    }
  }).catch(() => {
    if (typeof showToast === 'function') {
      showToast(`Không thể tự động sao chép. Vui lòng copy thủ công.`);
    }
  });
}

function openContactDetailById(id) {
  const m = allMessagesData.find(item => String(item.id) === String(id));
  if (m) {
    openContactDetail(m.id, m.name, m.email, m.purpose, m.message, m.created_at);
  } else {
    if (typeof showToast === 'function') showToast(`Không tìm thấy chi tiết phản hồi #${id}`);
  }
}

function markContactAsHandled() {
  const nameEl = document.getElementById('modal-name');
  const name = nameEl ? nameEl.textContent : 'khách hàng';
  closeContactModal();
  if (typeof showToast === 'function') {
    showToast(`✅ Đã cập nhật trạng thái phản hồi cho ${name}!`);
  }
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('show');
}

let allMessagesData = [];

function syncMessagesToNotifications(messages) {
  if (!messages || messages.length === 0) return;
  const recent = messages.slice(0, 5).map((m, idx) => ({
    id: m.id,
    icon: 'mail',
    title: `Phản hồi từ ${m.name}`,
    desc: m.purpose + ': ' + (m.message.length > 50 ? m.message.substring(0, 50) + '...' : m.message),
    time: m.created_at || 'Mới gửi',
    unread: idx < 2,
    link: 'phan-hoi-lien-he.html'
  }));
  notificationsData = recent;
  renderNotificationDropdown();
}

async function loadLiveDbMessages() {
  const wrapper = document.getElementById('db-messages-table-wrapper');
  if (!wrapper) return;
  
  wrapper.innerHTML = `<p style="text-align:center; padding:24px; color:#94A3B8;">Đang tải dữ liệu lời nhắn...</p>`;

  try {
    const res = await fetch('../api/messages.php');
    const data = await res.json();

    if (data.success && data.data && data.data.length > 0) {
      allMessagesData = data.data.map((m, idx) => {
        return {
          id: m.id || (data.data.length - idx),
          name: m['Họ và tên'] || m.name || m.fullname || 'Chưa đặt tên',
          email: m.Email || m.email || 'N/A',
          purpose: m['Mục đích'] || m.purpose || 'Liên hệ chung',
          message: m['Lời nhắn'] || m.message || m.content || '(Chưa có nội dung)',
          created_at: m.localTime || m.timestamp || m.created_at || m.submittedAt || 'Mới gửi'
        };
      });

      renderContactMessagesTable(allMessagesData);
      syncMessagesToNotifications(allMessagesData);

      const counter = document.getElementById('val-new-contacts');
      if (counter) {
        counter.textContent = allMessagesData.length;
      }
    } else {
      wrapper.innerHTML = `<p style="text-align:center; padding:24px; color:#94A3B8;">Chưa có dữ liệu lời nhắn trong hệ thống.</p>`;
    }
  } catch (e) {
    console.error('Error loading messages:', e);
    wrapper.innerHTML = `<p style="text-align:center; padding:24px; color:#EF4444;">Không thể truy xuất dữ liệu tin nhắn. Vui lòng thử lại.</p>`;
  }
}

function renderContactMessagesTable(items) {
  const wrapper = document.getElementById('db-messages-table-wrapper');
  if (!wrapper) return;

  if (!items || items.length === 0) {
    wrapper.innerHTML = `<p style="text-align:center; padding:24px; color:#94A3B8;">Không tìm thấy lời nhắn phù hợp.</p>`;
    return;
  }

  const rows = items.map(m => {
    return `
      <tr>
        <td><strong>#${m.id}</strong></td>
        <td><strong>${escapeHtml(m.name)}</strong></td>
        <td><span style="color:var(--color-primary-dark); font-weight:600;">${escapeHtml(m.email)}</span></td>
        <td><span class="badge-status badge-doing" style="background:#E6F4EA; color:#00875A; font-weight:700;">${escapeHtml(m.purpose)}</span></td>
        <td style="max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(m.message)}">${escapeHtml(m.message)}</td>
        <td style="color:#64748B; font-size:12px; font-weight:500;">${escapeHtml(m.created_at)}</td>
        <td>
          <button onclick="openContactDetailById('${m.id}')" style="padding:6px 12px; border-radius:6px; background:#00DF89; color:#04201A; font-weight:700; border:none; cursor:pointer; font-size:11px; transition:all 0.2s;">
            Xem
          </button>
        </td>
      </tr>
    `;
  }).join('');

  wrapper.innerHTML = `
    <table class="custom-table" style="width:100%;">
      <thead>
        <tr>
          <th style="width:60px;">ID</th>
          <th style="width:150px;">TÊN</th>
          <th style="width:200px;">EMAIL</th>
          <th style="width:170px;">MỤC ĐÍCH</th>
          <th>NỘI DUNG</th>
          <th style="width:150px;">THỜI GIAN</th>
          <th style="width:80px;">THAO TÁC</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  // Attach search listener if search input exists
  const searchInput = document.getElementById('contact-filter-input');
  if (searchInput && !searchInput.dataset.initialized) {
    searchInput.dataset.initialized = 'true';
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderContactMessagesTable(allMessagesData);
        return;
      }
      const filtered = allMessagesData.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.purpose.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
      renderContactMessagesTable(filtered);
    });
  }
}

function openContactDetailFromObj(obj) {
  openContactDetail(obj.id, obj.name, obj.email, obj.purpose, obj.message, obj.created_at);
}

function exportMessagesToPdf() {
  if (!allMessagesData || allMessagesData.length === 0) {
    if (typeof showToast === 'function') showToast('Chưa có dữ liệu phản hồi để xuất PDF.');
    return;
  }

  const printWindow = window.open('', '_blank', 'width=950,height=750');
  if (!printWindow) {
    alert('Vui lòng cho phép mở popup trên trình duyệt để xuất PDF.');
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');

  const rowsHtml = allMessagesData.map((m, idx) => `
    <tr>
      <td style="text-align:center; font-weight:bold;">#${m.id || (idx + 1)}</td>
      <td style="font-weight:bold; color:#0F172A;">${escapeHtml(m.name)}</td>
      <td style="color:#00875A; font-weight:600;">${escapeHtml(m.email)}</td>
      <td><span class="tag">${escapeHtml(m.purpose)}</span></td>
      <td>${escapeHtml(m.message)}</td>
      <td style="font-size:11px; color:#64748B;">${escapeHtml(m.created_at)}</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="utf-8">
      <title>Báo Cáo Phản Hồi Khách Hàng - Cao Ngọc Minh Portfolio</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #1E293B; line-height: 1.5; background: #fff; }
        .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #00DF89; padding-bottom: 14px; margin-bottom: 24px; }
        .title { font-size: 22px; font-weight: 800; color: #04201A; margin: 0; letter-spacing: -0.5px; }
        .subtitle { font-size: 13px; color: #475569; margin-top: 4px; font-weight: 500; }
        .meta-info { font-size: 11px; color: #64748B; text-align: right; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        th { background: #F1F5F9; color: #0F172A; text-align: left; padding: 10px; border: 1px solid #CBD5E1; font-weight: 700; text-transform: uppercase; font-size: 11px; }
        td { padding: 10px; border: 1px solid #E2E8F0; vertical-align: top; }
        tr:nth-child(even) { background-color: #F8FAFC; }
        .tag { background: #E6F4EA; color: #00875A; font-weight: bold; padding: 3px 8px; border-radius: 6px; font-size: 11px; display: inline-block; }
        .footer { margin-top: 36px; font-size: 11px; text-align: center; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 16px; }
        .btn-print { padding: 10px 20px; background: #00DF89; color: #04201A; font-weight: 800; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; box-shadow: 0 4px 12px rgba(0,223,137,0.3); transition: all 0.2s; }
        .btn-print:hover { background: #00C87A; }
        @media print {
          body { padding: 0; }
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom:20px; text-align:right;">
        <button onclick="window.print()" class="btn-print">🖨️ In / Tải Xuất File PDF</button>
      </div>
      <div class="header">
        <div>
          <h1 class="title">BÁO CÁO PHẢN HỒI KHÁCH HÀNG & HỘP THƯ</h1>
          <div class="subtitle">Cao Ngọc Minh — Graphic Designer & Digital Creator Portfolio</div>
        </div>
        <div class="meta-info">
          <div><strong>Tổng tin nhắn:</strong> ${allMessagesData.length} phản hồi</div>
          <div><strong>Thời gian xuất báo cáo:</strong> ${dateStr}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:45px; text-align:center;">ID</th>
            <th style="width:140px;">HỌ VÀ TÊN</th>
            <th style="width:180px;">EMAIL</th>
            <th style="width:150px;">MỤC ĐÍCH</th>
            <th>NỘI DUNG LỜI NHẮN</th>
            <th style="width:130px;">THỜI GIAN</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div class="footer">
        © ${new Date().getFullYear()} Cao Ngọc Minh Portfolio Admin — Báo cáo xuất tự động từ hệ thống.
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function exportMessagesToJson() {
  if (!allMessagesData || allMessagesData.length === 0) {
    if (typeof showToast === 'function') showToast('Chưa có dữ liệu phản hồi.');
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allMessagesData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `portfolio_contact_messages_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  if (typeof showToast === 'function') showToast('Đã xuất file JSON thành công!');
}

let _uploadedCustomImage = '';

function updateDefaultMockupImage(category) {
  const presetSelect = document.getElementById('new-project-preset-image');
  const previewImg = document.getElementById('new-project-img-preview');
  const badgeInput = document.getElementById('new-project-badge');
  const tagsInput = document.getElementById('new-project-tags');

  let defaultImg = 'assets/images/ulibee-product-campaign-kv.jpg';
  let defaultBadge = 'Branding';
  let defaultTags = 'Brand Identity, Portfolio 2026';

  if (category.includes('Packaging')) {
    defaultImg = 'assets/images/lamee-isometric-mockup.jpg';
    defaultBadge = 'Packaging';
    defaultTags = 'Bao bì, Nhãn mác, Eco-Friendly, Dieline';
  } else if (category.includes('Brand')) {
    defaultImg = 'assets/images/net-que-isometric-mockup.jpg';
    defaultBadge = 'Cultural Identity';
    defaultTags = 'Brand Identity, Pattern Design, Stationery';
  } else if (category.includes('UI/UX')) {
    defaultImg = 'assets/images/portfolio-3d-screens.jpg';
    defaultBadge = 'UI/UX Design';
    defaultTags = 'Mobile App, Web Design, Figma, Design System';
  } else if (category.includes('Key Visual')) {
    defaultImg = 'assets/images/ulibee-product-campaign-kv.jpg';
    defaultBadge = 'Digital Campaign';
    defaultTags = 'Key Visual, 3D Compositing, Digital Ads';
  } else if (category.includes('Menu') || category.includes('POSM')) {
    defaultImg = 'assets/images/portfolio-workspace-mockup.jpg';
    defaultBadge = 'F&B POSM';
    defaultTags = 'Menu nhiều trang, Standee POSM, Event Banner';
  } else if (category.includes('Đồ Họa') || category.includes('Poster')) {
    defaultImg = 'assets/images/vortex-kinetic.jpg';
    defaultBadge = 'Motion Poster';
    defaultTags = 'Kinetic Typography, Sound Reactive, Motion';
  }

  if (presetSelect) presetSelect.value = defaultImg;
  if (previewImg && !_uploadedCustomImage) {
    previewImg.src = defaultImg.startsWith('http') || defaultImg.startsWith('data:') ? defaultImg : '../' + defaultImg;
  }
  if (badgeInput && (!badgeInput.value || badgeInput.value === 'Branding')) badgeInput.value = defaultBadge;
  if (tagsInput && (!tagsInput.value || tagsInput.value === 'Brand Identity, Portfolio 2026')) tagsInput.value = defaultTags;
}

function handlePresetImageChange(url) {
  _uploadedCustomImage = '';
  const previewImg = document.getElementById('new-project-img-preview');
  const filenameText = document.getElementById('upload-filename-text');
  if (previewImg) {
    previewImg.src = url.startsWith('http') || url.startsWith('data:') ? url : '../' + url;
  }
  if (filenameText) filenameText.textContent = '(Hỗ trợ PNG, JPG, WebP)';
}

function handleProjectImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const previewImg = document.getElementById('new-project-img-preview');
  const filenameText = document.getElementById('upload-filename-text');
  if (filenameText) filenameText.textContent = `Đã chọn: ${file.name}`;

  const reader = new FileReader();
  reader.onload = (e) => {
    _uploadedCustomImage = e.target.result;
    if (previewImg) previewImg.src = _uploadedCustomImage;
  };
  reader.readAsDataURL(file);
}

function showProjectSavedSuccess(name, img) {
  const oldModal = document.getElementById('successProjectModal');
  if (oldModal) oldModal.remove();

  const successModal = document.createElement('div');
  successModal.className = 'modal-backdrop show';
  successModal.id = 'successProjectModal';
  successModal.style.zIndex = '9999';
  const displayThumb = img ? (img.startsWith('data:') || img.startsWith('http') ? img : (img.startsWith('../') ? img : '../' + img)) : '../assets/images/ulibee-product-campaign-kv.jpg';

  successModal.innerHTML = `
    <div class="modal-content-card" style="text-align: center; max-width: 500px; padding: 32px 24px; animation: fadeIn 0.3s ease;">
      <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(0, 223, 137, 0.15); border: 2px solid #00DF89; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span class="material-symbols-outlined" style="color: #00DF89; font-size: 40px;">check_circle</span>
      </div>
      <h2 style="font-size: 22px; font-weight: 800; color: #0F172A; margin-bottom: 8px;">Đã Lưu Dự Án Thành Công!</h2>
      <p style="font-size: 14px; color: #475569; margin-bottom: 18px; line-height: 1.5;">
        Dự án <strong>"${escapeHtml(name)}"</strong> đã được lưu thành công vào CSDL và đang hiển thị trực tiếp lên Website.
      </p>

      <div style="margin: 0 auto 24px auto; max-width: 240px; border-radius: 12px; overflow: hidden; border: 1px solid #CBD5E1; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <img src="${displayThumb}" alt="${escapeHtml(name)}" style="width: 100%; height: 130px; object-fit: cover; display: block;">
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <a href="../pages/selected-work.html" target="_blank" class="btn-primary-action" style="padding: 12px 24px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; box-shadow: 0 4px 14px rgba(0,223,137,0.3);">
          <span class="material-symbols-outlined" style="font-size: 18px;">open_in_new</span>
          <span>Xem Trên Website Ngay</span>
        </a>
        <button onclick="document.getElementById('successProjectModal').remove()" class="btn-secondary-action" style="padding: 12px 20px; font-size: 13px; font-weight: 600;">
          Đóng
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(successModal);
}

async function saveNewProject() {
  const modal = document.getElementById('addProjectModal') || document.querySelector('.modal-backdrop.show');
  if (!modal) return;

  const nameInput = document.getElementById('new-project-name');
  const catSelect = document.getElementById('new-project-category');
  const clientInput = document.getElementById('new-project-client');
  const roleInput = document.getElementById('new-project-role');
  const yearInput = document.getElementById('new-project-year');
  const statusSelect = document.getElementById('new-project-status');
  const presetSelect = document.getElementById('new-project-preset-image');
  const badgeInput = document.getElementById('new-project-badge');
  const tagsInput = document.getElementById('new-project-tags');
  const linkInput = document.getElementById('new-project-link');
  const descTextarea = document.getElementById('new-project-desc');
  const featuredCheck = document.getElementById('new-project-featured');

  const name = (nameInput ? nameInput.value : '').trim();
  const category = (catSelect ? catSelect.value : 'Brand Identity').trim();
  const client = (clientInput ? clientInput.value : 'Doanh Nghiệp Mới').trim();
  const role = (roleInput ? roleInput.value : 'Graphic Designer').trim();
  const year = (yearInput ? yearInput.value : '2026').trim();
  const status = (statusSelect ? statusSelect.value : 'Hoàn thành').trim();
  const badge = (badgeInput ? badgeInput.value : 'Branding').trim();
  const tags = (tagsInput ? tagsInput.value : 'Brand Identity, Portfolio').trim();
  const link = (linkInput ? linkInput.value : 'pages/selected-work.html').trim();
  const description = (descTextarea ? descTextarea.value : '').trim();
  const isFeatured = featuredCheck ? (featuredCheck.checked ? 1 : 0) : 1;

  if (!name) {
    showToast('⚠️ Vui lòng nhập tên dự án!');
    if (nameInput) nameInput.focus();
    return;
  }

  // Image resolution: Uploaded image > Selected Preset > Fallback
  let finalImage = _uploadedCustomImage || (presetSelect ? presetSelect.value : '') || 'assets/images/ulibee-product-campaign-kv.jpg';

  const newProject = {
    id: Date.now(),
    name: name,
    category: category,
    client: client || 'Doanh Nghiệp Mới',
    role: role || 'Graphic Designer',
    year: year || '2026',
    status: status,
    badge: badge || 'Branding',
    tags: tags || 'Brand Identity, Portfolio 2026',
    link: link || 'pages/selected-work.html',
    description: description || 'Dự án thiết kế sáng tạo hoàn thiện bởi Cao Ngọc Minh.',
    image: finalImage,
    is_featured: isFeatured,
    created_at: new Date().toLocaleDateString('vi-VN')
  };

  // 1. Save to LocalStorage (Instant sync across all browser tabs & pages)
  try {
    let customProjects = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
    customProjects.unshift(newProject);
    localStorage.setItem('mp_custom_projects', JSON.stringify(customProjects));
  } catch (e) {
    console.error('LocalStorage error', e);
  }

  // 2. Save to MySQL / JSON via api/projects.php
  try {
    fetch('../api/projects.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    }).catch(e => console.log('API sync background', e));
  } catch (err) {}

  // 3. Increment Counter on Dashboard if present
  const totalCounter = document.getElementById('val-total-projects');
  if (totalCounter) {
    let curr = parseInt(totalCounter.textContent.replace(/[^0-9]/g, ''), 10) || 52;
    totalCounter.textContent = curr + 1;
  }

  // 4. Prepend to table in admin
  const tbody = document.querySelector('.custom-table tbody');
  if (tbody) {
      const badgeClass = status === 'Hoàn thành' ? 'badge-done' : (status === 'Bản nháp' ? 'badge-draft' : 'badge-doing');
      const newTr = document.createElement('tr');
      newTr.className = 'dynamic-admin-row';
      newTr.setAttribute('data-project-id', newProject.id);
      newTr.style.animation = 'fadeIn 0.5s ease';
      const displayImg = finalImage.startsWith('data:') || finalImage.startsWith('http') ? finalImage : (finalImage.startsWith('../') ? finalImage : '../' + finalImage);
      newTr.innerHTML = `
        <td style="text-align: center;"><img src="${displayImg}" alt="${escapeHtml(name)}" class="project-img-cell" width="44" height="44"></td>
        <td><span class="project-name-text">${escapeHtml(name)}</span></td>
        <td><span class="category-tag-cell">${escapeHtml(category)}</span></td>
        <td>${escapeHtml(client)}</td>
        <td style="text-align: center; font-weight: 600; color: #475569;">${escapeHtml(year)}</td>
        <td style="text-align: center;"><span class="badge-status ${badgeClass}">${escapeHtml(status)}</span></td>
        <td style="text-align: center;">
          <div class="table-action-cell">
            <a href="../pages/selected-work.html" target="_blank" class="btn-table-view" title="Xem trên Website">
              <span class="material-symbols-outlined" style="font-size:15px;">visibility</span>
              <span>Xem</span>
            </a>
            <button type="button" class="btn-table-delete" onclick="confirmDeleteProject('${newProject.id}', '${escapeHtml(name)}', this.closest('tr'))" title="Xóa dự án này">
              <span class="material-symbols-outlined" style="font-size:15px;">delete</span>
              <span>Xóa</span>
            </button>
          </div>
        </td>
      `;
      tbody.insertBefore(newTr, tbody.firstChild);
    }

    // Close modal & reset inputs
    modal.classList.remove('show');
    if (nameInput) nameInput.value = '';
    if (clientInput) clientInput.value = '';
    if (descTextarea) descTextarea.value = '';
    _uploadedCustomImage = '';
    const filenameText = document.getElementById('upload-filename-text');
    if (filenameText) filenameText.textContent = '(Hỗ trợ PNG, JPG, WebP)';

    // Show Toast AND Success Modal Popup
    showToast('✅ Dự án đã được lưu và hiển thị trực tiếp lên Website!');
    showProjectSavedSuccess(name, finalImage);
}

// Global click listener to guarantee save button triggers saveNewProject even if inline onclick is missing
document.addEventListener('click', (e) => {
  const saveBtn = e.target.closest('#addProjectModal .btn-primary-action');
  if (saveBtn) {
    e.preventDefault();
    saveNewProject();
  }
});

function confirmDeleteProject(id, name, trElement) {
  const oldModal = document.getElementById('deleteConfirmModal');
  if (oldModal) oldModal.remove();

  const confirmModal = document.createElement('div');
  confirmModal.className = 'modal-backdrop show';
  confirmModal.id = 'deleteConfirmModal';
  confirmModal.style.zIndex = '99999';

  confirmModal.innerHTML = `
    <div class="modal-content-card" style="text-align: center; max-width: 440px; padding: 28px 24px; animation: fadeIn 0.25s ease;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: #FEE2E2; border: 2px solid #FCA5A5; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 14px;">
        <span class="material-symbols-outlined" style="color: #DC2626; font-size: 32px;">delete_forever</span>
      </div>
      <h2 style="font-size: 20px; font-weight: 800; color: #0F172A; margin-bottom: 8px;">Xác Nhận Xóa Dự Án?</h2>
      <p style="font-size: 13.5px; color: #475569; margin-bottom: 22px; line-height: 1.5;">
        Bạn có chắc chắn muốn xóa bài/dự án <strong style="color:#0F172A;">"${escapeHtml(name)}"</strong>?<br>
        <span style="font-size: 12px; color: #EF4444; font-weight: 600;">⚠️ Dự án này sẽ được gỡ bỏ khỏi Website và Cơ sở dữ liệu.</span>
      </p>

      <div style="display: flex; gap: 10px; justify-content: center;">
        <button type="button" onclick="document.getElementById('deleteConfirmModal').remove()" class="btn-secondary-action" style="padding: 10px 18px; font-size: 13px; font-weight: 600;">
          Hủy bỏ
        </button>
        <button type="button" id="btn-confirm-execute-delete" class="btn-table-delete" style="padding: 10px 20px; font-size: 13px; font-weight: 700; background: #DC2626; color: #FFFFFF; border-color: #DC2626; box-shadow: 0 4px 12px rgba(220,38,38,0.3);">
          <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
          <span>Xóa Vĩnh Viễn</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(confirmModal);

  document.getElementById('btn-confirm-execute-delete').addEventListener('click', () => {
    confirmModal.remove();
    executeDeleteProject(id, name, trElement);
  });
}

async function executeDeleteProject(id, name, trElement) {
  // 1. Remove from LocalStorage
  try {
    let customProjects = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
    customProjects = customProjects.filter(p => {
      const matchId = id && String(p.id) === String(id);
      const matchName = name && String(p.name).toLowerCase().trim() === String(name).toLowerCase().trim();
      return !(matchId || matchName);
    });
    localStorage.setItem('mp_custom_projects', JSON.stringify(customProjects));

    if (id) {
      let deletedPresets = JSON.parse(localStorage.getItem('mp_deleted_presets') || '[]');
      if (!deletedPresets.includes(String(id))) {
        deletedPresets.push(String(id));
        localStorage.setItem('mp_deleted_presets', JSON.stringify(deletedPresets));
      }
    }
  } catch (e) {
    console.error('LocalStorage delete error', e);
  }

  // 2. Call API endpoints
  const endpoints = ['../api/projects.php', '/MP/api/projects.php', '../api/projects', '/api/projects'];
  endpoints.forEach(url => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id: id, name: name })
    }).catch(() => {});
  });

  // 3. Smooth DOM Removal
  if (trElement) {
    trElement.style.transition = 'all 0.35s ease';
    trElement.style.opacity = '0';
    trElement.style.transform = 'scale(0.9) translateX(-20px)';
    trElement.style.background = '#FEE2E2';
    setTimeout(() => {
      trElement.remove();
      updateAdminProjectCounters();
    }, 350);
  }

  // 4. Show Notification Toast
  showToast(`🗑️ Đã xóa dự án "${name}" thành công!`);

  // 5. Broadcast to other tabs & website pages
  try {
    window.dispatchEvent(new Event('storage'));
  } catch (_) {}
}

function updateAdminProjectCounters() {
  const customProjects = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');
  const deletedPresets = JSON.parse(localStorage.getItem('mp_deleted_presets') || '[]');
  const baseCount = Math.max(0, 52 - deletedPresets.length);
  const totalCount = baseCount + customProjects.length;

  const totalCounter = document.getElementById('val-total-projects');
  if (totalCounter) {
    totalCounter.textContent = totalCount;
  }

  const seeAllLink = document.querySelector('.link-see-all span:first-child');
  if (seeAllLink && seeAllLink.textContent.includes('dự án')) {
    seeAllLink.textContent = `Xem tất cả ${totalCount} dự án`;
  }

  const allTagBtn = document.querySelector('.filter-tag-btn.active');
  if (allTagBtn && allTagBtn.textContent.includes('Tất cả')) {
    allTagBtn.textContent = `Tất cả (${totalCount})`;
  }
}

async function loadDynamicAdminProjects() {
  try {
    // Hide any deleted preset rows
    const deletedPresets = JSON.parse(localStorage.getItem('mp_deleted_presets') || '[]');
    if (deletedPresets.length > 0) {
      deletedPresets.forEach(delId => {
        const row = document.querySelector(`tr[data-preset-id="${delId}"]`);
        if (row) row.remove();
      });
    }

    let customProjects = JSON.parse(localStorage.getItem('mp_custom_projects') || '[]');

    // Try background sync with API to make sure we also have projects from MySQL/JSON
    try {
      const endpoints = ['../api/projects.php', '/MP/api/projects.php', '../api/projects', '/api/projects'];
      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            const localNames = new Set(customProjects.map(p => String(p.name).toLowerCase().trim()));
            data.data.forEach(item => {
              if (item && item.name && !localNames.has(String(item.name).toLowerCase().trim())) {
                customProjects.unshift(item);
                localNames.add(String(item.name).toLowerCase().trim());
              }
            });
            localStorage.setItem('mp_custom_projects', JSON.stringify(customProjects));
            break;
          }
        } catch (_) {}
      }
    } catch (_) {}

    updateAdminProjectCounters();

    const tbody = document.querySelector('.custom-table tbody');
    if (tbody && customProjects.length > 0) {
      // Remove existing dynamic rows before re-populating to prevent duplicates
      tbody.querySelectorAll('.dynamic-admin-row').forEach(r => r.remove());

      // Prepend custom projects (reverse order so newest is on top)
      [...customProjects].reverse().forEach(m => {
        const badgeClass = m.status === 'Hoàn thành' ? 'badge-done' : (m.status === 'Bản nháp' ? 'badge-draft' : 'badge-doing');
        const displayImg = (m.image || 'assets/images/ulibee-product-campaign-kv.jpg').replace(/^\.\.\//, '');
        const newTr = document.createElement('tr');
        newTr.className = 'dynamic-admin-row';
        newTr.setAttribute('data-project-id', m.id || '');
        newTr.innerHTML = `
          <td style="text-align: center;"><img src="../${displayImg}" alt="${escapeHtml(m.name)}" class="project-img-cell" width="44" height="44"></td>
          <td><span class="project-name-text">${escapeHtml(m.name)}</span></td>
          <td><span class="category-tag-cell">${escapeHtml(m.category || 'Brand Identity')}</span></td>
          <td>${escapeHtml(m.client || 'Khách hàng')}</td>
          <td style="text-align: center; font-weight: 600; color: #475569;">${m.year || '2026'}</td>
          <td style="text-align: center;"><span class="badge-status ${badgeClass}">${escapeHtml(m.status || 'Hoàn thành')}</span></td>
          <td style="text-align: center;">
            <div class="table-action-cell">
              <a href="../pages/selected-work.html" target="_blank" class="btn-table-view" title="Xem trên Website">
                <span class="material-symbols-outlined" style="font-size:15px;">visibility</span>
                <span>Xem</span>
              </a>
              <button type="button" class="btn-table-delete" onclick="confirmDeleteProject('${m.id || ''}', '${escapeHtml(m.name)}', this.closest('tr'))" title="Xóa dự án này">
                <span class="material-symbols-outlined" style="font-size:15px;">delete</span>
                <span>Xóa</span>
              </button>
            </div>
          </td>
        `;
        tbody.insertBefore(newTr, tbody.firstChild);
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    ensureDeleteButtonsOnAllRows();
  }
}

// Function to guarantee EVERY row in any table has perfectly aligned view & delete buttons
function ensureDeleteButtonsOnAllRows() {
  const rows = document.querySelectorAll('.custom-table tbody tr');
  rows.forEach((tr, index) => {
    const nameEl = tr.querySelector('.project-name-text') || tr.querySelector('td:nth-child(2)') || tr.querySelector('strong');
    const name = nameEl ? nameEl.textContent.trim() : `Dự án #${index + 1}`;
    const id = tr.getAttribute('data-project-id') || tr.getAttribute('data-preset-id') || `item-${index}`;

    const actionCell = tr.querySelector('td:last-child');
    if (!actionCell) return;
    actionCell.style.textAlign = 'center';

    let actionWrapper = actionCell.querySelector('.table-action-cell');
    if (!actionWrapper) {
      actionWrapper = document.createElement('div');
      actionWrapper.className = 'table-action-cell';
      actionCell.innerHTML = '';
      actionCell.appendChild(actionWrapper);
    }

    // Standardize View Button
    let viewBtn = actionWrapper.querySelector('a');
    if (!viewBtn) {
      viewBtn = document.createElement('a');
      viewBtn.href = '../pages/selected-work.html';
      viewBtn.target = '_blank';
      actionWrapper.insertBefore(viewBtn, actionWrapper.firstChild);
    }
    viewBtn.className = 'btn-table-view';
    viewBtn.title = 'Xem trên Website';
    viewBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:15px;">visibility</span><span>Xem</span>';

    // Standardize Delete Button
    let delBtn = actionWrapper.querySelector('button.btn-table-delete') || actionWrapper.querySelector('button.btn-delete-action') || actionWrapper.querySelector('button');
    if (!delBtn) {
      delBtn = document.createElement('button');
      delBtn.type = 'button';
      actionWrapper.appendChild(delBtn);
    }
    delBtn.className = 'btn-table-delete';
    delBtn.title = 'Xóa bài này';
    delBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:15px;">delete</span><span>Xóa</span>';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      confirmDeleteProject(id, name, tr);
    };
  });
}

// Interactive filter and search for Admin Tables
function initAdminTableInteractions() {
  const searchInput = document.querySelector('.table-search-input');
  const tagBtns = document.querySelectorAll('.filter-tag-btn');
  const tbody = document.querySelector('.custom-table tbody');

  if (!tbody) return;

  function filterAdminTable() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeTag = document.querySelector('.filter-tag-btn.active');
    const categoryFilter = activeTag ? activeTag.textContent.trim().toLowerCase() : 'tất cả';

    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchSearch = !query || text.includes(query);
      let matchCat = true;
      if (!categoryFilter.includes('tất cả')) {
        if (categoryFilter.includes('brand')) matchCat = text.includes('brand');
        else if (categoryFilter.includes('packaging')) matchCat = text.includes('packaging') || text.includes('bao bì');
        else if (categoryFilter.includes('key visual')) matchCat = text.includes('key visual') || text.includes('campaign');
        else if (categoryFilter.includes('ui/ux')) matchCat = text.includes('ui/ux') || text.includes('web');
      }
      row.style.display = matchSearch && matchCat ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterAdminTable);
  }

  if (tagBtns.length > 0) {
    tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tagBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterAdminTable();
      });
    });
  }
}

// Chart Instance Variables
let mainViewsChart = null;
let trafficDonutChartInstance = null;
let projectRadarChartInstance = null;
let analyticsBarChartInstance = null;
let deviceDonutChartInstance = null;
let currentViewsPeriod = '12m';

const chartDatasets = {
  '7d': {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    views: [420, 580, 510, 690, 840, 920, 780],
    visitors: [290, 410, 360, 480, 590, 640, 520]
  },
  '30d': {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    views: [3100, 3650, 4200, 3870],
    visitors: [2100, 2480, 2950, 2690]
  },
  '12m': {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    views: [500, 1100, 800, 1400, 1300, 2100, 1800, 2600, 3250, 2900, 2700, 3100],
    visitors: [320, 750, 540, 960, 890, 1450, 1220, 1780, 2210, 1980, 1840, 2100]
  },
  'year': {
    labels: ['2023', '2024', '2025', '2026 (Hiện tại)'],
    views: [8400, 19500, 34200, 48900],
    visitors: [5600, 13200, 23800, 33400]
  }
};

/**
 * Setup High-DPI HTML5 Canvas for crisp rendering on retina/4K screens
 */
function setupHighDpiCanvas(canvas) {
  if (!canvas) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || canvas.offsetWidth || canvas.parentElement?.clientWidth || 300;
  const height = rect.height || canvas.offsetHeight || canvas.parentElement?.clientHeight || 200;
  
  if (width <= 0 || height <= 0) return null;
  
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);
  return { ctx, width, height, dpr };
}

/**
 * 2D Canvas Fallback for Views Spline Chart
 */
function drawViewsSplineFallback(period) {
  const canvas = document.getElementById('viewsSplineChart');
  if (!canvas) return;
  const setup = setupHighDpiCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  
  const data = chartDatasets[period] || chartDatasets['12m'];
  const labels = data.labels;
  const views = data.views;
  const visitors = data.visitors;
  
  const padding = { top: 32, right: 20, bottom: 28, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  
  ctx.clearRect(0, 0, width, height);
  
  const maxVal = Math.max(...views, ...visitors) * 1.15 || 1000;
  const stepCount = 4;
  
  // Horizontal Grid Lines & Y-Labels
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.font = '500 11px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1;
  
  for (let i = 0; i <= stepCount; i++) {
    const val = Math.round((maxVal / stepCount) * (stepCount - i));
    const y = padding.top + (chartH / stepCount) * i;
    
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    
    const labelText = val >= 1000 ? (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + 'K' : val;
    ctx.fillText(labelText, padding.left - 8, y);
  }
  
  // X-Labels
  const xStep = chartW / (labels.length - 1 || 1);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((lbl, idx) => {
    const x = padding.left + idx * xStep;
    ctx.fillText(lbl, x, height - padding.bottom + 8);
  });
  
  // Spline points helper
  const getPoints = (arr) => arr.map((val, idx) => ({
    x: padding.left + idx * xStep,
    y: padding.top + chartH - (val / maxVal) * chartH
  }));
  
  const drawSpline = (pts, isClosed, strokeColor, fillColor, isDashed = false) => {
    if (pts.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const mx = (curr.x + next.x) / 2;
      ctx.bezierCurveTo(mx, curr.y, mx, next.y, next.x, next.y);
    }
    
    if (isClosed) {
      ctx.lineTo(pts[pts.length - 1].x, padding.top + chartH);
      ctx.lineTo(pts[0].x, padding.top + chartH);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    } else {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = isDashed ? 2 : 2.8;
      ctx.setLineDash(isDashed ? [4, 4] : []);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };
  
  const viewsPts = getPoints(views);
  const visitorsPts = getPoints(visitors);
  
  // Visitors Area & Stroke
  const gradVisitors = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradVisitors.addColorStop(0, 'rgba(4, 120, 87, 0.20)');
  gradVisitors.addColorStop(1, 'rgba(4, 120, 87, 0.0)');
  drawSpline(visitorsPts, true, null, gradVisitors);
  drawSpline(visitorsPts, false, '#047857', null, true);
  
  // Views Area & Stroke
  const gradViews = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradViews.addColorStop(0, 'rgba(0, 223, 137, 0.40)');
  gradViews.addColorStop(0.8, 'rgba(0, 223, 137, 0.05)');
  gradViews.addColorStop(1, 'rgba(0, 223, 137, 0.0)');
  drawSpline(viewsPts, true, null, gradViews);
  drawSpline(viewsPts, false, '#00DF89', null, false);
  
  // Draw Data Points on Views Line
  viewsPts.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#064E3B';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00DF89';
    ctx.stroke();
  });
}

/**
 * 2D Canvas Fallback for Traffic Donut Chart
 */
function drawTrafficDonutFallback() {
  const canvas = document.getElementById('trafficDonutChart');
  if (!canvas) return;
  const setup = setupHighDpiCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  
  ctx.clearRect(0, 0, width, height);
  
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 6;
  const innerRadius = radius * 0.72;
  
  const data = [
    { val: 42, color: '#064E3B' },
    { val: 31, color: '#00DF89' },
    { val: 18, color: '#047857' },
    { val: 9, color: '#6EE7B7' }
  ];
  
  let startAngle = -Math.PI / 2;
  const total = data.reduce((acc, d) => acc + d.val, 0);
  
  data.forEach(item => {
    const sliceAngle = (item.val / total) * (Math.PI * 2);
    const endAngle = startAngle + sliceAngle;
    
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    
    startAngle = endAngle;
  });
  
  // Center Cutout Circle & Text
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 15px Roboto, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('100%', cx, cy - 2);
  ctx.font = '600 10px Roboto, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Nguồn', cx, cy + 12);
}

/**
 * 2D Canvas Fallback for Project Categories Chart
 */
function drawProjectCategoriesFallback() {
  const canvas = document.getElementById('projectCategoriesChart');
  if (!canvas) return;
  const setup = setupHighDpiCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  
  ctx.clearRect(0, 0, width, height);
  
  const items = [
    { label: 'Brand Identity', count: 18, pct: 35, color: '#00DF89' },
    { label: 'Packaging & Label', count: 14, pct: 27, color: '#00B86C' },
    { label: 'Key Visual', count: 11, pct: 21, color: '#047857' },
    { label: 'UI/UX Design', count: 9, pct: 17, color: '#064E3B' }
  ];
  
  const maxCount = 20;
  const rowH = height / items.length;
  const barLeft = 120;
  const barRight = width - 75;
  const barMaxW = Math.max(10, barRight - barLeft);
  
  items.forEach((item, idx) => {
    const y = idx * rowH + rowH / 2;
    
    // Label
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '700 12px Roboto, sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(item.label, 8, y);
    
    // Background Track
    const barH = 14;
    const barY = y - barH / 2;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(barLeft, barY, barMaxW, barH, 7) : ctx.rect(barLeft, barY, barMaxW, barH);
    ctx.fillStyle = '#F1F5F9';
    ctx.fill();
    
    // Fill Bar
    const fillW = Math.max(8, (item.count / maxCount) * barMaxW);
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(barLeft, barY, fillW, barH, 7) : ctx.rect(barLeft, barY, fillW, barH);
    ctx.fillStyle = item.color;
    ctx.fill();
    
    // Value Text
    ctx.textAlign = 'right';
    ctx.font = '700 11.5px Roboto, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(`${item.count} (${item.pct}%)`, width - 8, y);
  });
}

/**
 * 2D Canvas Fallbacks for Statistics (Thống kê) Page
 */
function drawAnalyticsBarFallback() {
  const canvas = document.getElementById('analyticsBarChart');
  if (!canvas) return;
  const setup = setupHighDpiCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  
  ctx.clearRect(0, 0, width, height);
  const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const data = [1200, 1900, 1700, 2400, 2200, 3100, 2900, 3800, 4200, 3900, 3600, 4500];
  const maxVal = 5000;
  
  const pad = { top: 25, right: 20, bottom: 25, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const barW = Math.max(6, Math.min(22, (chartW / labels.length) * 0.55));
  const stepX = chartW / labels.length;
  
  // Grid Lines
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    
    const v = Math.round(maxVal - (maxVal / 4) * i);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px Roboto, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(v >= 1000 ? (v / 1000) + 'K' : v, pad.left - 6, y);
  }
  
  // Bars
  labels.forEach((lbl, idx) => {
    const x = pad.left + idx * stepX + (stepX - barW) / 2;
    const barH = (data[idx] / maxVal) * chartH;
    const y = pad.top + chartH - barH;
    
    const grad = ctx.createLinearGradient(0, y, 0, pad.top + chartH);
    grad.addColorStop(0, '#00DF89');
    grad.addColorStop(1, '#047857');
    
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]) : ctx.rect(x, y, barW, barH);
    ctx.fillStyle = grad;
    ctx.fill();
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '600 11px Roboto, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText(lbl, x + barW / 2, height - pad.bottom + 6);
  });
}

function drawDeviceDonutFallback() {
  const canvas = document.getElementById('deviceDonutChart');
  if (!canvas) return;
  const setup = setupHighDpiCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  
  ctx.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 6;
  const innerRadius = radius * 0.72;
  
  const data = [
    { val: 62, color: '#00DF89' },
    { val: 34, color: '#047857' },
    { val: 4, color: '#6EE7B7' }
  ];
  
  let startAngle = -Math.PI / 2;
  data.forEach(item => {
    const sliceAngle = (item.val / 100) * (Math.PI * 2);
    const endAngle = startAngle + sliceAngle;
    
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    
    startAngle = endAngle;
  });
  
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 15px Roboto, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('62%', cx, cy - 2);
  ctx.font = '600 10px Roboto, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Mobile', cx, cy + 12);
}

function switchViewsPeriod(period, btn) {
  if (btn) {
    document.querySelectorAll('.period-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  currentViewsPeriod = period;
  const data = chartDatasets[period] || chartDatasets['12m'];
  if (mainViewsChart) {
    mainViewsChart.data.labels = data.labels;
    mainViewsChart.data.datasets[0].data = data.views;
    mainViewsChart.data.datasets[1].data = data.visitors;
    mainViewsChart.update();
  } else {
    drawViewsSplineFallback(period);
  }
}

function initOverviewDashboard() {
  // 1. Dynamic Greeting
  const greetingEl = document.getElementById('dynamic-greeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let timeGreeting = 'Chào buổi sáng';
    if (hour >= 12 && hour < 18) timeGreeting = 'Chào buổi chiều';
    else if (hour >= 18 || hour < 5) timeGreeting = 'Chào buổi tối';
    greetingEl.textContent = `${timeGreeting}, Cao Ngọc Minh! 👋`;
  }

  // 2. Main Traffic / Views Chart
  const viewsCanvas = document.getElementById('viewsSplineChart');
  if (viewsCanvas) {
    if (typeof Chart !== 'undefined') {
      try {
        if (mainViewsChart) mainViewsChart.destroy();
        const ctx = viewsCanvas.getContext('2d');
        const grad1 = ctx.createLinearGradient(0, 0, 0, 220);
        grad1.addColorStop(0, 'rgba(0, 223, 137, 0.40)');
        grad1.addColorStop(0.8, 'rgba(0, 223, 137, 0.04)');
        grad1.addColorStop(1, 'rgba(0, 223, 137, 0.0)');

        const grad2 = ctx.createLinearGradient(0, 0, 0, 220);
        grad2.addColorStop(0, 'rgba(4, 120, 87, 0.25)');
        grad2.addColorStop(0.8, 'rgba(4, 120, 87, 0.02)');
        grad2.addColorStop(1, 'rgba(4, 120, 87, 0.0)');

        mainViewsChart = new Chart(viewsCanvas, {
          type: 'line',
          data: {
            labels: chartDatasets[currentViewsPeriod].labels,
            datasets: [
              {
                label: 'Lượt xem trang (Pageviews)',
                data: chartDatasets[currentViewsPeriod].views,
                borderColor: '#00DF89',
                borderWidth: 2.8,
                backgroundColor: grad1,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#064E3B',
                pointBorderColor: '#00DF89',
                pointBorderWidth: 2
              },
              {
                label: 'Khách duy nhất (Unique Visitors)',
                data: chartDatasets[currentViewsPeriod].visitors,
                borderColor: '#047857',
                borderWidth: 2,
                borderDash: [4, 4],
                backgroundColor: grad2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 12,
                  boxHeight: 12,
                  usePointStyle: true,
                  font: { size: 11, weight: '600' },
                  color: '#64748B'
                }
              },
              tooltip: {
                backgroundColor: '#0F172A',
                titleFont: { size: 12, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 10
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#94A3B8', font: { size: 11, weight: '600' } }
              },
              y: {
                grid: { color: '#F1F5F9' },
                ticks: {
                  color: '#94A3B8',
                  font: { size: 11 },
                  callback: (v) => v === 0 ? '0' : (v >= 1000 ? (v/1000) + 'K' : v)
                },
                min: 0
              }
            }
          }
        });
      } catch (_) {
        drawViewsSplineFallback(currentViewsPeriod);
      }
    } else {
      drawViewsSplineFallback(currentViewsPeriod);
    }
  }

  // 3. Traffic Acquisition Donut Chart
  const trafficDonut = document.getElementById('trafficDonutChart');
  if (trafficDonut) {
    if (typeof Chart !== 'undefined') {
      try {
        if (trafficDonutChartInstance) trafficDonutChartInstance.destroy();
        trafficDonutChartInstance = new Chart(trafficDonut, {
          type: 'doughnut',
          data: {
            labels: ['Tìm kiếm Google', 'Mạng xã hội (Behance, FB)', 'Truy cập trực tiếp', 'Giới thiệu đối tác'],
            datasets: [{
              data: [42, 31, 18, 9],
              backgroundColor: ['#064E3B', '#00DF89', '#047857', '#6EE7B7'],
              borderWidth: 0,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#0F172A',
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                  label: (item) => ` ${item.label}: ${item.raw}%`
                }
              }
            }
          }
        });
      } catch (_) {
        drawTrafficDonutFallback();
      }
    } else {
      drawTrafficDonutFallback();
    }
  }

  // 4. Project Categories Horizontal Bar Chart
  const projectCatCanvas = document.getElementById('projectCategoriesChart');
  if (projectCatCanvas) {
    if (typeof Chart !== 'undefined') {
      try {
        if (projectRadarChartInstance) projectRadarChartInstance.destroy();
        projectRadarChartInstance = new Chart(projectCatCanvas, {
          type: 'bar',
          data: {
            labels: ['Brand Identity', 'Packaging & Label', 'Key Visual', 'UI/UX Design'],
            datasets: [{
              data: [18, 14, 11, 9],
              backgroundColor: ['#00DF89', '#00B86C', '#047857', '#064E3B'],
              borderRadius: 8,
              barThickness: 16
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#0F172A',
                callbacks: {
                  label: (item) => ` ${item.raw} dự án (${Math.round(item.raw/52*100)}%)`
                }
              }
            },
            scales: {
              x: { grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 } } },
              y: { grid: { display: false }, ticks: { color: '#0F172A', font: { size: 11, weight: '700' } } }
            }
          }
        });
      } catch (_) {
        drawProjectCategoriesFallback();
      }
    } else {
      drawProjectCategoriesFallback();
    }
  }

  // 5. Load Live Messages count from MySQL API
  loadLiveDbMessages();

  // 6. Load Dynamic Projects added via Admin
  loadDynamicAdminProjects();

  // 7. Initialize Admin Table Interactions
  initAdminTableInteractions();
}

/**
 * Initialize Analytics Page Charts (thong-ke.html)
 */
function initAdminAnalytics() {
  const barCanvas = document.getElementById('analyticsBarChart');
  if (barCanvas) {
    if (typeof Chart !== 'undefined') {
      try {
        if (analyticsBarChartInstance) analyticsBarChartInstance.destroy();
        analyticsBarChartInstance = new Chart(barCanvas, {
          type: 'bar',
          data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
              label: 'Lượt truy cập 2026',
              data: [1200, 1900, 1700, 2400, 2200, 3100, 2900, 3800, 4200, 3900, 3600, 4500],
              backgroundColor: '#00DF89',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: '#F1F5F9' }, min: 0 }
            }
          }
        });
      } catch (_) {
        drawAnalyticsBarFallback();
      }
    } else {
      drawAnalyticsBarFallback();
    }
  }

  const donutCanvas = document.getElementById('deviceDonutChart');
  if (donutCanvas) {
    if (typeof Chart !== 'undefined') {
      try {
        if (deviceDonutChartInstance) deviceDonutChartInstance.destroy();
        deviceDonutChartInstance = new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels: ['Di động (Mobile)', 'Máy tính (Desktop)', 'Máy tính bảng'],
            datasets: [{
              data: [62, 34, 4],
              backgroundColor: ['#00DF89', '#047857', '#6EE7B7'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: { legend: { display: false } }
          }
        });
      } catch (_) {
        drawDeviceDonutFallback();
      }
    } else {
      drawDeviceDonutFallback();
    }
  }
}

function initAdminGlobal() {
  initAdminTableInteractions();
  loadDynamicAdminProjects();
  ensureDeleteButtonsOnAllRows();
  initNotificationSystem();

  if (document.getElementById('viewsSplineChart') || document.getElementById('trafficDonutChart') || document.getElementById('projectCategoriesChart')) {
    initOverviewDashboard();
  }
  if (document.getElementById('analyticsBarChart') || document.getElementById('deviceDonutChart')) {
    initAdminAnalytics();
  }
}

document.addEventListener('DOMContentLoaded', initAdminGlobal);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initAdminGlobal();
}

window.addEventListener('resize', () => {
  if (!mainViewsChart && document.getElementById('viewsSplineChart')) {
    drawViewsSplineFallback(currentViewsPeriod);
  }
  if (!trafficDonutChartInstance && document.getElementById('trafficDonutChart')) {
    drawTrafficDonutFallback();
  }
  if (!projectRadarChartInstance && document.getElementById('projectCategoriesChart')) {
    drawProjectCategoriesFallback();
  }
  if (!analyticsBarChartInstance && document.getElementById('analyticsBarChart')) {
    drawAnalyticsBarFallback();
  }
  if (!deviceDonutChartInstance && document.getElementById('deviceDonutChart')) {
    drawDeviceDonutFallback();
  }
});

/**
 * Real-time Auto-Notification Engine for Admin Panel
 */
let notificationsData = [];
let _lastKnownMessageCount = -1;
let _lastKnownMaxMessageId = -1;
let _pollTimer = null;

function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (_) {}
}

function ringNotificationBell() {
  const btns = document.querySelectorAll('.notification-btn');
  btns.forEach(btn => {
    btn.classList.add('bell-ringing');
    setTimeout(() => btn.classList.remove('bell-ringing'), 3500);
  });
}

function syncMessagesToNotifications(messages) {
  if (!messages || messages.length === 0) return;
  const recent = messages.slice(0, 6).map((m, idx) => ({
    id: m.id,
    icon: 'mail',
    title: `Phản hồi từ ${m.name}`,
    desc: `${m.purpose}: ${m.message.length > 55 ? m.message.substring(0, 55) + '...' : m.message}`,
    time: m.localTime || m.created_at || 'Mới gửi',
    unread: idx < 2,
    link: 'phan-hoi-lien-he.html'
  }));
  notificationsData = recent;
  renderNotificationDropdown();
}

async function checkNewMessagesAutomatically() {
  try {
    const isPagesOrAdmin = window.location.pathname.includes('/admin/') || window.location.pathname.includes('/pages/');
    const endpoint = isPagesOrAdmin ? '../api/messages.php' : 'api/messages.php';
    const res = await fetch(endpoint + '?_nocache=' + Date.now());
    const data = await res.json();

    if (data.success && Array.isArray(data.data)) {
      const messages = data.data.map((m, idx) => ({
        id: m.id || (data.data.length - idx),
        name: m['Họ và tên'] || m.name || m.fullname || 'Chưa đặt tên',
        email: m.Email || m.email || 'N/A',
        purpose: m['Mục đích'] || m.purpose || 'Liên hệ chung',
        message: m['Lời nhắn'] || m.message || m.content || '(Chưa có nội dung)',
        created_at: m.localTime || m.timestamp || m.created_at || m.submittedAt || 'Mới gửi',
        localTime: m.localTime || m.created_at
      }));

      const currentMaxId = messages.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
      const currentCount = messages.length;

      // Initial pass
      if (_lastKnownMaxMessageId === -1) {
        _lastKnownMaxMessageId = currentMaxId;
        _lastKnownMessageCount = currentCount;
        allMessagesData = messages;
        syncMessagesToNotifications(messages);
        return;
      }

      // Check if ANY new message arrived!
      if (currentMaxId > _lastKnownMaxMessageId || currentCount > _lastKnownMessageCount) {
        const newItems = messages.filter(m => Number(m.id) > _lastKnownMaxMessageId);
        _lastKnownMaxMessageId = currentMaxId;
        _lastKnownMessageCount = currentCount;
        allMessagesData = messages;

        // Auto update notifications
        syncMessagesToNotifications(messages);

        // Alert user with chime sound & animated shaking bell
        playNotificationChime();
        ringNotificationBell();

        const newest = newItems[0] || messages[0];
        if (newest && typeof showToast === 'function') {
          showToast(`🔔 Có lời nhắn mới từ ${newest.name} (${newest.purpose})!`);
        }

        // Live update contact table if present on current page
        const tableWrapper = document.getElementById('db-messages-table-wrapper');
        if (tableWrapper && typeof renderContactMessagesTable === 'function') {
          renderContactMessagesTable(messages);
        }

        // Live update counters
        const counter = document.getElementById('val-new-contacts');
        if (counter) {
          counter.textContent = currentCount;
        }
      }
    }
  } catch (err) {
    // Fail silently in background loop
  }
}

function startAutoNotificationPolling() {
  if (_pollTimer) clearInterval(_pollTimer);
  checkNewMessagesAutomatically();
  _pollTimer = setInterval(checkNewMessagesAutomatically, 4000); // Check every 4 seconds
}

function renderNotificationDropdown() {
  let dropdown = document.getElementById('notif-dropdown-panel');
  if (!dropdown) return;

  const unreadCount = notificationsData.filter(n => n.unread).length;
  
  // Update badge on button
  const badgeEl = document.getElementById('notif-count-badge');
  if (badgeEl) {
    if (unreadCount > 0) {
      badgeEl.textContent = unreadCount;
      badgeEl.style.display = 'flex';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  const itemsHtml = notificationsData.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="onNotificationClick(${n.id}, '${n.link}')" style="cursor:pointer;">
      <div class="notif-icon">
        <span class="material-symbols-outlined">${n.icon}</span>
      </div>
      <div class="notif-content">
        <div class="notif-title">${escapeHtml(n.title)}</div>
        <div class="notif-desc">${escapeHtml(n.desc)}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');

  dropdown.innerHTML = `
    <div class="notif-header">
      <div class="notif-header-title">
        <span>Thông báo</span>
        ${unreadCount > 0 ? `<span style="background:#EF4444; color:#fff; font-size:10px; font-weight:800; padding:1px 6px; border-radius:10px;">${unreadCount} mới</span>` : ''}
      </div>
      ${unreadCount > 0 ? `<button class="notif-mark-read" onclick="markAllNotificationsRead(event)">Đánh dấu tất cả là đã đọc</button>` : ''}
    </div>
    <div class="notif-list">
      ${itemsHtml || '<div style="padding:20px; text-align:center; color:#94A3B8; font-size:12px;">Không có thông báo nào</div>'}
    </div>
    <div class="notif-footer">
      <a href="phan-hoi-lien-he.html">Xem tất cả phản hồi &rarr;</a>
    </div>
  `;
}

function onNotificationClick(id, link) {
  markNotifRead(id);
  const dropdown = document.getElementById('notif-dropdown-panel');
  if (dropdown) dropdown.classList.remove('show');

  if (typeof openContactDetailById === 'function') {
    openContactDetailById(id);
  } else if (link) {
    window.location.href = link;
  }
}

function markNotifRead(id) {
  const item = notificationsData.find(n => n.id === id);
  if (item) item.unread = false;
  renderNotificationDropdown();
}

function markAllNotificationsRead(e) {
  if (e) e.stopPropagation();
  notificationsData.forEach(n => n.unread = false);
  renderNotificationDropdown();
  if (typeof showToast === 'function') {
    showToast('Đã đánh dấu tất cả thông báo là đã đọc!');
  }
}

function toggleNotificationDropdown(e) {
  if (e) e.stopPropagation();
  let dropdown = document.getElementById('notif-dropdown-panel');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

function initNotificationSystem() {
  const btns = document.querySelectorAll('.notification-btn');
  btns.forEach(btn => {
    if (!btn.querySelector('.notification-badge')) {
      const badge = document.createElement('span');
      badge.className = 'notification-badge';
      badge.id = 'notif-count-badge';
      badge.textContent = '2';
      btn.appendChild(badge);
    }

    if (!btn.parentElement.classList.contains('notification-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'notification-wrapper';
      btn.parentNode.insertBefore(wrapper, btn);
      wrapper.appendChild(btn);

      const dropdown = document.createElement('div');
      dropdown.className = 'notification-dropdown';
      dropdown.id = 'notif-dropdown-panel';
      wrapper.appendChild(dropdown);
    }

    btn.onclick = (e) => toggleNotificationDropdown(e);
  });

  renderNotificationDropdown();
  startAutoNotificationPolling();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.notification-wrapper')) {
      const dropdown = document.getElementById('notif-dropdown-panel');
      if (dropdown) dropdown.classList.remove('show');
    }
  });
}

/**
 * Media Gallery Manager for admin/hinh-anh-media.html
 */
let mediaAssetsData = [
  { id: 1, name: 'ulibee-campaign-kv.jpg', category: 'mockup', src: '../assets/images/ulibee-product-campaign-kv.jpg', dim: '1920x1080', size: '142 KB' },
  { id: 2, name: 'net-que-isometric.jpg', category: 'mockup', src: '../assets/images/net-que-isometric-mockup.jpg', dim: '1600x1200', size: '121 KB' },
  { id: 3, name: 'lamee-isometric.jpg', category: 'mockup', src: '../assets/images/lamee-isometric-mockup.jpg', dim: '1600x1200', size: '110 KB' },
  { id: 4, name: 'net-que-stationery.jpg', category: 'flatlay', src: '../assets/images/net-que-stationery-flatlay.jpg', dim: '1600x1200', size: '105 KB' },
  { id: 5, name: 'cao-ngoc-minh.jpg', category: 'portrait', src: '../assets/images/cao-ngoc-minh-portrait.jpg', dim: '800x800', size: '104 KB' },
  { id: 6, name: 'vortex-kinetic.jpg', category: 'mockup', src: '../assets/images/vortex-kinetic.jpg', dim: '1200x800', size: '38 KB' }
];

let activeMediaCategory = 'all';
let activeMediaSearchQuery = '';

function renderMediaGalleryGrid() {
  const grid = document.getElementById('media-gallery-grid');
  if (!grid) return;

  const filtered = mediaAssetsData.filter(item => {
    const matchCat = activeMediaCategory === 'all' || item.category === activeMediaCategory;
    const matchSearch = !activeMediaSearchQuery || item.name.toLowerCase().includes(activeMediaSearchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const countEl = document.getElementById('count-all-media');
  if (countEl) countEl.textContent = mediaAssetsData.length;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:#94A3B8;">Không tìm thấy hình ảnh nào phù hợp.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="media-card" onclick="openMediaPreviewModal(${item.id})">
      <div class="media-thumb-container">
        <img src="${item.src}" alt="${escapeHtml(item.name)}" class="media-thumb" loading="lazy">
        <div class="media-card-actions" onclick="event.stopPropagation()">
          <button class="media-action-btn" title="Xem ảnh lớn" onclick="openMediaPreviewModal(${item.id})">
            <span class="material-symbols-outlined" style="font-size:18px;">visibility</span>
          </button>
          <button class="media-action-btn" title="Sao chép đường dẫn" onclick="copyMediaUrl('${item.src}')">
            <span class="material-symbols-outlined" style="font-size:18px;">content_copy</span>
          </button>
          <button class="media-action-btn delete-btn" title="Xóa hình ảnh" onclick="deleteMediaItem(${item.id})">
            <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
          </button>
        </div>
      </div>
      <div class="media-body">
        <div class="media-filename" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
        <div class="media-meta">${item.dim} &bull; ${item.size}</div>
      </div>
    </div>
  `).join('');
}

function copyMediaUrl(url) {
  const fullUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + url;
  navigator.clipboard.writeText(fullUrl).then(() => {
    showToast('Đã sao chép đường dẫn ảnh vào Clipboard!');
  }).catch(() => {
    showToast('Đã sao chép: ' + url);
  });
}

function openMediaPreviewModal(id) {
  const item = mediaAssetsData.find(m => m.id === id);
  if (!item) return;
  const modal = document.getElementById('mediaPreviewModal');
  if (!modal) return;

  const fnEl = document.getElementById('preview-filename');
  const imgEl = document.getElementById('preview-img-src');
  const metaEl = document.getElementById('preview-meta-info');
  const copyBtn = document.getElementById('btn-copy-preview-url');

  if (fnEl) fnEl.textContent = item.name;
  if (imgEl) imgEl.src = item.src;
  if (metaEl) metaEl.textContent = `${item.dim} • ${item.size}`;
  if (copyBtn) copyBtn.onclick = () => copyMediaUrl(item.src);

  modal.classList.add('show');
}

function closeMediaPreviewModal() {
  const modal = document.getElementById('mediaPreviewModal');
  if (modal) modal.classList.remove('show');
}

function deleteMediaItem(id) {
  if (confirm('Bạn có chắc chắn muốn xóa tệp hình ảnh này khỏi kho media?')) {
    mediaAssetsData = mediaAssetsData.filter(m => m.id !== id);
    renderMediaGalleryGrid();
    showToast('Đã xóa tệp media thành công!');
  }
}

function initMediaGalleryManager() {
  const uploadBtn = document.getElementById('btn-upload-media');
  const fileInput = document.getElementById('media-file-input');

  if (uploadBtn && fileInput) {
    uploadBtn.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const newMedia = {
              id: Date.now() + Math.floor(Math.random() * 1000),
              name: file.name,
              category: 'mockup',
              src: event.target.result,
              dim: 'Vừa tải lên',
              size: (file.size / 1024).toFixed(0) + ' KB'
            };
            mediaAssetsData.unshift(newMedia);
            renderMediaGalleryGrid();
          };
          reader.readAsDataURL(file);
        });
        showToast(`Đã tải lên ${files.length} tệp media mới!`);
      }
    };
  }

  // Filter Pills listener
  const pillsContainer = document.getElementById('media-filter-pills');
  if (pillsContainer) {
    const btns = pillsContainer.querySelectorAll('.filter-tag-btn');
    btns.forEach(btn => {
      btn.onclick = () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMediaCategory = btn.dataset.cat || 'all';
        renderMediaGalleryGrid();
      };
    });
  }

  // Search input listener
  const searchInput = document.getElementById('media-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      activeMediaSearchQuery = e.target.value.trim();
      renderMediaGalleryGrid();
    };
  }

  renderMediaGalleryGrid();
}

/**
 * Advanced Analytics & Reports System
 */
function initAdminAnalytics() {
  const barCanvas = document.getElementById('analyticsBarChart');
  const donutCanvas = document.getElementById('deviceDonutChart');
  if (barCanvas || donutCanvas) {
    setTimeout(renderAnalyticsCharts, 150);
  }
}

function renderAnalyticsCharts() {
  const barCanvas = document.getElementById('analyticsBarChart');
  const donutCanvas = document.getElementById('deviceDonutChart');

  if (typeof Chart !== 'undefined') {
    if (barCanvas && !barCanvas.dataset.rendered) {
      barCanvas.dataset.rendered = 'true';
      const ctx = barCanvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 220);
      gradient.addColorStop(0, '#00DF89');
      gradient.addColorStop(1, '#047857');

      new Chart(barCanvas, {
        type: 'bar',
        data: {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
          datasets: [{
            label: 'Lượt truy cập',
            data: [800, 1200, 950, 1500, 1400, 2200, 1900, 2800, 3250, 2900, 2700, 3100],
            backgroundColor: gradient,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: '#64748B', font: { weight: '600', size: 11 } } },
            y: { grid: { color: '#F1F5F9' }, ticks: { color: '#94A3B8', font: { size: 11 } } }
          }
        }
      });
    }

    if (donutCanvas && !donutCanvas.dataset.rendered) {
      donutCanvas.dataset.rendered = 'true';
      new Chart(donutCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Mobile', 'Desktop', 'Tablet'],
          datasets: [{
            data: [62, 34, 4],
            backgroundColor: ['#00DF89', '#047857', '#6EE7B7'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          cutout: '70%',
          plugins: { legend: { display: false } }
        }
      });
    }
  } else {
    drawCanvasBarFallback(barCanvas);
    drawCanvasDonutFallback(donutCanvas);
  }
}

function drawCanvasBarFallback(canvas) {
  if (!canvas || canvas.dataset.rendered) return;
  canvas.dataset.rendered = 'true';
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || 500) * dpr;
  canvas.height = (rect.height || 220) * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width || 500;
  const height = rect.height || 220;
  const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const values = [800, 1200, 950, 1500, 1400, 2200, 1900, 2800, 3250, 2900, 2700, 3100];
  const maxVal = 3500;

  ctx.clearRect(0, 0, width, height);
  const paddingBottom = 25;
  const chartHeight = height - paddingBottom;
  const gap = width / labels.length;
  const barWidth = gap * 0.55;

  values.forEach((val, i) => {
    const x = i * gap + gap * 0.22;
    const h = (val / maxVal) * (chartHeight - 20);
    const y = chartHeight - h;

    const grad = ctx.createLinearGradient(0, y, 0, chartHeight);
    grad.addColorStop(0, '#00DF89');
    grad.addColorStop(1, '#047857');

    ctx.fillStyle = grad;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, barWidth, h, [6, 6, 0, 0]);
    } else {
      ctx.rect(x, y, barWidth, h);
    }
    ctx.fill();

    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 11px Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barWidth / 2, height - 6);
  });
}

function drawCanvasDonutFallback(canvas) {
  if (!canvas || canvas.dataset.rendered) return;
  canvas.dataset.rendered = 'true';
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = 140;
  const height = 140;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = '140px';
  canvas.style.height = '140px';
  ctx.scale(dpr, dpr);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 4;
  const innerRadius = radius * 0.7;

  const data = [0.62, 0.34, 0.04];
  const colors = ['#00DF89', '#047857', '#6EE7B7'];

  let startAngle = -Math.PI / 2;
  ctx.clearRect(0, 0, width, height);

  data.forEach((val, i) => {
    const sliceAngle = val * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();

    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    startAngle = endAngle;
  });
}

function exportAnalyticsPdf() {
  const printWindow = window.open('', '_blank', 'width=950,height=750');
  if (!printWindow) {
    alert('Vui lòng cho phép popup để xuất báo cáo PDF.');
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="utf-8">
      <title>Báo Cáo Thống Kê & Lưu Lượng Truy Cập - Cao Ngọc Minh Portfolio</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #1E293B; line-height: 1.5; background: #fff; }
        .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #00DF89; padding-bottom: 14px; margin-bottom: 24px; }
        .title { font-size: 22px; font-weight: 800; color: #04201A; margin: 0; }
        .subtitle { font-size: 13px; color: #475569; margin-top: 4px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .metric-card { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; text-align: center; }
        .metric-val { font-size: 20px; font-weight: 800; color: #00875A; margin-top: 4px; }
        .metric-lbl { font-size: 11px; color: #64748B; font-weight: 700; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
        th { background: #F1F5F9; color: #0F172A; text-align: left; padding: 10px; border: 1px solid #CBD5E1; font-weight: 700; text-transform: uppercase; }
        td { padding: 10px; border: 1px solid #E2E8F0; }
        tr:nth-child(even) { background-color: #F8FAFC; }
        .footer { margin-top: 36px; font-size: 11px; text-align: center; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 16px; }
        .btn-print { padding: 10px 20px; background: #00DF89; color: #04201A; font-weight: 800; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; }
        @media print { .no-print { display: none !important; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom:20px; text-align:right;">
        <button onclick="window.print()" class="btn-print">🖨️ In / Tải Xuất File PDF</button>
      </div>
      <div class="header">
        <div>
          <h1 class="title">BÁO CÁO THỐNG KÊ & ANALYTICS WEBSITE</h1>
          <div class="subtitle">Cao Ngọc Minh — Graphic Designer & Digital Creator Portfolio</div>
        </div>
        <div>
          <div style="font-size:11px; color:#64748B; text-align:right;"><strong>Thời gian xuất:</strong> ${dateStr}</div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-lbl">Tổng lượt truy cập</div>
          <div class="metric-val">28,450</div>
        </div>
        <div class="metric-card">
          <div class="metric-lbl">Thời gian xem TB</div>
          <div class="metric-val">3m 45s</div>
        </div>
        <div class="metric-card">
          <div class="metric-lbl">Tỷ lệ thoát</div>
          <div class="metric-val">24.2%</div>
        </div>
        <div class="metric-card">
          <div class="metric-lbl">Thiết bị Di động</div>
          <div class="metric-val">62%</div>
        </div>
      </div>

      <h3 style="font-size:15px; color:#0F172A; margin-bottom:10px;">Lưu lượng truy cập theo tháng năm 2026</h3>
      <table>
        <thead>
          <tr>
            <th>Chỉ số</th>
            <th>T1</th><th>T2</th><th>T3</th><th>T4</th><th>T5</th><th>T6</th>
            <th>T7</th><th>T8</th><th>T9</th><th>T10</th><th>T11</th><th>T12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lượt xem</strong></td>
            <td>800</td><td>1,200</td><td>950</td><td>1,500</td><td>1,400</td><td>2,200</td>
            <td>1,900</td><td>2,800</td><td>3,250</td><td>2,900</td><td>2,700</td><td>3,100</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size:15px; color:#0F172A; margin-top:24px; margin-bottom:10px;">Tỷ lệ thiết bị truy cập</h3>
      <table>
        <thead>
          <tr>
            <th>Loại thiết bị</th>
            <th>Tỷ lệ phần trăm (%)</th>
            <th>Số lượng truy cập ước tính</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Di động (Mobile)</strong></td><td>62%</td><td>17,639 lượt</td></tr>
          <tr><td><strong>Máy tính (Desktop)</strong></td><td>34%</td><td>9,673 lượt</td></tr>
          <tr><td><strong>Máy tính bảng (Tablet)</strong></td><td>4%</td><td>1,138 lượt</td></tr>
        </tbody>
      </table>

      <div class="footer">
        © ${new Date().getFullYear()} Cao Ngọc Minh Portfolio Admin — Báo cáo thống kê tự động.
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
  }, 300);
}

/**
 * Toggle Password Visibility (Eye icon helper)
 */
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  
  if (btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = isPass ? 'visibility_off' : 'visibility';
    }
    const newTitle = isPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu';
    btn.setAttribute('aria-label', newTitle);
    btn.setAttribute('title', newTitle);
  }
}




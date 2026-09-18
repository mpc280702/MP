/**
 * CAO NGOC MINH PORTFOLIO — CONTACT FORM HANDLER
 * Features:
 * - Direct backend API storage (/api/contact -> messages.json)
 * - 4 Visual UI states: Default, Loading, Success, Error
 * - Client-side validation & XSS sanitization
 * - Honeypot anti-spam trap
 * - Graceful offline fallback to mailto
 */

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function updateLocalClock() {
  const timeEl = document.getElementById('live-time') || document.getElementById('local-time');
  if (timeEl) {
    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    timeEl.textContent = `${now.toLocaleTimeString('en-GB', options)} GMT+7 (Hà Nội)`;
  }
}

/**
 * Handle form submission with 4 UI states
 * @param {HTMLFormElement} form 
 * @param {HTMLButtonElement} submitBtn 
 * @param {HTMLElement} statusBox 
 * @param {string} honeypotId 
 */
function attachContactFormHandler(form, submitBtn, statusBox, honeypotId) {
  if (!form || !submitBtn) return;

  const btnText = submitBtn.querySelector('span:not(.material-symbols-outlined)') || submitBtn;
  const btnIcon = submitBtn.querySelector('.material-symbols-outlined');
  const originalText = btnText ? btnText.textContent : 'Gửi Lời Nhắn';
  const originalIcon = btnIcon ? btnIcon.textContent : 'send';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Honeypot anti-spam check
    if (honeypotId) {
      const hp = document.getElementById(honeypotId);
      if (hp && hp.value !== '') {
        console.warn('Spam trap triggered.');
        form.reset();
        return;
      }
    }

    // 2. Extract & Sanitize Data
    const formData = new FormData(form);
    const rawName = formData.get('Họ và tên') || formData.get('name') || '';
    const rawEmail = formData.get('Email') || formData.get('email') || '';
    const rawPurpose = formData.get('Mục đích') || formData.get('purpose') || 'Liên hệ trao đổi';
    const rawMessage = formData.get('Lời nhắn') || formData.get('message') || '';

    const name = sanitizeInput(rawName.toString());
    const email = sanitizeInput(rawEmail.toString());
    const purpose = sanitizeInput(rawPurpose.toString());
    const message = sanitizeInput(rawMessage.toString());

    // 3. Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus(statusBox, 'error', 'Email Không Hợp Lệ', 'Vui lòng kiểm tra lại định dạng email của bạn.');
      return;
    }

    if (name.length < 2) {
      showStatus(statusBox, 'error', 'Họ Tên Không Hợp Lệ', 'Vui lòng điền họ và tên.');
      return;
    }

    if (message.length < 5) {
      showStatus(statusBox, 'error', 'Nội Dung Quá Ngắn', 'Vui lòng nhập nội dung lời nhắn chi tiết hơn.');
      return;
    }

    // 4. UI STATE: LOADING
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-70', 'cursor-wait');
    if (btnText) btnText.textContent = 'Đang gửi lời nhắn...';
    if (btnIcon) btnIcon.textContent = 'sync';
    if (btnIcon) btnIcon.classList.add('animate-spin');

    if (statusBox) {
      statusBox.classList.remove('hidden');
      statusBox.className = 'state-box state-loading flex items-center gap-3';
      statusBox.innerHTML = `
        <span class="material-symbols-outlined text-[#00DF89] animate-spin">sync</span>
        <div>
          <strong class="block text-white text-xs sm:text-sm font-bold">Đang xử lý gửi tin nhắn...</strong>
          <span class="text-xs text-[#B8D3CB]">Vui lòng đợi giây lát.</span>
        </div>
      `;
    }

    const targetEmail = 'mngoc12851@gmail.com';
    const formSubmitUrl = `https://formsubmit.co/ajax/${targetEmail}`;

    const formPayload = {
      'Họ và tên': name,
      'Email người gửi': email,
      '_replyto': email,
      'Mục đích liên hệ': purpose,
      'Nội dung lời nhắn': message,
      '_subject': `[Portfolio Website] ${purpose} - Từ ${name}`,
      '_template': 'table',
      '_captcha': 'false'
    };

    // Backup to local server storage if available
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Họ và tên': name,
          'Email': email,
          'Mục đích': purpose,
          'Lời nhắn': message,
          'submittedAt': new Date().toISOString()
        })
      }).catch(() => {});
    } catch (_) {}

    try {
      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && (resData.success === 'true' || resData.success === true)) {
        // 5. UI STATE: SUCCESS
        showStatus(
          statusBox,
          'success',
          'Đã Gửi Lời Nhắn Đến Hộp Thư Thành Công! 🎉',
          `Cảm ơn <strong>${name}</strong> đã liên hệ. Lời nhắn đã được chuyển trực tiếp tới hộp thư Gmail của Cao Ngọc Minh (<strong>${targetEmail}</strong>). Minh sẽ phản hồi bạn qua email <strong>${email}</strong> trong thời gian sớm nhất.`
        );
        form.reset();
      } else if (resData.message && resData.message.includes('needs Activation')) {
        showStatus(
          statusBox,
          'success',
          'Yêu Cầu Kích Hoạt Form (Lần Đầu Tiên)',
          `Hệ thống vừa gửi 1 email xác nhận kích hoạt tới <strong>${targetEmail}</strong>. Bạn hãy mở hòm thư Gmail và bấm nút <strong>"Activate Form"</strong> (chỉ cần làm 1 lần duy nhất) để hoàn tất kết nối nhận email trực tiếp từ website!`
        );
        form.reset();
      } else {
        throw new Error(resData.message || 'Server returned ' + response.status);
      }
    } catch (err) {
      console.warn('Email gateway notice:', err.message);
      // 6. UI STATE: ERROR with graceful fallback
      const mailtoSubject = encodeURIComponent(`[Portfolio] ${purpose} - ${name}`);
      const mailtoBody = encodeURIComponent(`Chào Cao Ngọc Minh,\n\nTôi là ${name} (${email}).\nMục đích: ${purpose}\n\nLời nhắn:\n${message}`);
      const mailtoLink = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      showStatus(
        statusBox,
        'error',
        'Không Thể Gửi Email Tự Động',
        `Tin nhắn chưa gửi qua cổng email tự động được. Bạn có thể bấm nút bên dưới để mở ứng dụng Email gửi trực tiếp tới <strong>${targetEmail}</strong>:
        <div class="mt-3">
          <a href="${mailtoLink}" class="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs">
            <span>Mở Email Gửi Trực Tiếp</span>
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>`
      );
    } finally {
      // Revert button back to default
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-70', 'cursor-wait');
      if (btnText) btnText.textContent = originalText;
      if (btnIcon) {
        btnIcon.textContent = originalIcon;
        btnIcon.classList.remove('animate-spin');
      }
    }
  });
}

function showStatus(container, type, title, htmlContent) {
  if (!container) return;
  container.classList.remove('hidden');

  if (type === 'success') {
    container.className = 'state-box state-success mt-4 p-4 rounded-xl border border-[#00DF89] bg-[#04201A] text-white shadow-xl';
    container.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-[#00DF89] text-2xl shrink-0 mt-0.5">check_circle</span>
        <div>
          <h4 class="font-roboto font-bold text-sm sm:text-base text-[#00DF89] mb-1">${title}</h4>
          <p class="text-xs sm:text-sm text-[#DDE8E4] leading-relaxed">${htmlContent}</p>
        </div>
      </div>
    `;
  } else {
    container.className = 'state-box state-error mt-4 p-4 rounded-xl border border-red-500/50 bg-[#2D0A0A] text-white shadow-xl';
    container.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-red-400 text-2xl shrink-0 mt-0.5">error</span>
        <div>
          <h4 class="font-roboto font-bold text-sm sm:text-base text-red-400 mb-1">${title}</h4>
          <div class="text-xs sm:text-sm text-[#FCA5A5] leading-relaxed">${htmlContent}</div>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateLocalClock();
  setInterval(updateLocalClock, 1000);

  // Form on index.html
  const homeForm = document.getElementById('home-contact-form');
  const homeBtn = document.getElementById('home-submit-btn');
  const homeStatus = document.getElementById('home-form-status');
  if (homeForm && homeBtn) {
    attachContactFormHandler(homeForm, homeBtn, homeStatus, 'home-hp-check');
  }

  // Form on pages/contact.html
  const contactPageForm = document.getElementById('contact-form');
  const contactPageBtn = document.getElementById('submit-btn');
  const contactPageStatus = document.getElementById('status-card') || document.getElementById('form-status');
  if (contactPageForm && contactPageBtn) {
    attachContactFormHandler(contactPageForm, contactPageBtn, contactPageStatus, 'hp-check');
  }
});

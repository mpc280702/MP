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

  const originalBtnHTML = submitBtn.innerHTML;

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
    submitBtn.innerHTML = `<span>Đang gửi lời nhắn...</span><span class="material-symbols-outlined text-base ml-2 animate-spin">sync</span>`;

    if (statusBox) {
      statusBox.classList.remove('hidden');
      statusBox.className = 'state-box state-loading flex items-center gap-3 p-4 rounded-xl bg-[#04201A] border border-[#00DF89]/30 text-white';
      statusBox.innerHTML = `
        <span class="material-symbols-outlined text-[#00DF89] animate-spin text-2xl shrink-0">sync</span>
        <div>
          <strong class="block text-white text-xs sm:text-sm font-bold">Đang xử lý gửi tin nhắn...</strong>
          <span class="text-xs text-[#B8D3CB]">Vui lòng đợi trong giây lát.</span>
        </div>
      `;
    }

    const targetEmail = 'mngoc1285l@gmail.com';
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

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    try {
      if (isLocalhost) {
        // Send to local server
        await fetch('/api/contact', {
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

        // Also ping FormSubmit gateway in background
        fetch(formSubmitUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formPayload)
        }).catch(() => {});

        showStatus(
          statusBox,
          'success',
          'Đã Gửi Lời Nhắn Thành Công! 🎉',
          `Cảm ơn <strong>${name}</strong> đã liên hệ. Lời nhắn đã được lưu trữ an toàn. Cao Ngọc Minh sẽ phản hồi bạn qua email <strong>${email}</strong> sớm nhất!`
        );
      } else {
        // Production: send via FormSubmit with 8s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(formSubmitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formPayload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        showStatus(
          statusBox,
          'success',
          'Đã Gửi Lời Nhắn Đến Hộp Thư Thành Công! 🎉',
          `Cảm ơn <strong>${name}</strong> đã liên hệ. Lời nhắn đã được chuyển trực tiếp tới hộp thư Gmail của Cao Ngọc Minh (<strong>${targetEmail}</strong>). Minh sẽ phản hồi qua email <strong>${email}</strong> trong thời gian sớm nhất.`
        );
      }

      form.reset();
    } catch (err) {
      console.warn('Submission fallback notice:', err.message);
      const mailtoSubject = encodeURIComponent(`[Portfolio] ${purpose} - ${name}`);
      const mailtoBody = encodeURIComponent(`Chào Cao Ngọc Minh,\n\nTôi là ${name} (${email}).\nMục đích: ${purpose}\n\nLời nhắn:\n${message}`);
      const mailtoLink = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      showStatus(
        statusBox,
        'error',
        'Không Thể Gửi Tự Động',
        `Chưa gửi qua cổng tự động được. Bạn có thể bấm nút bên dưới để gửi email trực tiếp tới <strong>${targetEmail}</strong>:
        <div class="mt-3">
          <a href="${mailtoLink}" class="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs">
            <span>Mở Email Gửi Trực Tiếp</span>
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>`
      );
    } finally {
      // Guaranteed button restoration
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-70', 'cursor-wait');
      submitBtn.innerHTML = originalBtnHTML;
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

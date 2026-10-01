/**
 * CAO NGOC MINH PORTFOLIO — CONTACT FORM HANDLER
 * Production backend logic communicating with PHP API (MySQL + PHPMailer SMTP).
 */

const CONTACT_TARGET_EMAIL = 'mngoc1285l@gmail.com';
const SUBMIT_TIMEOUT_MS = 8000;

function escapeHTML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function updateLocalClock() {
  const timeEl =
    document.getElementById('live-time') ||
    document.getElementById('local-time');

  if (!timeEl) return;

  const now = new Date();
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  timeEl.textContent =
    `${now.toLocaleTimeString('en-GB', options)} GMT+7 (Hà Nội)`;
}

function showStatus(container, type, title, htmlContent) {
  if (!container) return;

  container.classList.remove('hidden');

  if (type === 'success') {
    container.className =
      'state-box state-success mt-4 p-4 rounded-xl border border-[#00DF89] bg-[#04201A] text-white shadow-xl';

    container.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-[#00DF89] text-2xl shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
        <div>
          <h4 class="font-roboto font-bold text-sm sm:text-base text-[#00DF89] mb-1">${title}</h4>
          <div class="text-xs sm:text-sm text-[#DDE8E4] leading-relaxed">${htmlContent}</div>
        </div>
      </div>
    `;
  } else {
    container.className =
      'state-box state-error mt-4 p-4 rounded-xl border border-red-500/50 bg-[#2D0A0A] text-white shadow-xl';

    container.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-red-400 text-2xl shrink-0 mt-0.5" aria-hidden="true">error</span>
        <div>
          <h4 class="font-roboto font-bold text-sm sm:text-base text-red-400 mb-1">${title}</h4>
          <div class="text-xs sm:text-sm text-[#FCA5A5] leading-relaxed">${htmlContent}</div>
        </div>
      </div>
    `;
  }
}

function setSubmittingState(button, isSubmitting, originalHTML) {
  if (!button) return;

  button.disabled = isSubmitting;
  button.setAttribute('aria-busy', String(isSubmitting));

  if (isSubmitting) {
    button.classList.add('opacity-70', 'cursor-wait');
    button.innerHTML =
      '<span>Đang gửi lời nhắn...</span>' +
      '<span class="material-symbols-outlined text-base ml-2 animate-spin" aria-hidden="true">sync</span>';
  } else {
    button.classList.remove('opacity-70', 'cursor-wait');
    button.innerHTML = originalHTML;
  }
}

function getFormData(form) {
  const formData = new FormData(form);

  return {
    name: String(formData.get('Họ và tên') || formData.get('name') || '').trim(),
    email: String(formData.get('Email') || formData.get('email') || '').trim(),
    purpose: String(
      formData.get('Mục đích') ||
      formData.get('purpose') ||
      'Liên hệ trao đổi'
    ).trim(),
    message: String(
      formData.get('Lời nhắn') ||
      formData.get('message') ||
      ''
    ).trim()
  };
}

function validateFormData(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (data.name.length < 2) {
    return {
      ok: false,
      title: 'Họ Tên Không Hợp Lệ',
      message: 'Vui lòng điền họ và tên.'
    };
  }

  if (!emailRegex.test(data.email)) {
    return {
      ok: false,
      title: 'Email Không Hợp Lệ',
      message: 'Vui lòng kiểm tra lại định dạng email của bạn.'
    };
  }

  if (data.message.length < 5) {
    return {
      ok: false,
      title: 'Nội Dung Quá Ngắn',
      message: 'Vui lòng nhập nội dung lời nhắn chi tiết hơn.'
    };
  }

  // Basic abuse guard; do not allow extremely large client payloads.
  if (data.name.length > 120 || data.email.length > 180 ||
      data.purpose.length > 180 || data.message.length > 5000) {
    return {
      ok: false,
      title: 'Nội Dung Quá Dài',
      message: 'Vui lòng rút gọn nội dung và thử lại.'
    };
  }

  return { ok: true };
}

async function postJSON(url, payload, timeoutMs = SUBMIT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    let body = null;
    try {
      body = await response.json();
    } catch (_) {
      body = null;
    }

    if (!response.ok) {
      throw new Error(
        body?.message ||
        body?.error ||
        `HTTP ${response.status}`
      );
    }

    if (body && body.success === false) {
      throw new Error(body.message || body.error || 'Submission failed.');
    }

    return body || { success: true };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function attachContactFormHandler(
  form,
  submitBtn,
  statusBox,
  honeypotId
) {
  if (!form || !submitBtn || form.dataset.contactBound === 'true') return;

  form.dataset.contactBound = 'true';
  const originalBtnHTML = submitBtn.innerHTML;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submitBtn.disabled) return;

    const honeypot = honeypotId
      ? document.getElementById(honeypotId)
      : null;

    if (honeypot && honeypot.value !== '') {
      console.warn('Spam trap triggered.');
      return;
    }

    const rawData = getFormData(form);
    const validation = validateFormData(rawData);

    if (!validation.ok) {
      showStatus(
        statusBox,
        'error',
        escapeHTML(validation.title),
        escapeHTML(validation.message)
      );
      return;
    }

    const safe = {
      name: escapeHTML(rawData.name),
      email: escapeHTML(rawData.email),
      purpose: escapeHTML(rawData.purpose),
      message: escapeHTML(rawData.message)
    };

    setSubmittingState(submitBtn, true, originalBtnHTML);

    if (statusBox) {
      showStatus(
        statusBox,
        'loading',
        'Đang xử lý...',
        'Vui lòng đợi trong giây lát.'
      );
    }

    // Determine PHP API Endpoint (Relative for local/hosting, or global override)
    const isPagesFolder = window.location.pathname.includes('/pages/');
    const apiEndpoint = window.PORTFOLIO_API_URL || (isPagesFolder ? '../api/contact.php' : 'api/contact.php');

    const payload = {
      name: rawData.name,
      email: rawData.email,
      purpose: rawData.purpose,
      message: rawData.message,
      hp_check: honeypot ? honeypot.value : ''
    };

    try {
      const result = await postJSON(apiEndpoint, payload, SUBMIT_TIMEOUT_MS);

      if (result && result.success === true) {
        showStatus(
          statusBox,
          'success',
          'Đã Gửi Lời Nhắn Thành Công! 🎉',
          `Cảm ơn <strong>${safe.name}</strong> đã liên hệ. ` +
          `Lời nhắn của bạn đã được ghi nhận vào hệ thống. ` +
          `Minh sẽ phản hồi qua email <strong>${safe.email}</strong> trong thời gian sớm nhất.`
        );

        form.reset();
      } else {
        throw new Error(result?.message || 'Không thể gửi form. Vui lòng thử lại sau.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);

      // Direct mailto fallback if backend is unreachable
      const mailtoSubject = encodeURIComponent(
        `[Portfolio] ${rawData.purpose} - ${rawData.name}`
      );

      const mailtoBody = encodeURIComponent(
        `Chào Cao Ngọc Minh,\n\n` +
        `Tôi là ${rawData.name} (${rawData.email}).\n` +
        `Mục đích: ${rawData.purpose}\n\n` +
        `Lời nhắn:\n${rawData.message}`
      );

      const mailtoLink =
        `mailto:${CONTACT_TARGET_EMAIL}` +
        `?subject=${mailtoSubject}&body=${mailtoBody}`;

      showStatus(
        statusBox,
        'error',
        'Chưa Thể Gửi Tự Động',
        `Lỗi: ${escapeHTML(err.message || 'Không thể kết nối đến máy chủ.')}<br>` +
        `Bạn có thể gửi thư trực tiếp tới ` +
        `<strong>${escapeHTML(CONTACT_TARGET_EMAIL)}</strong>:` +
        `<div class="mt-3">` +
        `<a href="${mailtoLink}" class="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs" ` +
        `aria-label="Mở ứng dụng email để gửi trực tiếp">` +
        `<span>Mở Ứng Dụng Email</span>` +
        `<span class="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>` +
        `</a></div>`
      );
    }
    setSubmittingState(submitBtn, false, originalBtnHTML);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateLocalClock();
  window.setInterval(updateLocalClock, 1000);

  const homeForm = document.getElementById('home-contact-form');
  const homeBtn = document.getElementById('home-submit-btn');
  const homeStatus = document.getElementById('home-form-status');

  if (homeForm && homeBtn) {
    void attachContactFormHandler(
      homeForm,
      homeBtn,
      homeStatus,
      'home-hp-check'
    );
  }

  const contactPageForm = document.getElementById('contact-form');
  const contactPageBtn = document.getElementById('submit-btn');
  const contactPageStatus =
    document.getElementById('status-card') ||
    document.getElementById('form-status');

  if (contactPageForm && contactPageBtn) {
    void attachContactFormHandler(
      contactPageForm,
      contactPageBtn,
      contactPageStatus,
      'hp-check'
    );
  }
});

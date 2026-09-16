/**
 * CONTACT & BOOKING FORM SCRIPT (CAO NGỌC MINH)
 * Tích hợp bảo mật: XSS Sanitization, Honeypot Spam Trap, Submission Cooldown
 * & Tự động mở soạn thư Gmail / Sao chép nội dung
 */

let lastFormattedBody = '';

// XSS Sanitizer Helper
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

function setInquiryType(btn) {
  const buttons = document.querySelectorAll('.inquiry-btn');
  buttons.forEach(b => {
    b.classList.remove('active', 'border-[#00DF89]', 'text-white', 'bg-[#00DF89]/20');
    b.classList.add('text-[#B8D3CB]', 'bg-[#04201A]');
  });

  btn.classList.add('active', 'border-[#00DF89]', 'text-white', 'bg-[#00DF89]/20');
  btn.classList.remove('text-[#B8D3CB]', 'bg-[#04201A]');

  const hiddenInput = document.getElementById('selected-inquiry');
  if (hiddenInput) {
    hiddenInput.value = btn.innerText.trim();
  }
}

function updateLocalClock() {
  const timeEl = document.getElementById('live-time') || document.getElementById('local-time');
  if (timeEl) {
    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    timeEl.textContent = `${now.toLocaleTimeString('en-GB', options)} GMT+7 (Hà Nội)`;
  }
}

function copyMessageText() {
  if (!lastFormattedBody) return;
  navigator.clipboard.writeText(lastFormattedBody).then(() => {
    const copyText = document.getElementById('copy-text');
    const copyIcon = document.getElementById('copy-icon');
    if (copyText) copyText.textContent = 'Đã sao chép!';
    if (copyIcon) copyIcon.textContent = 'check';
    setTimeout(() => {
      if (copyText) copyText.textContent = 'Sao Chép Lại Nội Dung';
      if (copyIcon) copyIcon.textContent = 'content_copy';
    }, 2500);
  });
}

// Security: Submission Cooldown state (Rate limiting)
let lastSubmitTime = 0;
const SUBMISSION_COOLDOWN_MS = 10000; // 10 seconds cooldown between submissions

document.addEventListener('DOMContentLoaded', () => {
  updateLocalClock();
  setInterval(updateLocalClock, 1000);

  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');
  const statusCard = document.getElementById('status-card');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. Security Check: Honeypot field (Bot spam trap)
      const honeypot = document.getElementById('hp-check');
      if (honeypot && honeypot.value !== '') {
        console.warn('Spam bot activity detected and blocked.');
        contactForm.reset();
        return;
      }

      // 2. Security Check: Client-side Rate Limiting / Cooldown
      const now = Date.now();
      if (now - lastSubmitTime < SUBMISSION_COOLDOWN_MS) {
        const remainingSec = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - lastSubmitTime)) / 1000);
        alert(`Vui lòng chờ ${remainingSec} giây trước khi gửi yêu cầu tiếp theo.`);
        return;
      }

      // 3. Extract & Sanitize Form Data
      const rawInquiry = document.getElementById('selected-inquiry')?.value || 'Phỏng Vấn Tuyển Dụng';
      const rawName = document.getElementById('name')?.value || '';
      const rawEmail = document.getElementById('email')?.value || '';
      const rawCompany = document.getElementById('company')?.value || 'Cá nhân';
      const rawPhone = document.getElementById('pref-date')?.value || 'Không cung cấp';
      const prefTimeSelect = document.getElementById('pref-time');
      const rawTime = prefTimeSelect ? prefTimeSelect.options[prefTimeSelect.selectedIndex]?.text : 'Linh hoạt';
      const rawMessage = document.getElementById('message')?.value || '';

      const name = sanitizeInput(rawName);
      const email = sanitizeInput(rawEmail);
      const company = sanitizeInput(rawCompany);
      const inquiry = sanitizeInput(rawInquiry);
      const prefDate = sanitizeInput(rawPhone);
      const prefTime = sanitizeInput(rawTime);
      const message = sanitizeInput(rawMessage);

      // 4. Strict Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Vui lòng nhập địa chỉ email hợp lệ.');
        document.getElementById('email')?.focus();
        return;
      }

      if (name.length < 2) {
        alert('Vui lòng nhập họ và tên hợp lệ.');
        document.getElementById('name')?.focus();
        return;
      }

      if (!message) {
        alert('Vui lòng điền nội dung lời nhắn.');
        document.getElementById('message')?.focus();
        return;
      }

      // Update cooldown timestamp
      lastSubmitTime = now;

      // Format clean message for email
      const emailSubject = `[Portfolio Cao Ngọc Minh] Lời nhắn từ ${name} - ${inquiry}`;
      const emailBody = `Kính gửi Cao Ngọc Minh (Graphic Designer & Digital Creator),

Tôi gửi lời nhắn từ Website Portfolio của bạn với thông tin như sau:
--------------------------------------------------
• Họ và tên: ${name}
• Địa chỉ Email: ${email}
• Công ty / Doanh nghiệp: ${company}
• Số điện thoại / Ngày trao đổi: ${prefDate}
• Khung giờ thuận tiện: ${prefTime}
• Mục đích liên hệ: ${inquiry}

Nội dung lời nhắn:
${message}
--------------------------------------------------
Trân trọng,
${name} (${email})`;

      lastFormattedBody = emailBody;

      // Prepare URLs
      const targetEmail = 'mngoc12851@gmail.com';
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Update button state
      const originalText = btnText ? btnText.textContent : 'Gửi Lời Nhắn Đến Cao Ngọc Minh';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-70');
      }
      if (btnText) btnText.textContent = 'Đang mở Gmail...';
      if (btnIcon) btnIcon.textContent = 'outgoing_mail';

      // 1. If running with local server, save a backup copy to messages.json via API
      try {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'Họ và tên': name,
            'Email': email,
            'Công ty': company,
            'Mục đích': inquiry,
            'SĐT / Ngày': prefDate,
            'Khung giờ': prefTime,
            'Lời nhắn': message
          })
        }).catch(() => {});
      } catch (e) {}

      // 2. Set action URLs in status card if exists
      const openGmailBtn = document.getElementById('open-gmail-btn');
      const openMailClientBtn = document.getElementById('open-mail-client-btn');
      if (openGmailBtn) openGmailBtn.href = gmailUrl;
      if (openMailClientBtn) openMailClientBtn.href = mailtoUrl;

      // 3. Automatically open Gmail compose in a new tab
      window.open(gmailUrl, '_blank');

      // 4. Also copy text to clipboard for convenience
      try {
        navigator.clipboard.writeText(emailBody);
      } catch (err) {}

      // 5. Display status card or success alert
      if (statusCard) {
        statusCard.classList.remove('hidden');
        statusCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const successAlert = document.getElementById('success-alert');
        if (successAlert) {
          successAlert.classList.remove('hidden');
          successAlert.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Reset button
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-70');
        }
        if (btnText) btnText.textContent = originalText;
        if (btnIcon) btnIcon.textContent = 'send';
      }, 600);

      contactForm.reset();
    });
  }
});

/**
 * CONTACT & BOOKING FORM SCRIPT (CAO NGỌC MINH)
 */

let lastFormattedBody = '';

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
      if (copyText) copyText.textContent = 'Sao Chép Nội Dung';
      if (copyIcon) copyIcon.textContent = 'content_copy';
    }, 2500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateLocalClock();
  setInterval(updateLocalClock, 1000);

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const btnText = document.getElementById('btn-text');
      const btnIcon = document.getElementById('btn-icon');
      const statusCard = document.getElementById('status-card');

      // Collect form field values
      const inquiry = document.getElementById('selected-inquiry')?.value || 'Phỏng Vấn Tuyển Dụng';
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const prefDate = document.getElementById('pref-date')?.value.trim() || 'Không cung cấp';
      const prefTimeSelect = document.getElementById('pref-time');
      const prefTime = prefTimeSelect ? prefTimeSelect.options[prefTimeSelect.selectedIndex]?.text : 'Linh hoạt';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ Họ tên, Email và Lời nhắn.');
        return;
      }

      // Format clean message for email
      const emailSubject = `[Portfolio Cao Ngọc Minh] Lời nhắn từ ${name} - ${inquiry}`;
      const emailBody = `Kính gửi Cao Ngọc Minh (Graphic Designer),

Tôi gửi lời nhắn từ Website Portfolio của bạn với thông tin như sau:
--------------------------------------------------
• Họ và tên: ${name}
• Địa chỉ Email: ${email}
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
      const targetEmail = 'mngoc1285l@gmail.com';
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

      // 1. If running with local server, save a backup copy to messages.json
      try {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'Họ và tên': name,
            'Email': email,
            'Mục đích': inquiry,
            'SĐT / Ngày': prefDate,
            'Khung giờ': prefTime,
            'Lời nhắn': message
          })
        }).catch(() => {});
      } catch (e) {}

      // 2. Set action URLs in status card
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

      // 5. Display status card
      if (statusCard) {
        statusCard.classList.remove('hidden');
        statusCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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


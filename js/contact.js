/**
 * CONTACT & BOOKING FORM SCRIPT (CAO NGỌC MINH)
 */

function setInquiryType(btn) {
  const buttons = document.querySelectorAll('.inquiry-btn');
  buttons.forEach(b => {
    b.classList.remove('active', 'border-[#00DF89]', 'text-white', 'bg-[#00DF89]/20');
    b.classList.add('text-[#B8D3CB]', 'bg-[#072C24]');
  });

  btn.classList.add('active', 'border-[#00DF89]', 'text-white', 'bg-[#00DF89]/20');
  btn.classList.remove('text-[#B8D3CB]', 'bg-[#072C24]');

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
      const successAlert = document.getElementById('success-alert');
      const activationAlert = document.getElementById('activation-alert');
      const errorAlert = document.getElementById('error-alert');

      // Hide previous alerts
      if (successAlert) successAlert.classList.add('hidden');
      if (activationAlert) activationAlert.classList.add('hidden');
      if (errorAlert) errorAlert.classList.add('hidden');

      // Collect form field values
      const inquiry = document.getElementById('selected-inquiry')?.value || 'Phỏng Vấn Tuyển Dụng';
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const prefDate = document.getElementById('pref-date')?.value.trim() || 'Không cung cấp';
      const prefTimeSelect = document.getElementById('pref-time');
      const prefTime = prefTimeSelect ? prefTimeSelect.options[prefTimeSelect.selectedIndex]?.text : '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ Họ tên, Email và Lời nhắn.');
        return;
      }

      // Button loading state
      const originalText = btnText ? btnText.textContent : 'Gửi Lời Nhắn Đến Cao Ngọc Minh';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
      }
      if (btnText) btnText.textContent = 'Đang gửi lời nhắn tới Gmail...';
      if (btnIcon) btnIcon.textContent = 'hourglass_top';

      try {
        const payload = {
          'Mục đích trao đổi': inquiry,
          'Họ và tên': name,
          'Địa chỉ Email': email,
          'Số điện thoại / Ngày trao đổi': prefDate,
          'Khung giờ thuận tiện': prefTime,
          'Nội dung lời nhắn': message,
          '_subject': `[Portfolio Cao Ngọc Minh] Tin nhắn mới từ ${name} (${inquiry})`,
          '_template': 'table',
          '_captcha': 'false'
        };

        const response = await fetch('https://formsubmit.co/ajax/mngoc12851@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
          if (data.message && data.message.toLowerCase().includes('activation')) {
            // First time activation message from FormSubmit
            if (activationAlert) {
              activationAlert.classList.remove('hidden');
              activationAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else if (successAlert) {
              successAlert.classList.remove('hidden');
            }
          } else {
            // Standard success
            if (successAlert) {
              successAlert.classList.remove('hidden');
              successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
              alert(`Cảm ơn ${name}! Lời nhắn đã được chuyển tới Gmail của Cao Ngọc Minh.`);
            }
          }
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Lỗi gửi tin nhắn');
        }
      } catch (err) {
        console.error('Lỗi khi gửi email:', err);
        if (errorAlert) {
          errorAlert.classList.remove('hidden');
          const fallbackBtn = document.getElementById('fallback-email-btn');
          if (fallbackBtn) {
            const subject = encodeURIComponent(`[Portfolio] ${inquiry} - Từ ${name}`);
            const body = encodeURIComponent(`Xin chào Cao Ngọc Minh,\n\nTôi là: ${name}\nEmail: ${email}\nSĐT / Ngày: ${prefDate}\nKhung giờ: ${prefTime}\n\nMục đích: ${inquiry}\n\nLời nhắn:\n${message}`);
            fallbackBtn.href = `mailto:mngoc12851@gmail.com?subject=${subject}&body=${body}`;
          }
          errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert('Có lỗi khi gửi tự động. Vui lòng gửi email trực tiếp tới mngoc12851@gmail.com');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
        }
        if (btnText) btnText.textContent = originalText;
        if (btnIcon) btnIcon.textContent = 'send';
      }
    });
  }
});


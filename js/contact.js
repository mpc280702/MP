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
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value || 'Bạn';
      const successAlert = document.getElementById('success-alert');
      const successModal = document.getElementById('success-modal');

      if (successAlert) {
        successAlert.classList.remove('hidden');
        successAlert.scrollIntoView({ behavior: 'smooth' });
      } else if (successModal) {
        successModal.classList.remove('hidden');
      } else {
        alert(`Cảm ơn ${name}! Yêu cầu của bạn đã được gửi thành công. Cao Ngọc Minh sẽ liên hệ lại với bạn trong thời gian sớm nhất.`);
      }
      contactForm.reset();
    });
  }
});


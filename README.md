# CAO NGỌC MINH — Graphic Designer Portfolio

Website portfolio cá nhân cao cấp dành cho **Cao Ngọc Minh (Graphic Designer & Digital Creator)**, được xây dựng với phong cách thiết kế hiện đại, typography táo bạo, dark mode sang trọng và tương tác mượt mà.

---

## 📁 Cấu trúc Thư mục Dự án

```text
stitch_x_y_d_ng_website_portfolio/
│
├── index.html                       # Trang chủ (Home) - Hero, Selected Work Preview, About & CTA
│
├── pages/                           # Thư mục các trang chức năng
│   ├── selected-work.html           # Bộ sưu tập 12 dự án với bộ lọc phân loại tương tác (Filter)
│   ├── case-study-vortex.html       # Case study chi tiết dự án Vortex Kinetic Identity
│   ├── case-study-net-que.html      # Case study dự án Nét Quê F&B Branding
│   ├── case-study-lamee.html        # Case study dự án La Mée Paris
│   ├── case-study-portfolio.html    # Case study tổng thể quy trình thiết kế Portfolio
│   ├── about.html                   # Giới thiệu bản thân, kỹ năng, kinh nghiệm & triết lý thiết kế
│   ├── contact.html                 # Liên hệ, form đặt lịch phỏng vấn & đồng hồ múi giờ thời gian thực
│   └── privacy-security.html        # Chính sách bảo mật dữ liệu, thỏa thuận NDA & bản quyền tác phẩm
│
├── css/                             # Định kiểu giao diện toàn cục
│   └── main.css                     # Custom scrollbar, animations, glassmorphism & utilities
│
├── js/                              # Mã nguồn JavaScript xử lý tương tác
│   ├── main.js                      # Điều hướng Navbar, Mobile Menu & dynamic year
│   ├── filter.js                    # Logic lọc danh mục dự án ở trang Selected Work
│   └── contact.js                   # Xử lý form, bẫy Honeypot, XSS sanitization & submission cooldown
│
├── assets/                          # Tài nguyên hình ảnh & tài liệu
│   ├── images/                      # Ảnh chụp màn hình & mockup giao diện
│   └── docs/                        # Tài liệu hướng dẫn thiết kế & chiến lược
│       ├── DESIGN.md                # Design System (Màu sắc, Typography, Spacing)
│       └── portfolio_strategy.txt   # Phân tích mục tiêu & quy trình xây dựng portfolio
│
├── server.js                        # Máy chủ Node.js tích hợp OWASP Security Headers & Rate Limiter
└── README.md                        # Tài liệu hướng dẫn dự án
```

---

## 🚀 Cách Chạy & Xem Website

1. **Chạy Secure Server (khuyến nghị)**:
   ```bash
   node server.js
   ```
   Sau đó truy cập: `http://localhost:3000`

2. **Mở trực tiếp trong trình duyệt**:
   - Nhấp đúp vào tệp `index.html` trong thư mục gốc.

---

## 🛡️ Hệ Thống Bảo Mật Toàn Diện (Security Suite)
- **Chính Sách Bảo Mật & Bản Quyền (`pages/privacy-security.html`)**: Minh bạch hóa thu thập dữ liệu, cam kết thỏa thuận bảo mật NDA cho dự án doanh nghiệp, bảo hộ bản quyền tác phẩm sáng tạo của Designer.
- **OWASP Security Headers**: Tích hợp Content-Security-Policy (CSP), X-Frame-Options (Clickjacking defense), X-Content-Type-Options (MIME-sniffing defense), Referrer-Policy, Permissions-Policy.
- **Chống Path Traversal**: Kiểm soát chặt chẽ đường dẫn tệp tuyệt đối trong `server.js` ngăn chặn truy cập trái phép tệp hệ thống.
- **Form Security & Chống Spam**:
  - Tích hợp trường ẩn **Honeypot Trap** để phát hiện và ngăn chặn bot spam tự động.
  - Bộ lọc **XSS Sanitization & Escaping** cho tất cả dữ liệu người dùng nhập.
  - Cơ chế **Cooldown Rate Limiting** ngăn chặn gửi form liên tục (chống DoS / flooding).
- **In-Memory Server Rate Limiting**: Hạn chế số lượng request bất thường theo IP.

---

## 🎨 Điểm Nổi Bật Về Thiết Kế (UI/UX)
- **Design Tokens**: Đồng bộ chuẩn màu Dark Theme (`#05261F`), màu nhấn Primary (`#00DF89`), Accent Lime (`#A3E635`).
- **Typography cao cấp**: Sử dụng bộ font Roboto và Google Material Symbols Icons sắc nét.
- **Responsive 100%**: Tối ưu hiển thị hoàn hảo trên Desktop, Tablet và Mobile.


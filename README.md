# CAO NGỌC MINH — Graphic Designer Portfolio

Website portfolio cá nhân cao cấp dành cho **Cao Ngọc Minh (Graphic Designer & Digital Creator)**, được xây dựng với phong cách thiết kế hiện đại, typography táo bạo, dark mode sang trọng và tương tác mượt mà.

---

## 📁 Cấu trúc Thư mục Dự án

```text
MP/
│
├── index.html                       # Trang chủ (Home) - Hero, Selected Work Preview, About & CTA
├── 404.html                         # Trang báo lỗi 404 tùy biến chuyên nghiệp
├── robots.txt                       # Tệp chỉ mục công cụ tìm kiếm
├── sitemap.xml                      # Sơ đồ trang web hỗ trợ SEO
│
├── pages/                           # Thư mục các trang chức năng & Case Studies
│   ├── selected-work.html           # Bộ sưu tập dự án với bộ lọc phân loại tương tác (Filter)
│   ├── case-study-vortex.html       # Case study chi tiết dự án Vortex Kinetic Identity
│   ├── case-study-net-que.html      # Case study dự án Nét Quê F&B Branding
│   ├── case-study-lamee.html        # Case study dự án La Mée Paris
│   ├── case-study-portfolio.html    # Case study tổng thể quy trình thiết kế Portfolio
│   ├── about.html                   # Giới thiệu bản thân, kỹ năng, kinh nghiệm & triết lý thiết kế
│   ├── contact.html                 # Liên hệ, form đặt lịch phỏng vấn & đồng hồ múi giờ thời gian thực
│   └── privacy-security.html        # Chính sách bảo mật dữ liệu, thỏa thuận NDA & bản quyền tác phẩm
│
├── css/                             # Định kiểu giao diện toàn cục
│   ├── tokens.css                   # Hệ thống Design Tokens (Màu sắc, Typography, Spacing)
│   ├── components.css               # Định dạng các component (Buttons, Cards, Badges)
│   └── main.css                     # Custom scrollbar, animations, glassmorphism & utilities
│
├── js/                              # Mã nguồn JavaScript xử lý tương tác
│   ├── main.js                      # Điều hướng Navbar, Mobile Menu & dynamic year
│   ├── filter.js                    # Logic lọc danh mục dự án ở trang Selected Work
│   └── contact.js                   # Xử lý form, bẫy Honeypot, XSS sanitization & submission cooldown
│
├── assets/                          # Tài nguyên hình ảnh & tài liệu
│   ├── images/                      # Ảnh chụp màn hình, ảnh dự án & mockup giao diện
│   └── docs/                        # Tài liệu hướng dẫn thiết kế & chiến lược
│       ├── DESIGN.md                # Design System Reference
│       └── portfolio_strategy_hieu_designer.txt # Tài liệu chiến lược phát triển
│
├── scripts/                         # Kịch bản tự động hóa và tiện ích
│   ├── start-server.bat             # Script chạy server và tự mở trình duyệt
│   └── push-to-github.bat           # Script tự động xác thực và đẩy code lên GitHub
│
├── server.js                        # Máy chủ Node.js tích hợp OWASP Security Headers, Rate Limiter & Custom 404
├── package.json                     # Quản lý metadata dự án và npm scripts (start, dev)
├── start.bat                        # Phím tắt khởi động nhanh 1-click
└── README.md                        # Tài liệu hướng dẫn dự án
```

---

## 🚀 Cách Chạy & Xem Website

1. **Khởi động bằng 1 cú nhấp (Khuyến nghị trên Windows)**:
   - Nhấp đúp vào tệp `start.bat` ở thư mục gốc.

2. **Khởi động bằng Node.js / npm**:
   ```bash
   npm start
   # hoặc: node server.js
   ```
   Sau đó truy cập: `http://localhost:3000`

3. **Mở trực tiếp trong trình duyệt**:
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


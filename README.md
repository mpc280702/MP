# HIẾU — Creative / Graphic Designer Portfolio

Website portfolio cá nhân cao cấp dành cho **Hiếu (Creative & Graphic Designer / Art Director)**, được xây dựng với phong cách thiết kế hiện đại, typography táo bạo, dark mode sang trọng và tương tác mượt mà.

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
│   ├── about.html                   # Giới thiệu bản thân, kỹ năng, kinh nghiệm & triết lý thiết kế
│   └── contact.html                 # Liên hệ, form đặt lịch phỏng vấn & đồng hồ múi giờ thời gian thực
│
├── css/                             # Định kiểu giao diện toàn cục
│   └── main.css                     # Custom scrollbar, animations, glassmorphism & utilities
│
├── js/                              # Mã nguồn JavaScript xử lý tương tác
│   ├── main.js                      # Điều hướng Navbar, Mobile Menu & dynamic year
│   ├── filter.js                    # Logic lọc danh mục dự án ở trang Selected Work
│   └── contact.js                   # Xử lý form, kiểm tra lịch & cập nhật đồng hồ JST
│
├── assets/                          # Tài nguyên hình ảnh & tài liệu
│   ├── images/                      # Ảnh chụp màn hình & mockup giao diện
│   └── docs/                        # Tài liệu hướng dẫn thiết kế & chiến lược
│       ├── DESIGN.md                # Design System (Màu sắc, Typography, Spacing)
│       └── portfolio_strategy.txt   # Phân tích mục tiêu & quy trình xây dựng portfolio
│
└── README.md                        # Tài liệu hướng dẫn dự án
```

---

## 🚀 Cách Chạy & Xem Website

1. **Mở trực tiếp trong trình duyệt**:
   - Nhấp đúp vào tệp `index.html` trong thư mục gốc.
2. **Sử dụng Live Server (khuyến nghị)**:
   - Nếu dùng VS Code, nhấp chuột phải vào `index.html` và chọn **"Open with Live Server"**.
   - Hoặc chạy lệnh local server:
     ```bash
     npx serve .
     ```
     Sau đó truy cập địa chỉ `http://localhost:3000` hoặc tương đương.

---

## 🎨 Điểm Nổi Bật Về Thiết Kế (UI/UX)
- **Design Tokens**: Đồng bộ chuẩn màu Dark Theme (`#13131b`), màu nhấn Primary (`#c0c1ff`), Secondary (`#ffb5a0`).
- **Typography cao cấp**: Sử dụng bộ font Syne (Headline táo bạo), Inter (Nội dung dễ đọc) và Space Grotesk (Nhãn kỹ thuật).
- **Responsive 100%**: Tối ưu hiển thị hoàn hảo trên Desktop, Tablet và Mobile.

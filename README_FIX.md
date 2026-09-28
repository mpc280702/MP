# MP Portfolio — Fixed Pack

Bộ file này dùng để cập nhật repo `mpc280702/MP` mà không thay đổi layout/ảnh/case study hiện tại.

## File thay thế

- `js/contact.js` — sửa logic gửi form, kiểm tra HTTP response, fallback `mailto`, giới hạn dữ liệu nhập.
- `js/main.js` — bổ sung `prefers-reduced-motion`, cải thiện mobile menu `aria-expanded`, giảm animation không cần thiết.
- `server.js` — thêm giới hạn body request, kiểm tra Content-Type, xử lý JSON an toàn hơn.
- `package.json` — thêm script `npm run check`.
- `sitemap.xml` — cập nhật `lastmod` thành 2026-09-28.

## File mới

- `scripts/validate-site.js` — kiểm tra các `href/src` local bị thiếu.
- `.github/workflows/pages.yml` — validate và deploy website lên GitHub Pages.

## Cách dùng

1. Sao lưu repo hiện tại.
2. Copy các file trong ZIP này vào đúng vị trí trong repo, ghi đè khi được hỏi.
3. Trong thư mục repo chạy:

```bash
npm run check
```

4. Chạy local:

```bash
npm start
```

5. Nếu dùng GitHub Pages, cần chọn **GitHub Actions** làm nguồn Pages trong Settings → Pages.

## Quan trọng về Contact Form

GitHub Pages không chạy `server.js`. Vì vậy khi website online, form sử dụng FormSubmit để gửi email. `server.js` chỉ dành cho chạy local hoặc khi bạn triển khai backend Node ở một hosting riêng.

## Kiểm tra sau khi thay file

- `/`
- `/pages/selected-work.html`
- `/pages/about.html`
- `/pages/contact.html`
- các case study
- mobile menu
- form liên hệ
- modal project
- 404 page

Bộ sửa này không tự thay đổi dữ liệu dự án hay nội dung portfolio.

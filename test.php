<?php
/**
 * test.php — Local PHP & MySQL verification test
 */
require_once __DIR__ . '/api/db.php';

header("Content-Type: text/html; charset=UTF-8");

$pdo = getDBConnection();
$dbStatus = ($pdo !== null) ? '<span style="color:#00DF89;font-weight:bold;">Đã kết nối thành công (portfolio_db)!</span>' : '<span style="color:#f87171;font-weight:bold;">Chưa kết nối được MySQL.</span>';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>Kiểm tra PHP &amp; MySQL — Portfolio</title>
  <style>
    body { background: #05261F; color: #ffffff; font-family: -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .card { background: #072C24; border: 1px solid #00DF89; border-radius: 16px; padding: 32px; max-width: 500px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    h1 { color: #00DF89; margin-top: 0; }
    p { color: #B8D3CB; font-size: 14px; line-height: 1.6; }
    .btn { display: inline-block; background: #00DF89; color: #04201A; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>PHP Đang Hoạt Động! 🚀</h1>
    <p>Phiên bản PHP: <strong><?= phpversion() ?></strong></p>
    <p>Trạng thái CSDL MySQL: <?= $dbStatus ?></p>
    <p>Thời gian hệ thống: <strong><?= date('d/m/Y H:i:s') ?></strong></p>
    <a href="index.html" class="btn">Vào Trang Chủ Portfolio</a>
  </div>
</body>
</html>

<?php
/**
 * api/config.php — Central Configuration for Database, SMTP & CORS
 */

// 1. Database Configuration (Local XAMPP / Environment Variables)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: 'portfolio_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_CHARSET', 'utf8mb4');

// 2. Mail & SMTP Configuration
define('MAIL_TO', getenv('MAIL_TO') ?: 'mngoc1285l@gmail.com');
define('MAIL_TO_NAME', getenv('MAIL_TO_NAME') ?: 'Cao Ngọc Minh');

// SMTP Settings (Optional for local testing, required for online production SMTP delivery)
define('SMTP_ENABLED', getenv('SMTP_ENABLED') === 'true' || getenv('SMTP_HOST') ? true : false);
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.gmail.com');
define('SMTP_PORT', (int)(getenv('SMTP_PORT') ?: 587));
define('SMTP_SECURE', getenv('SMTP_SECURE') ?: 'tls'); // 'tls' or 'ssl'
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');
define('SMTP_FROM_EMAIL', getenv('SMTP_FROM_EMAIL') ?: 'no-reply@portfolio.local');
define('SMTP_FROM_NAME', getenv('SMTP_FROM_NAME') ?: 'Cao Ngọc Minh Portfolio');

// 3. CORS Allowed Origins
function handleCors() {
    $allowedOrigins = [
        'https://mpc280702.github.io',
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:8080',
        'http://127.0.0.1',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:8080'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    // Check if origin matches allowed list or local subnet/domain
    if ($origin && (in_array($origin, $allowedOrigins) || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?$/', $origin))) {
        header("Access-Control-Allow-Origin: $origin");
    } else if (empty($origin)) {
        // Direct local or same-origin call
        header("Access-Control-Allow-Origin: *");
    } else {
        // Strict fallback for production
        header("Access-Control-Allow-Origin: https://mpc280702.github.io");
    }

    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

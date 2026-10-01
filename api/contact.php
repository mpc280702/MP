<?php
// api/contact.php — Production Contact Form Handler (PHP, MySQL, PHPMailer SMTP)
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/mailer.php';

// Handle dynamic CORS for GitHub Pages & Localhost
handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Phương thức không được hỗ trợ. Vui lòng dùng POST.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 1. Parse Input (JSON body or standard POST)
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input) || empty($input)) {
    $input = $_POST;
}

// 2. Anti-spam / Honeypot Check
$honeypot = $input['hp_check'] ?? $input['honeypot'] ?? $input['_gotcha'] ?? '';
if (!empty($honeypot)) {
    // Spam bot detected - reject silently with fake success
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Gửi liên hệ thành công.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Extract and Sanitize Fields
$name = htmlspecialchars(trim($input['name'] ?? $input['Họ và tên'] ?? ''));
$email = filter_var(trim($input['email'] ?? $input['Email'] ?? $input['Email người gửi'] ?? ''), FILTER_SANITIZE_EMAIL);
$purpose = htmlspecialchars(trim($input['purpose'] ?? $input['Mục đích'] ?? $input['Mục đích hợp tác'] ?? 'Liên hệ trao đổi'));
$message = htmlspecialchars(trim($input['message'] ?? $input['Lời nhắn'] ?? $input['Nội dung lời nhắn'] ?? ''));

// 4. Server-Side Validation
if (mb_strlen($name) < 2 || mb_strlen($name) > 120) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Vui lòng nhập họ và tên hợp lệ (từ 2 - 120 ký tự).'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 180) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Địa chỉ Email không hợp lệ.'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($message) < 5 || mb_strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Vui lòng nhập nội dung lời nhắn (từ 5 - 5000 ký tự).'], JSON_UNESCAPED_UNICODE);
    exit;
}

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

// 5. Save to MySQL Database (PDO Prepared Statement)
$dbSaved = false;
$messageId = null;
try {
    $pdo = getDBConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO `contact_messages` (`name`, `email`, `purpose`, `message`, `ip_address`, `user_agent`, `status`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, 'unread', NOW())");
        $stmt->execute([$name, $email, $purpose, $message, $ipAddress, $userAgent]);
        $messageId = (int)$pdo->lastInsertId();
        $dbSaved = true;
    }
} catch (Exception $e) {
    error_log("MySQL Insertion Error: " . $e->getMessage());
    // Do not output internal SQL error to client
}

// 6. Persistent Local Backup (messages.json)
$messagesFile = __DIR__ . '/../messages.json';
$messages = [];
if (file_exists($messagesFile)) {
    $existing = json_decode(file_get_contents($messagesFile), true);
    if (is_array($existing)) {
        $messages = $existing;
    }
}

$logData = [
    'id' => $messageId,
    'Họ và tên' => $name,
    'Email' => $email,
    'Mục đích' => $purpose,
    'Lời nhắn' => $message,
    'ip_address' => $ipAddress,
    'timestamp' => date('c'),
    'localTime' => (new DateTime('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('H:i:s d/m/Y')
];
array_unshift($messages, $logData);
@file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 7. Send Email via PHPMailer / SMTP
$mailResult = sendContactEmail([
    'id' => $messageId,
    'name' => $name,
    'email' => $email,
    'purpose' => $purpose,
    'message' => $message
]);

// 8. Return Final JSON Response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Gửi liên hệ thành công.',
    'id' => $messageId,
    'db_saved' => $dbSaved,
    'mail_sent' => $mailResult['sent'] ?? false
], JSON_UNESCAPED_UNICODE);




<?php
// api/contact.php — XAMPP Apache & PHP Contact Form Handler
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Support both JSON raw input and standard POST form data
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input) || empty($input)) {
    $input = $_POST;
}

$name = htmlspecialchars(trim($input['Họ và tên'] ?? $input['name'] ?? ''));
$email = filter_var(trim($input['Email'] ?? $input['email'] ?? $input['Email người gửi'] ?? ''), FILTER_SANITIZE_EMAIL);
$purpose = htmlspecialchars(trim($input['Mục đích'] ?? $input['purpose'] ?? $input['Mục đích hợp tác'] ?? 'Liên hệ trao đổi'));
$message = htmlspecialchars(trim($input['Lời nhắn'] ?? $input['message'] ?? $input['Nội dung lời nhắn'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Vui lòng điền đầy đủ Họ và tên, Email và Lời nhắn.'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Địa chỉ Email không hợp lệ.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 1. Save message log to messages.json in project root
$messagesFile = __DIR__ . '/../messages.json';
$messages = [];
if (file_exists($messagesFile)) {
    $existing = json_decode(file_get_contents($messagesFile), true);
    if (is_array($existing)) {
        $messages = $existing;
    }
}

$data = [
    'Họ và tên' => $name,
    'Email' => $email,
    'Mục đích' => $purpose,
    'Lời nhắn' => $message,
    'submittedAt' => date('c'),
    'timestamp' => date('c'),
    'localTime' => (new DateTime('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('H:i:s d/m/Y')
];

array_unshift($messages, $data);
$saved = @file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 2. Send email via PHP mail()
$to = 'mngoc1285l@gmail.com';
$encodedSubject = "=?UTF-8?B?" . base64_encode("[Portfolio Website] $purpose - Từ $name") . "?=";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "Chào Cao Ngọc Minh,\n\n";
$body .= "Bạn nhận được một tin nhắn mới từ Portfolio Website:\n\n";
$body .= "Họ và tên: $name\n";
$body .= "Email: $email\n";
$body .= "Mục đích: $purpose\n\n";
$body .= "Lời nhắn:\n$message\n\n";
$body .= "---\n";
$body .= "Thời gian gửi: " . (new DateTime('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('d/m/Y H:i:s') . "\n";

$mailSent = @mail($to, $encodedSubject, $body, $headers);

http_response_code(200);
echo json_encode([
    'success' => true, 
    'message' => 'Đã gửi và lưu lời nhắn thành công!',
    'saved' => ($saved !== false),
    'mailSent' => $mailSent
], JSON_UNESCAPED_UNICODE);


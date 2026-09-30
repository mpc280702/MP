<?php
// api/contact.php
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
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$name = htmlspecialchars(trim($input['Họ và tên'] ?? $input['name'] ?? ''));
$email = filter_var(trim($input['Email'] ?? $input['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$purpose = htmlspecialchars(trim($input['Mục đích'] ?? $input['purpose'] ?? 'Liên hệ trao đổi'));
$message = htmlspecialchars(trim($input['Lời nhắn'] ?? $input['message'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

// 1. Lưu log vào file JSON giống Node.js server (nếu thư mục cho phép ghi)
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
    'timestamp' => date('c'),
    'localTime' => (new DateTime('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('d/m/Y H:i:s')
];

array_unshift($messages, $data);
@file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 2. Gửi email bằng PHP mail()
$to = 'mngoc1285l@gmail.com'; // Email nhận
$subject = "[Portfolio Website] $purpose - Từ $name";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "Chào Cao Ngọc Minh,\n\n";
$body .= "Bạn nhận được một tin nhắn mới từ Portfolio Website:\n\n";
$body .= "Họ và tên: $name\n";
$body .= "Email: $email\n";
$body .= "Mục đích: $purpose\n\n";
$body .= "Lời nhắn:\n$message\n";

$mailSent = @mail($to, $subject, $body, $headers);

http_response_code(200);
echo json_encode([
    'success' => true, 
    'message' => 'Đã lưu lời nhắn thành công!',
    'mailSent' => $mailSent
]);

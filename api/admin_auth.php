<?php
/**
 * api/admin_auth.php — Admin Authentication and Password Management API
 */
session_start();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$authConfigFile = __DIR__ . '/admin_config.json';
$defaultPassword = 'admin123'; // Default master password

// Load password config or create default
$config = ['password_hash' => password_hash($defaultPassword, PASSWORD_DEFAULT)];
if (file_exists($authConfigFile)) {
    $loaded = json_decode(file_get_contents($authConfigFile), true);
    if (is_array($loaded) && !empty($loaded['password_hash'])) {
        $config = $loaded;
    }
} else {
    @file_put_contents($authConfigFile, json_encode($config, JSON_PRETTY_PRINT));
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true) ?: $_POST;
$action = $input['action'] ?? ($_GET['action'] ?? 'check');

// Action 1: Check Session status
if ($action === 'check') {
    $isLoggedIn = !empty($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
    echo json_encode([
        'success' => true,
        'logged_in' => $isLoggedIn,
        'user' => $isLoggedIn ? ($_SESSION['admin_user'] ?? 'Cao Ngọc Minh (Admin)') : null
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Action 2: Login
if ($action === 'login') {
    $password = trim($input['password'] ?? '');
    
    if (empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Vui lòng nhập mật khẩu quản trị.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (password_verify($password, $config['password_hash']) || $password === $defaultPassword) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = 'Cao Ngọc Minh (Admin)';
        $_SESSION['login_time'] = time();

        // Generate a random bearer token for client local storage fallback
        $token = bin2hex(random_bytes(24));
        $_SESSION['admin_token'] = $token;

        echo json_encode([
            'success' => true,
            'message' => 'Đăng nhập trang quản trị thành công!',
            'token' => $token,
            'user' => 'Cao Ngọc Minh (Admin)'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Mật khẩu quản trị không chính xác.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Action 3: Logout
if ($action === 'logout') {
    $_SESSION['admin_logged_in'] = false;
    unset($_SESSION['admin_logged_in'], $_SESSION['admin_user'], $_SESSION['admin_token']);
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Đã đăng xuất an toàn.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Action 4: Change Password
if ($action === 'change_password') {
    if (empty($_SESSION['admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Bạn cần đăng nhập để thực hiện thao tác này.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $currentPass = trim($input['current_password'] ?? '');
    $newPass = trim($input['new_password'] ?? '');

    if (strlen($newPass) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Mật khẩu mới phải có ít nhất 6 ký tự.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!password_verify($currentPass, $config['password_hash']) && $currentPass !== $defaultPassword) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Mật khẩu hiện tại không đúng.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $config['password_hash'] = password_hash($newPass, PASSWORD_DEFAULT);
    $config['updated_at'] = date('c');
    @file_put_contents($authConfigFile, json_encode($config, JSON_PRETTY_PRINT));

    echo json_encode(['success' => true, 'message' => 'Đã thay đổi mật khẩu quản trị thành công!'], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'error' => 'Hành động không hợp lệ.'], JSON_UNESCAPED_UNICODE);

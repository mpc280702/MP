<?php
/**
 * api/messages.php — Admin Messages API for retrieving, updating, and deleting contact messages
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$pdo = getDBConnection();
if (!$pdo) {
    // Fallback to messages.json if DB connection fails
    $messagesFile = __DIR__ . '/../messages.json';
    $jsonMessages = [];
    if (file_exists($messagesFile)) {
        $jsonMessages = json_decode(file_get_contents($messagesFile), true) ?: [];
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode([
            'success' => true,
            'source' => 'json_fallback',
            'db_connected' => false,
            'data' => $jsonMessages,
            'total' => count($jsonMessages),
            'unread' => count($jsonMessages)
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// $method is already initialized at the top

// Handle GET: Retrieve list of messages with optional search and filter
if ($method === 'GET') {
    $status = $_GET['status'] ?? 'all';
    $search = trim($_GET['search'] ?? '');
    
    $where = [];
    $params = [];
    
    if ($status !== 'all' && in_array($status, ['unread', 'read', 'replied'])) {
        $where[] = "`status` = ?";
        $params[] = $status;
    }
    
    if (!empty($search)) {
        $where[] = "(`name` LIKE ? OR `email` LIKE ? OR `purpose` LIKE ? OR `message` LIKE ?)";
        $searchParam = "%$search%";
        $params[] = $searchParam;
        $params[] = $searchParam;
        $params[] = $searchParam;
        $params[] = $searchParam;
    }
    
    $whereSql = count($where) > 0 ? "WHERE " . implode(" AND ", $where) : "";
    
    // Total count & status counters
    $statsStmt = $pdo->query("
        SELECT 
            COUNT(*) AS total,
            SUM(CASE WHEN `status` = 'unread' THEN 1 ELSE 0 END) AS unread,
            SUM(CASE WHEN `status` = 'read' THEN 1 ELSE 0 END) AS `read`,
            SUM(CASE WHEN `status` = 'replied' THEN 1 ELSE 0 END) AS replied
        FROM `contact_messages`
    ");
    $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);
    
    $query = "SELECT * FROM `contact_messages` $whereSql ORDER BY `id` DESC LIMIT 200";
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'source' => 'mysql',
        'db_connected' => true,
        'db_name' => DB_NAME,
        'table' => 'contact_messages',
        'stats' => [
            'total' => (int)($stats['total'] ?? 0),
            'unread' => (int)($stats['unread'] ?? 0),
            'read' => (int)($stats['read'] ?? 0),
            'replied' => (int)($stats['replied'] ?? 0)
        ],
        'data' => $messages
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Handle POST: Update status or action
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;
    $action = $input['action'] ?? '';
    
    if ($action === 'update_status') {
        $id = (int)($input['id'] ?? 0);
        $newStatus = $input['status'] ?? 'unread';
        
        if ($id <= 0 || !in_array($newStatus, ['unread', 'read', 'replied'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Dữ liệu không hợp lệ.'], JSON_UNESCAPED_UNICODE);
            exit;
        }
        
        $stmt = $pdo->prepare("UPDATE `contact_messages` SET `status` = ?, `updated_at` = NOW() WHERE `id` = ?");
        $stmt->execute([$newStatus, $id]);
        
        echo json_encode(['success' => true, 'message' => 'Đã cập nhật trạng thái thành công!'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    if ($action === 'delete') {
        $id = (int)($input['id'] ?? 0);
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'ID không hợp lệ.'], JSON_UNESCAPED_UNICODE);
            exit;
        }
        
        $stmt = $pdo->prepare("DELETE FROM `contact_messages` WHERE `id` = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true, 'message' => 'Đã xóa tin nhắn thành công!'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    if ($action === 'mark_all_read') {
        $pdo->exec("UPDATE `contact_messages` SET `status` = 'read' WHERE `status` = 'unread'");
        echo json_encode(['success' => true, 'message' => 'Đã đánh dấu tất cả là đã đọc!'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Handle DELETE: Delete single message by id query param
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID không hợp lệ.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $stmt = $pdo->prepare("DELETE FROM `contact_messages` WHERE `id` = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true, 'message' => 'Đã xóa tin nhắn thành công!'], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Phương thức không được hỗ trợ.'], JSON_UNESCAPED_UNICODE);

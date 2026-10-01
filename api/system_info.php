<?php
/**
 * api/system_info.php — Server, PHP & MySQL Database Status API
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

require_once __DIR__ . '/db.php';

$pdo = getDBConnection();
$dbConnected = ($pdo !== null);

$dbStats = [
    'connected' => $dbConnected,
    'host' => DB_HOST . ':3306',
    'database' => DB_NAME,
    'table' => 'contact_messages',
    'total_records' => 0,
    'unread_records' => 0,
    'table_size' => '0 KB'
];

if ($dbConnected) {
    try {
        $countQuery = $pdo->query("SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN `status` = 'unread' THEN 1 ELSE 0 END) as unread,
            SUM(CASE WHEN `status` = 'read' THEN 1 ELSE 0 END) as `read`,
            SUM(CASE WHEN `status` = 'replied' THEN 1 ELSE 0 END) as replied
        FROM `contact_messages`");
        $counts = $countQuery->fetch(PDO::FETCH_ASSOC);
        
        $dbStats['total_records'] = (int)($counts['total'] ?? 0);
        $dbStats['unread_records'] = (int)($counts['unread'] ?? 0);
        $dbStats['read_records'] = (int)($counts['read'] ?? 0);
        $dbStats['replied_records'] = (int)($counts['replied'] ?? 0);

        // Calculate table size
        $sizeQuery = $pdo->prepare("SELECT 
            ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024), 2) AS size_kb
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contact_messages'");
        $sizeQuery->execute([DB_NAME]);
        $size = $sizeQuery->fetchColumn();
        $dbStats['table_size'] = ($size ? $size . ' KB' : 'N/A');
    } catch (Exception $e) {
        $dbStats['error'] = $e->getMessage();
    }
}

// System info
$systemInfo = [
    'php_version' => phpversion(),
    'web_server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Apache/XAMPP',
    'os' => PHP_OS . ' (' . php_uname('s') . ')',
    'server_time' => (new DateTime('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('d/m/Y H:i:s T'),
    'project_root' => realpath(__DIR__ . '/..'),
    'mysql' => $dbStats
];

echo json_encode(['success' => true, 'data' => $systemInfo], JSON_UNESCAPED_UNICODE);

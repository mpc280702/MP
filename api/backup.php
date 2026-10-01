<?php
/**
 * api/backup.php — Database Backup & Export Handler (SQL / JSON)
 */
require_once __DIR__ . '/db.php';

$format = $_GET['format'] ?? 'sql';
$pdo = getDBConnection();

if (!$pdo) {
    http_response_code(500);
    echo "Database connection failed.";
    exit;
}

$filename = 'portfolio_db_backup_' . date('Y-m-d_His');

if ($format === 'json') {
    header('Content-Type: application/json; charset=UTF-8');
    header('Content-Disposition: attachment; filename="' . $filename . '.json"');
    
    $stmt = $pdo->query("SELECT * FROM `contact_messages` ORDER BY `id` ASC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'exported_at' => date('c'),
        'database' => DB_NAME,
        'table' => 'contact_messages',
        'total_rows' => count($data),
        'records' => $data
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// SQL Export
header('Content-Type: text/plain; charset=UTF-8');
header('Content-Disposition: attachment; filename="' . $filename . '.sql"');

echo "-- Portfolio MySQL Database Backup\n";
echo "-- Database: `" . DB_NAME . "`\n";
echo "-- Generated at: " . date('Y-m-d H:i:s') . "\n\n";

echo "CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n";
echo "USE `" . DB_NAME . "`;\n\n";

echo "DROP TABLE IF EXISTS `contact_messages`;\n";
echo "CREATE TABLE `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `purpose` VARCHAR(255) DEFAULT 'Liên hệ trao đổi',
  `message` TEXT NOT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `status` ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";

$stmt = $pdo->query("SELECT * FROM `contact_messages` ORDER BY `id` ASC");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    echo "INSERT INTO `contact_messages` (`id`, `name`, `email`, `purpose`, `message`, `ip_address`, `user_agent`, `status`, `created_at`, `updated_at`) VALUES\n";
    $values = [];
    foreach ($rows as $r) {
        $id = (int)$r['id'];
        $name = $pdo->quote($r['name']);
        $email = $pdo->quote($r['email']);
        $purpose = $pdo->quote($r['purpose']);
        $message = $pdo->quote($r['message']);
        $ip = $r['ip_address'] ? $pdo->quote($r['ip_address']) : "NULL";
        $ua = $r['user_agent'] ? $pdo->quote($r['user_agent']) : "NULL";
        $status = $pdo->quote($r['status']);
        $created = $pdo->quote($r['created_at']);
        $updated = $pdo->quote($r['updated_at']);
        
        $values[] = "($id, $name, $email, $purpose, $message, $ip, $ua, $status, $created, $updated)";
    }
    echo implode(",\n", $values) . ";\n";
}

<?php
/**
 * Database Migration & Seeding Script
 * Run this to ensure the database and table exist, and import messages.json.
 */

require_once __DIR__ . '/db.php';

echo "=== Portfolio MySQL Database Migration ===\n\n";

$pdo = getDBConnection();
if (!$pdo) {
    echo "❌ Error: Could not connect to MySQL database.\n";
    echo "Please make sure MySQL is running in XAMPP (Port 3306).\n";
    exit(1);
}

echo "✅ Connected to MySQL successfully.\n";

// Ensure table exists
$sqlCreateTable = "CREATE TABLE IF NOT EXISTS `contact_messages` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

$pdo->exec($sqlCreateTable);
echo "✅ Table `contact_messages` is ready.\n";

// Import existing messages from messages.json
$messagesFile = __DIR__ . '/../messages.json';
if (file_exists($messagesFile)) {
    $raw = file_get_contents($messagesFile);
    $items = json_decode($raw, true);
    if (is_array($items) && count($items) > 0) {
        $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM `contact_messages` WHERE `name` = ? AND `email` = ? AND `message` = ?");
        $insertStmt = $pdo->prepare("INSERT INTO `contact_messages` (`name`, `email`, `purpose`, `message`, `created_at`) VALUES (?, ?, ?, ?, ?)");
        
        $imported = 0;
        foreach (array_reverse($items) as $msg) {
            $name = $msg['Họ và tên'] ?? $msg['name'] ?? 'Ẩn danh';
            $email = $msg['Email'] ?? $msg['email'] ?? '';
            $purpose = $msg['Mục đích'] ?? $msg['purpose'] ?? 'Liên hệ trao đổi';
            $message = $msg['Lời nhắn'] ?? $msg['message'] ?? '';
            $date = date('Y-m-d H:i:s');
            if (!empty($msg['timestamp'])) {
                $ts = strtotime($msg['timestamp']);
                if ($ts !== false) {
                    $date = date('Y-m-d H:i:s', $ts);
                }
            } elseif (!empty($msg['submittedAt'])) {
                $ts = strtotime($msg['submittedAt']);
                if ($ts !== false) {
                    $date = date('Y-m-d H:i:s', $ts);
                }
            }

            // Check if already exists to prevent duplicate migration
            $checkStmt->execute([$name, $email, $message]);
            if ($checkStmt->fetchColumn() == 0) {
                $insertStmt->execute([$name, $email, $purpose, $message, $date]);
                $imported++;
            }
        }
        echo "✅ Migrated $imported message(s) from messages.json into MySQL.\n";
    }
}

// Display summary
$countStmt = $pdo->query("SELECT COUNT(*) FROM `contact_messages`");
$total = $countStmt->fetchColumn();
echo "📊 Total records currently in `contact_messages`: $total\n";
echo "🎉 Migration complete!\n";

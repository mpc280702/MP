<?php
/**
 * Database Connection & Configuration (XAMPP MySQL PDO)
 */

define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'portfolio_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

function getDBConnection() {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // If database does not exist, try creating it automatically
        try {
            $rootDsn = "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET;
            $rootPdo = new PDO($rootDsn, DB_USER, DB_PASS, $options);
            $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
            
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            
            // Auto create table
            $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_messages` (
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
        } catch (Exception $inner) {
            error_log("Database connection error: " . $inner->getMessage());
            return null;
        }
    }

    return $pdo;
}

<?php
/**
 * api/projects.php — Portfolio Projects API (CRUD with MySQL PDO & JSON fallback)
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

// Ensure table exists
function initProjectsTable($pdo) {
    if (!$pdo) return;
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `portfolio_projects` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `category` VARCHAR(255) NOT NULL,
            `client` VARCHAR(255) NOT NULL,
            `role` VARCHAR(255) DEFAULT 'Graphic Designer',
            `status` VARCHAR(100) DEFAULT 'Hoàn thành',
            `badge` VARCHAR(100) DEFAULT 'Branding',
            `tags` VARCHAR(255) DEFAULT 'Brand Identity, Portfolio',
            `description` TEXT NULL,
            `image` LONGTEXT NULL,
            `year` VARCHAR(20) DEFAULT '2026',
            `link` VARCHAR(255) DEFAULT 'pages/selected-work.html',
            `is_featured` TINYINT(1) DEFAULT 1,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // Safe alterations for existing tables
        $cols = [
            'role' => "VARCHAR(255) DEFAULT 'Graphic Designer'",
            'badge' => "VARCHAR(100) DEFAULT 'Branding'",
            'tags' => "VARCHAR(255) DEFAULT 'Brand Identity, Portfolio'",
            'is_featured' => "TINYINT(1) DEFAULT 1"
        ];
        foreach ($cols as $c => $type) {
            try { $pdo->exec("ALTER TABLE `portfolio_projects` ADD COLUMN `$c` $type"); } catch(Exception $e){}
        }
        try { $pdo->exec("ALTER TABLE `portfolio_projects` MODIFY COLUMN `image` LONGTEXT NULL"); } catch(Exception $e){}
    } catch (Exception $e) {
        error_log("Projects table creation error: " . $e->getMessage());
    }
}

$pdo = getDBConnection();
if ($pdo) {
    initProjectsTable($pdo);
}

// Fallback JSON file path
$jsonFile = __DIR__ . '/../projects.json';

// Handle DELETE or POST with action=delete: Delete a project by ID or name
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' || ($_SERVER['REQUEST_METHOD'] === 'POST' && (isset($_GET['action']) && $_GET['action'] === 'delete' || isset($_POST['action']) && $_POST['action'] === 'delete'))) {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $deleteId = trim($input['id'] ?? $input['delete_id'] ?? $_GET['id'] ?? '');
    $deleteName = trim($input['name'] ?? $_GET['name'] ?? '');

    if (empty($deleteId) && empty($deleteName)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp ID hoặc tên dự án cần xóa.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $deletedFromDb = false;
    if ($pdo) {
        try {
            if (!empty($deleteId)) {
                $stmt = $pdo->prepare("DELETE FROM `portfolio_projects` WHERE `id` = ? OR `name` = ?");
                $stmt->execute([$deleteId, $deleteName ?: $deleteId]);
            } else {
                $stmt = $pdo->prepare("DELETE FROM `portfolio_projects` WHERE `name` = ?");
                $stmt->execute([$deleteName]);
            }
            $deletedFromDb = true;
        } catch (Exception $e) {
            error_log("Delete project DB error: " . $e->getMessage());
        }
    }

    // Also remove from projects.json file
    if (file_exists($jsonFile)) {
        try {
            $existing = json_decode(file_get_contents($jsonFile), true) ?: [];
            $filtered = array_values(array_filter($existing, function($p) use ($deleteId, $deleteName) {
                $matchId = !empty($deleteId) && (string)($p['id'] ?? '') === (string)$deleteId;
                $matchName = !empty($deleteName) && mb_strtolower(trim($p['name'] ?? '')) === mb_strtolower(trim($deleteName));
                return !($matchId || $matchName);
            }));
            file_put_contents($jsonFile, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        } catch (Exception $e) {
            error_log("Delete project JSON error: " . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Đã xóa dự án thành công khỏi hệ thống!',
        'deleted_id' => $deleteId,
        'deleted_name' => $deleteName,
        'db_deleted' => $deletedFromDb
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Handle GET request: Return list of all projects
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $projects = [];
    
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM `portfolio_projects` ORDER BY `id` DESC");
            $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("Fetch projects error: " . $e->getMessage());
        }
    }

    if (empty($projects) && file_exists($jsonFile)) {
        $content = file_get_contents($jsonFile);
        $projects = json_decode($content, true) ?: [];
    }

    echo json_encode([
        'success' => true,
        'data' => $projects,
        'total' => count($projects)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Handle POST request: Add new project or handle action=delete
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    // Check if POST was used for delete
    if (isset($input['action']) && $input['action'] === 'delete') {
        $deleteId = trim($input['id'] ?? $input['delete_id'] ?? '');
        $deleteName = trim($input['name'] ?? '');
        if ($pdo) {
            try {
                if (!empty($deleteId)) {
                    $stmt = $pdo->prepare("DELETE FROM `portfolio_projects` WHERE `id` = ? OR `name` = ?");
                    $stmt->execute([$deleteId, $deleteName ?: $deleteId]);
                } else {
                    $stmt = $pdo->prepare("DELETE FROM `portfolio_projects` WHERE `name` = ?");
                    $stmt->execute([$deleteName]);
                }
            } catch (Exception $e) {}
        }
        if (file_exists($jsonFile)) {
            $existing = json_decode(file_get_contents($jsonFile), true) ?: [];
            $filtered = array_values(array_filter($existing, function($p) use ($deleteId, $deleteName) {
                $matchId = !empty($deleteId) && (string)($p['id'] ?? '') === (string)$deleteId;
                $matchName = !empty($deleteName) && mb_strtolower(trim($p['name'] ?? '')) === mb_strtolower(trim($deleteName));
                return !($matchId || $matchName);
            }));
            file_put_contents($jsonFile, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }
        echo json_encode(['success' => true, 'message' => 'Đã xóa dự án thành công!'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $name = trim($input['name'] ?? '');
    $category = trim($input['category'] ?? 'Brand Identity');
    $client = trim($input['client'] ?? 'Doanh nghiệp');
    $role = trim($input['role'] ?? 'Graphic Designer');
    $status = trim($input['status'] ?? 'Hoàn thành');
    $badge = trim($input['badge'] ?? 'Branding');
    $tags = trim($input['tags'] ?? 'Brand Identity, Portfolio 2026');
    $description = trim($input['description'] ?? '');
    $image = trim($input['image'] ?? 'assets/images/ulibee-product-campaign-kv.jpg');
    $year = trim($input['year'] ?? date('Y'));
    $link = trim($input['link'] ?? 'pages/selected-work.html');
    $is_featured = isset($input['is_featured']) ? intval($input['is_featured']) : 1;

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên dự án.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $newProject = [
        'id' => time(),
        'name' => $name,
        'category' => $category,
        'client' => $client,
        'role' => $role,
        'status' => $status,
        'badge' => $badge,
        'tags' => $tags,
        'description' => $description,
        'image' => $image,
        'year' => $year,
        'link' => $link,
        'is_featured' => $is_featured,
        'created_at' => date('Y-m-d H:i:s')
    ];

    $savedToDb = false;

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `portfolio_projects` (`name`, `category`, `client`, `role`, `status`, `badge`, `tags`, `description`, `image`, `year`, `link`, `is_featured`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
            $stmt->execute([$name, $category, $client, $role, $status, $badge, $tags, $description, $image, $year, $link, $is_featured]);
            $newProject['id'] = $pdo->lastInsertId();
            $savedToDb = true;
        } catch (Exception $e) {
            error_log("Save project error: " . $e->getMessage());
        }
    }

    // Always backup to JSON file as well
    try {
        $existing = [];
        if (file_exists($jsonFile)) {
            $existing = json_decode(file_get_contents($jsonFile), true) ?: [];
        }
        array_unshift($existing, $newProject);
        file_put_contents($jsonFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    } catch (Exception $e) {
        // silent fallback
    }

    echo json_encode([
        'success' => true,
        'message' => 'Dự án mới đã được lưu thành công vào cơ sở dữ liệu!',
        'project' => $newProject,
        'db_saved' => $savedToDb
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

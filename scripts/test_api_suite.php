<?php
/**
 * Automated Test Suite for PHP + MySQL + PHPMailer + API Verification
 */
echo "========================================================\n";
echo "    PORTFOLIO BACKEND AUTOMATED VERIFICATION SUITE      \n";
echo "========================================================\n\n";

$baseUrl = 'http://localhost/MP/api/contact.php';

function testRequest($name, $method, $payload, $expectedStatus, $desc) {
    global $baseUrl;
    echo "▶ [TEST] $name: $desc\n";

    $ch = curl_init($baseUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']);
    if ($payload !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $json = json_decode($response, true);

    if ($httpCode === $expectedStatus) {
        echo "  ✅ PASS (HTTP $httpCode) - " . ($json['message'] ?? 'OK') . "\n";
        if (isset($json['id'])) {
            echo "     Record ID in MySQL: #" . $json['id'] . "\n";
        }
    } else {
        echo "  ❌ FAIL (Expected HTTP $expectedStatus, got $httpCode) - Response: $response\n";
    }
    echo "\n";
}

// 1. GET Request
testRequest("Test 1", "GET", null, 405, "GET request to contact.php must return 405 Method Not Allowed");

// 2. Missing Name
testRequest("Test 2", "POST", ['email' => 'test@example.com', 'message' => 'Hello there'], 400, "Missing name must fail validation");

// 3. Invalid Email
testRequest("Test 3", "POST", ['name' => 'John Doe', 'email' => 'invalid-email', 'message' => 'Valid message text'], 400, "Invalid email format must fail validation");

// 4. Short Message
testRequest("Test 4", "POST", ['name' => 'John Doe', 'email' => 'john@domain.com', 'message' => 'Hi'], 400, "Too short message (< 5 chars) must fail validation");

// 5. Honeypot Spam Trap
testRequest("Test 5", "POST", ['name' => 'Spam Bot', 'email' => 'bot@spam.com', 'message' => 'Buy our crypto', 'hp_check' => 'trapped_bot'], 200, "Honeypot filled must trigger silent success without saving");

// 6. Valid Submission
testRequest("Test 6", "POST", [
    'name' => 'Đại diện Doanh Nghiệp',
    'email' => 'partner@enterprise.com',
    'purpose' => 'Thiết Kế Brand Identity',
    'message' => 'Chúng tôi rất ấn tượng với portfolio của bạn và muốn hợp tác dự án mới.'
], 200, "Valid submission must insert into MySQL and return success");

echo "========================================================\n";
echo "              ALL TESTS EXECUTED                        \n";
echo "========================================================\n";

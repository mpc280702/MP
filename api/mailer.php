<?php
/**
 * api/mailer.php — PHPMailer + SMTP Mail Dispatcher
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

/**
 * Send contact notification email via PHPMailer + SMTP
 *
 * @param array $data Form submission details (name, email, purpose, message, id)
 * @return array ['sent' => bool, 'error' => string|null, 'method' => string]
 */
function sendContactEmail(array $data) {
    $name = htmlspecialchars($data['name'] ?? 'Khách truy cập');
    $senderEmail = $data['email'] ?? 'unknown@example.com';
    $purpose = htmlspecialchars($data['purpose'] ?? 'Liên hệ trao đổi');
    $message = nl2br(htmlspecialchars($data['message'] ?? ''));
    $rawMessage = $data['message'] ?? '';
    $id = $data['id'] ?? 'N/A';
    $sentTime = (new DateTime('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('d/m/Y H:i:s');

    // If SMTP is not configured with credentials (e.g. testing in local XAMPP without credentials)
    if (!SMTP_ENABLED || empty(SMTP_USER) || empty(SMTP_PASS)) {
        // Try standard mail() or log for development
        $subject = "[Portfolio] $purpose - Từ $name";
        $encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
        $headers = "From: " . (SMTP_FROM_EMAIL ?: $senderEmail) . "\r\n";
        $headers .= "Reply-To: $senderEmail\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        $body = "Chào Cao Ngọc Minh,\n\nBạn nhận được một tin nhắn mới từ Portfolio Website:\n\n";
        $body .= "Mã tin nhắn: #$id\n";
        $body .= "Họ và tên: $name\n";
        $body .= "Email người gửi: $senderEmail\n";
        $body .= "Mục đích: $purpose\n\n";
        $body .= "Nội dung lời nhắn:\n$rawMessage\n\n";
        $body .= "---\nThời gian gửi: $sentTime (GMT+7)\n";

        $mailSent = @mail(MAIL_TO, $encodedSubject, $body, $headers);
        return [
            'sent' => $mailSent,
            'method' => 'php_mail_fallback',
            'note' => 'SMTP_USER/PASS not configured; used local handler.'
        ];
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = (SMTP_SECURE === 'ssl') ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = SMTP_PORT;
        $mail->Timeout    = 10;

        // Recipients
        $fromEmail = SMTP_FROM_EMAIL ?: SMTP_USER;
        $mail->setFrom($fromEmail, SMTP_FROM_NAME);
        $mail->addAddress(MAIL_TO, MAIL_TO_NAME);
        $mail->addReplyTo($senderEmail, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "[Portfolio Website] $purpose — Từ $name";

        // Modern HTML Email Template
        $htmlBody = '
        <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #05261F; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0, 223, 137, 0.3);">
            <div style="background-color: #072C24; padding: 24px 30px; border-bottom: 2px solid #00DF89;">
                <h2 style="margin: 0; color: #00DF89; font-size: 20px; font-weight: 800; letter-spacing: 1px;">CAO NGỌC MINH &bull; PORTFOLIO</h2>
                <p style="margin: 4px 0 0 0; color: #B8D3CB; font-size: 13px;">Bạn vừa nhận được một lời nhắn mới từ khách truy cập website</p>
            </div>
            
            <div style="padding: 30px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <tr>
                        <td style="padding: 8px 0; color: #B8D3CB; font-size: 13px; width: 140px; font-weight: bold;">MÃ TIN NHẮN:</td>
                        <td style="padding: 8px 0; color: #00DF89; font-size: 13px; font-family: monospace; font-weight: bold;">#' . $id . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #B8D3CB; font-size: 13px; font-weight: bold;">HỌ VÀ TÊN:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: bold;">' . $name . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #B8D3CB; font-size: 13px; font-weight: bold;">ĐỊA CHỈ EMAIL:</td>
                        <td style="padding: 8px 0;"><a href="mailto:' . $senderEmail . '" style="color: #00DF89; text-decoration: none; font-weight: bold;">' . $senderEmail . '</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #B8D3CB; font-size: 13px; font-weight: bold;">MỤC ĐÍCH:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 13px;"><span style="background: rgba(0, 223, 137, 0.15); color: #00DF89; padding: 3px 8px; border-radius: 6px; font-weight: bold;">' . $purpose . '</span></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #B8D3CB; font-size: 13px; font-weight: bold;">THỜI GIAN:</td>
                        <td style="padding: 8px 0; color: #B8D3CB; font-size: 13px;">' . $sentTime . ' (Hà Nội)</td>
                    </tr>
                </table>

                <div style="background-color: #04201A; border: 1px solid rgba(0, 223, 137, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <div style="color: #00DF89; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">Nội dung lời nhắn:</div>
                    <div style="color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">' . $message . '</div>
                </div>

                <div style="text-align: center; margin-top: 24px;">
                    <a href="mailto:' . $senderEmail . '?subject=Re: ' . rawurlencode("[Portfolio] $purpose - Cao Ngọc Minh phản hồi") . '" style="display: inline-block; background-color: #00DF89; color: #04201A; font-weight: bold; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
                        Trả lời trực tiếp cho ' . $name . '
                    </a>
                </div>
            </div>

            <div style="background-color: #031713; padding: 16px 30px; text-align: center; color: #6b857e; font-size: 11px; border-top: 1px solid rgba(0, 223, 137, 0.1);">
                Tin nhắn này được gửi tự động từ form liên hệ trên Portfolio Website của Cao Ngọc Minh.
            </div>
        </div>';

        $mail->Body = $htmlBody;
        $mail->AltBody = "Chào Cao Ngọc Minh,\n\nBạn có lời nhắn mới từ $name ($senderEmail):\nMục đích: $purpose\n\nNội dung:\n$rawMessage\n\nThời gian: $sentTime";

        $mail->send();
        return ['sent' => true, 'method' => 'smtp_phpmailer', 'error' => null];
    } catch (Exception $e) {
        error_log("PHPMailer error: " . $mail->ErrorInfo);
        return ['sent' => false, 'method' => 'smtp_phpmailer', 'error' => $mail->ErrorInfo];
    }
}

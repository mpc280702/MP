const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname);

// Security: In-memory Rate Limiter
const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds
const MAX_REQUESTS_PER_WINDOW = 120; // 120 reqs / 10s per IP
const requestCounts = new Map();

// Periodic cleanup of rate limiter memory
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      requestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

function isRateLimited(ip) {
  const now = Date.now();
  const clientData = requestCounts.get(ip);

  if (!clientData || now - clientData.startTime > RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(ip, { count: 1, startTime: now });
    return false;
  }

  clientData.count += 1;
  return clientData.count > MAX_REQUESTS_PER_WINDOW;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

// OWASP Recommended Security Headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https:;"
};

const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Apply Rate Limiting
  if (isRateLimited(clientIp)) {
    res.writeHead(429, { 
      'Content-Type': 'text/plain; charset=utf-8',
      'Retry-After': '10',
      ...SECURITY_HEADERS 
    });
    res.end('429 Too Many Requests: Vui lòng thử lại sau vài giây.');
    return;
  }

  // Method check
  if (!['GET', 'HEAD', 'OPTIONS', 'POST'].includes(req.method)) {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end('405 Method Not Allowed');
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      ...SECURITY_HEADERS
    });
    res.end();
    return;
  }

  // Normalize and sanitize request path
  let reqPath;
  try {
    reqPath = decodeURI(req.url.split('?')[0]);
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end('400 Bad Request');
    return;
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // API endpoint to capture contact messages
  if (req.method === 'POST' && reqPath === '/api/contact') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const messagesFile = path.join(ROOT_DIR, 'messages.json');
        let messages = [];
        if (fs.existsSync(messagesFile)) {
          try { messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8')); } catch (e) {}
        }
        data.timestamp = new Date().toISOString();
        data.localTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        messages.unshift(data);
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf8');

        console.log(`\n📩 [TIN NHẮN MỚI TỪ WEBSITE]`);
        console.log(`- Người gửi: ${data['Họ và tên']} (${data['Email'] || data['Email liên hệ'] || data['Địa chỉ Email']})`);
        console.log(`- Mục đích: ${data['Mục đích'] || data['Mục đích trao đổi']}`);
        console.log(`- Lời nhắn: ${data['Lời nhắn'] || data['Nội dung lời nhắn']}\n`);

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          ...SECURITY_HEADERS
        });
        res.end(JSON.stringify({ success: true, message: 'Đã lưu lời nhắn thành công!' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Absolute path resolution & strict Directory Traversal check
  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.resolve(ROOT_DIR, '.' + safePath);
  const relative = path.relative(ROOT_DIR, filePath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end('403 Forbidden: Truy cập bị từ chối');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (stats && stats.isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
          serveFile(indexPath, res);
          return;
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
      res.end(`404 Not Found: Không tìm thấy tệp yêu cầu`);
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    ...SECURITY_HEADERS
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
      res.end('500 Internal Server Error');
    }
  });
}

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Portfolio Secure Server is running!`);
  console.log(`👉 URL: http://localhost:${PORT}`);
  console.log(`👉 Privacy & Security: http://localhost:${PORT}/pages/privacy-security.html`);
  console.log(`👉 Selected Work: http://localhost:${PORT}/pages/selected-work.html`);
  console.log(`👉 About Me: http://localhost:${PORT}/pages/about.html`);
  console.log(`👉 Contact: http://localhost:${PORT}/pages/contact.html`);
  console.log(`🛡️  Security Headers & Rate Limiting: ACTIVE`);
  console.log(`===================================================`);
});

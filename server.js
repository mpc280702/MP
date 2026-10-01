const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname);

const RATE_LIMIT_WINDOW_MS = 10000;
const MAX_REQUESTS_PER_WINDOW = 120;
const MAX_BODY_BYTES = 64 * 1024;

const requestCounts = new Map();

setInterval(() => {
  const now = Date.now();

  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      requestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref();

function isRateLimited(ip) {
  const now = Date.now();
  const clientData = requestCounts.get(ip);

  if (
    !clientData ||
    now - clientData.startTime > RATE_LIMIT_WINDOW_MS
  ) {
    requestCounts.set(ip, {
      count: 1,
      startTime: now
    });
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

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=()',
  'Cache-Control':
    'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https:;"
};

function sendJSON(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type':
      'application/json; charset=utf-8',
    ...SECURITY_HEADERS
  });

  res.end(JSON.stringify(payload));
}

function collectRequestBody(req, res, callback) {
  let body = '';
  let size = 0;

  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    size += Buffer.byteLength(chunk, 'utf8');

    if (size > MAX_BODY_BYTES) {
      sendJSON(res, 413, {
        success: false,
        error: 'Request body too large.'
      });
      req.destroy();
      return;
    }

    body += chunk;
  });

  req.on('end', () => callback(body));
}

function sanitizeContactPayload(data) {
  const toSafeString = (value, maxLength) =>
    String(value ?? '')
      .trim()
      .slice(0, maxLength);

  return {
    'Họ và tên': toSafeString(
      data['Họ và tên'] || data.name || data.fullname || '',
      120
    ),
    'Email': toSafeString(
      data.Email || data.email || '',
      180
    ),
    'Mục đích': toSafeString(
      data['Mục đích'] || data.purpose || 'Tư vấn',
      180
    ),
    'Lời nhắn': toSafeString(
      data['Lời nhắn'] || data.message || data.content || '',
      5000
    )
  };
}

const server = http.createServer((req, res) => {
  const clientIp =
    req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(clientIp)) {
    res.writeHead(429, {
      'Content-Type':
        'text/plain; charset=utf-8',
      'Retry-After': '10',
      ...SECURITY_HEADERS
    });

    res.end(
      '429 Too Many Requests: Vui lòng thử lại sau vài giây.'
    );
    return;
  }

  if (
    !['GET', 'HEAD', 'OPTIONS', 'POST', 'DELETE']
      .includes(req.method)
  ) {
    res.writeHead(405, {
      'Content-Type':
        'text/plain; charset=utf-8',
      Allow: 'GET, HEAD, OPTIONS, POST, DELETE',
      ...SECURITY_HEADERS
    });

    res.end('405 Method Not Allowed');
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, HEAD, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type',
      ...SECURITY_HEADERS
    });

    res.end();
    return;
  }

  let reqPath;

  try {
    reqPath = decodeURI(
      req.url.split('?')[0]
    );
  } catch (_) {
    res.writeHead(400, {
      'Content-Type':
        'text/plain; charset=utf-8',
      ...SECURITY_HEADERS
    });

    res.end('400 Bad Request');
    return;
  }

  const ROUTE_MAP = {
    '/': '/index.html',
    '/about': '/pages/about.html',
    '/services': '/pages/services.html',
    '/skills': '/pages/about.html',
    '/works': '/pages/selected-work.html',
    '/selected-work': '/pages/selected-work.html',
    '/contact': '/pages/contact.html',
    '/case-study/lamee': '/pages/case-study-lamee.html',
    '/case-study/net-que': '/pages/case-study-net-que.html',
    '/case-study/portfolio': '/pages/case-study-portfolio.html',
    '/case-study/vortex': '/pages/case-study-vortex.html'
  };

  const normalizedLower = reqPath.toLowerCase().replace(/\/$/, '') || '/';
  if (ROUTE_MAP[normalizedLower]) {
    reqPath = ROUTE_MAP[normalizedLower];
  } else if (!path.extname(reqPath)) {
    if (fs.existsSync(path.join(ROOT_DIR, reqPath + '.html'))) {
      reqPath = reqPath + '.html';
    } else if (fs.existsSync(path.join(ROOT_DIR, 'pages', reqPath.replace(/^\//, '') + '.html'))) {
      reqPath = '/pages/' + reqPath.replace(/^\//, '') + '.html';
    }
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  if (
    req.method === 'POST' &&
    (reqPath === '/api/contact' || reqPath === '/api/contact.php')
  ) {
    if (
      req.headers['content-type']?.includes(
        'application/json'
      ) !== true
    ) {
      sendJSON(res, 415, {
        success: false,
        error: 'Content-Type must be application/json.'
      });
      return;
    }

    collectRequestBody(
      req,
      res,
      (body) => {
        try {
          const parsed = JSON.parse(body);

          if (
            !parsed ||
            typeof parsed !== 'object' ||
            Array.isArray(parsed)
          ) {
            throw new Error(
              'Invalid request payload.'
            );
          }

          if (parsed.hp_check || parsed.honeypot) {
            sendJSON(res, 200, {
              success: true,
              message: 'Đã lưu lời nhắn thành công!'
            });
            return;
          }

          const data =
            sanitizeContactPayload(parsed);

          const messagesFile =
            path.join(
              ROOT_DIR,
              'messages.json'
            );

          let messages = [];

          if (fs.existsSync(messagesFile)) {
            try {
              const existing = JSON.parse(
                fs.readFileSync(
                  messagesFile,
                  'utf8'
                )
              );

              if (Array.isArray(existing)) {
                messages = existing;
              }
            } catch (_) {
              messages = [];
            }
          }

          const maxId = messages.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
          data.id = maxId + 1;

          data.timestamp =
            new Date().toISOString();

          data.localTime =
            new Date().toLocaleString(
              'vi-VN',
              {
                timeZone:
                  'Asia/Ho_Chi_Minh'
              }
            );

          messages.unshift(data);

          fs.writeFileSync(
            messagesFile,
            JSON.stringify(
              messages,
              null,
              2
            ),
            'utf8'
          );

          sendJSON(res, 200, {
            success: true,
            message:
              'Đã lưu lời nhắn thành công!'
          });
        } catch (error) {
          sendJSON(res, 400, {
            success: false,
            error: 'Invalid JSON payload.'
          });
        }
      }
    );

    return;
  }

  // Handle /api/messages or /api/messages.php (GET)
  if (req.method === 'GET' && (reqPath === '/api/messages' || reqPath === '/api/messages.php')) {
    const messagesFile = path.join(ROOT_DIR, 'messages.json');
    let messages = [];
    if (fs.existsSync(messagesFile)) {
      try {
        messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8')) || [];
      } catch (_) {
        messages = [];
      }
    }
    sendJSON(res, 200, {
      success: true,
      data: messages,
      stats: { total: messages.length }
    });
    return;
  }

  // Handle /api/projects or /api/projects.php (GET, POST, DELETE)
  if (reqPath === '/api/projects' || reqPath === '/api/projects.php') {
    const projectsFile = path.join(ROOT_DIR, 'projects.json');
    let projects = [];
    if (fs.existsSync(projectsFile)) {
      try {
        projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8')) || [];
      } catch (_) {
        projects = [];
      }
    }

    if (req.method === 'GET') {
      sendJSON(res, 200, {
        success: true,
        data: projects,
        total: projects.length
      });
      return;
    }

    if (req.method === 'DELETE') {
      let parsedUrl = null;
      try {
        parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      } catch (_) {}
      const qId = parsedUrl ? parsedUrl.searchParams.get('id') : null;
      const qName = parsedUrl ? parsedUrl.searchParams.get('name') : null;

      collectRequestBody(req, res, (body) => {
        let delId = qId;
        let delName = qName;
        if (body) {
          try {
            const b = JSON.parse(body);
            if (b.id) delId = b.id;
            if (b.name) delName = b.name;
          } catch (_) {}
        }

        projects = projects.filter(p => {
          const matchId = delId && String(p.id) === String(delId);
          const matchName = delName && String(p.name).toLowerCase().trim() === String(delName).toLowerCase().trim();
          return !(matchId || matchName);
        });

        fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf8');
        sendJSON(res, 200, {
          success: true,
          message: 'Đã xóa dự án thành công!',
          total: projects.length
        });
      });
      return;
    }

    if (req.method === 'POST') {
      collectRequestBody(req, res, (body) => {
        try {
          const parsed = JSON.parse(body);
          if (!parsed) {
            sendJSON(res, 400, { success: false, message: 'Invalid payload.' });
            return;
          }

          // Handle action=delete via POST
          if (parsed.action === 'delete') {
            const delId = parsed.id || parsed.delete_id;
            const delName = parsed.name;
            projects = projects.filter(p => {
              const matchId = delId && String(p.id) === String(delId);
              const matchName = delName && String(p.name).toLowerCase().trim() === String(delName).toLowerCase().trim();
              return !(matchId || matchName);
            });
            fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf8');
            sendJSON(res, 200, {
              success: true,
              message: 'Đã xóa dự án thành công!',
              total: projects.length
            });
            return;
          }

          if (!parsed.name) {
            sendJSON(res, 400, { success: false, message: 'Vui lòng nhập tên dự án.' });
            return;
          }
          const newProject = {
            id: parsed.id || Date.now(),
            name: parsed.name,
            category: parsed.category || 'Brand Identity',
            client: parsed.client || 'Doanh Nghiệp Mới',
            role: parsed.role || 'Graphic Designer',
            status: parsed.status || 'Đang thực hiện',
            badge: parsed.badge || 'Branding',
            tags: parsed.tags || 'Brand Identity, Portfolio 2026',
            description: parsed.description || '',
            image: parsed.image || 'assets/images/ulibee-product-campaign-kv.jpg',
            year: parsed.year || '2026',
            link: parsed.link || 'pages/selected-work.html',
            is_featured: parsed.is_featured !== undefined ? parsed.is_featured : 1,
            created_at: parsed.created_at || new Date().toISOString()
          };
          projects.unshift(newProject);
          fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf8');
          sendJSON(res, 200, {
            success: true,
            message: 'Dự án mới đã được lưu thành công!',
            project: newProject
          });
        } catch (e) {
          sendJSON(res, 400, { success: false, error: 'Invalid JSON payload.' });
        }
      });
      return;
    }
  }

  const safePath =
    path.normalize(reqPath)
      .replace(
        /^(\.\.[/\\])+/, ''
      );

  const filePath =
    path.resolve(
      ROOT_DIR,
      '.' + safePath
    );

  const relative =
    path.relative(
      ROOT_DIR,
      filePath
    );

  if (
    relative.startsWith('..') ||
    path.isAbsolute(relative)
  ) {
    res.writeHead(403, {
      'Content-Type':
        'text/plain; charset=utf-8',
      ...SECURITY_HEADERS
    });

    res.end(
      '403 Forbidden: Truy cập bị từ chối'
    );
    return;
  }

  fs.stat(
    filePath,
    (err, stats) => {
      if (err || !stats?.isFile()) {
        res.writeHead(404, {
          'Content-Type':
            'text/plain; charset=utf-8',
          ...SECURITY_HEADERS
        });

        res.end(
          '404 Not Found: Không tìm thấy tệp yêu cầu'
        );
        return;
      }

      serveFile(
        filePath,
        res
      );
    }
  );
});

function serveFile(
  filePath,
  res
) {
  const ext =
    path.extname(
      filePath
    ).toLowerCase();

  const contentType =
    MIME_TYPES[ext] ||
    'application/octet-stream';

  res.writeHead(200, {
    'Content-Type':
      contentType,
    ...SECURITY_HEADERS
  });

  if (res.req?.method === 'HEAD') {
    res.end();
    return;
  }

  const stream =
    fs.createReadStream(
      filePath
    );

  stream.pipe(res);

  stream.on(
    'error',
    () => {
      if (!res.headersSent) {
        res.writeHead(500, {
          'Content-Type':
            'text/plain; charset=utf-8',
          ...SECURITY_HEADERS
        });
      }

      res.end(
        '500 Internal Server Error'
      );
    }
  );
}

server.listen(
  PORT,
  () => {
    console.log(
      `Portfolio Secure Server: http://localhost:${PORT}`
    );
  }
);

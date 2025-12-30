// Simple Node.js Backend Server (NO DEPENDENCIES!)
const http = require('http');
const url = require('url');

const PORT = 5000;
const addresses = [];

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'OK', message: 'Server is running' }));
    return;
  }

  // OCR endpoint
  if (pathname === '/api/ocr' && req.method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, text: 'Sample extracted text' }));
    return;
  }

  // Language detection
  if (pathname === '/api/detect-language' && req.method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, language: 'English' }));
    return;
  }

  // Translation
  if (pathname === '/api/translate' && req.method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      translatedText: 'Translated text',
      sourceLanguage: 'Unknown',
      targetLanguage: 'en'
    }));
    return;
  }

  // Submit address
  if (pathname === '/api/address' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.fullName && data.addressLine1 && data.pincode) {
          data.id = Date.now();
          data.createdAt = new Date();
          addresses.push(data);
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'Address submitted successfully',
            addressId: data.id
          }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Missing required fields' }));
        }
      } catch (e) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Get addresses
  if (pathname === '/api/addresses' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, addresses: addresses, count: addresses.length }));
    return;
  }

  // Get single address
  const addressMatch = pathname.match(/^\/api\/address\/(\d+)$/);
  if (addressMatch && req.method === 'GET') {
    const id = parseInt(addressMatch[1]);
    const address = addresses.find(a => a.id === id);
    if (address) {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, address: address }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, error: 'Address not found' }));
    }
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`\n✅ Post Office OCR Scanner API running on port ${PORT}`);
  console.log(`✅ API endpoints available at http://localhost:${PORT}/api`);
  console.log(`\n🎉 Backend is ready!\n`);
});

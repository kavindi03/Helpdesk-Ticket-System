const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'Test Server' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
  }
});

server.listen(4000, '127.0.0.1', () => {
  console.log('✓ Test server listening on http://127.0.0.1:4000');
  console.log('✓ PID:', process.pid);
});

server.on('error', (err) => {
  console.error('✗ Server error:', err.message);
  process.exit(1);
});

#!/usr/bin/env node
'use strict';
// tools/static.js — a plain file server for the game folder that keeps up with Chrome loading ~200 files at once
// (python's http.server drops some of them with ERR_CONNECTION_RESET, and the game then says a part did not load).
//   node tools/static.js [port]          serves the repo root on 127.0.0.1:port (default 9493)
//   require('./static.js').start(port)   same, from another tool; resolves with the server
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = path.join(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
  '.wav': 'audio/wav', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.gif': 'image/gif', '.ico': 'image/x-icon' };
function start(port) {
  return new Promise((res, rej) => {
    const srv = http.createServer((req, out) => {
      let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
      const f = path.join(ROOT, path.normalize(p));
      if (!f.startsWith(ROOT)) { out.writeHead(403); return out.end(); }
      fs.readFile(f, (err, buf) => {
        if (err) { out.writeHead(404); return out.end('not found'); }
        out.writeHead(200, { 'content-type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
        out.end(buf);
      });
    });
    srv.on('error', rej);
    srv.listen(port, '127.0.0.1', () => res(srv));
  });
}
module.exports = { start };
if (require.main === module) {
  const port = +process.argv[2] || 9493;
  start(port).then(() => console.log('serving ' + ROOT + ' on http://127.0.0.1:' + port), e => { console.error(e.message); process.exit(1); });
}

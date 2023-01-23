const express = require('express');

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const path = require('path');
const config = require(path.join(process.cwd(), './config'));

const fs = require('fs');
const https = require('https');
const http = require('http');

const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const compression = require('compression');

const app = express();

app.set('env', 'production');

const key = config.ssl?.key == '' ? '' : fs.readFileSync(path.join(process.cwd(), 'ssl', '/' + config.ssl?.key), 'utf8');
const cert = config.ssl?.crt == '' ? '' : fs.readFileSync(path.join(process.cwd(), 'ssl', '/' + config.ssl?.crt), 'utf8');

const httpServer = http.createServer(
  key == '' || cert == ''
    ? app
    : (req, res) => {
        res.writeHead(301, { Location: 'https://' + req.headers['host'].split(':')[0] + ':' + config.httpsPort + req.url });
        res.end();
      }
);

const limiter = rateLimit(config.limiter);

if (key != '' && cert != '') {
  app.use(
    helmet({
      hsts: {
        maxAge: 0,
        includeSubDomains: false,
        preload: true,
      },
      dnsPrefetchControl: { allow: true },
      contentSecurityPolicy: {
        directives: {
          'img-src': ['data:', 'blob:', 'mediastream:', 'filesystem:', "'self' img.example.com"],
        },
      },
    })
  );
}
app
  .use(limiter)
  .use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
      level: 5,
    })
  )
  .use(config.proxy.path, createProxyMiddleware(config.proxy))
  .use(history())
  .use(
    express.static('./dist', {
      maxAge: config.maxAge,
    })
  );

httpServer.listen(config.httpPort, () => console.log('http:' + config.httpPort));
httpServer.on('connection', socket => socket.setTimeout(config.setTimeout));

if (key == '' || cert == '') return;
const httpsServer = https.createServer({ key, cert }, app);
httpsServer.listen(config.httpsPort, () => console.log('https:' + config.httpsPort));
httpsServer.on('connection', socket => socket.setTimeout(config.setTimeout));

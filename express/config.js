module.exports = {
  proxy: {
    path: '/api',
    target: 'http://0.0.0.0:7001/',
    changeOrigoin: false,
    pathRewrite: { '^/api': '/' },
  },
  limiter: {
    // 10 分钟内访问 500 次
    windowMs: 10 * 60 * 1000,
    max: 500,
    message: '访问次数过多,请稍后再试!!!',
    standardHeaders: true,
    legacyHeaders: false,
  },
  httpPort: 5000,
  httpsPort: 5001,
  maxAge: 86400000,
  setTimeout: 30 * 1000,
  ssl: {
    key: '340200.xyz.key',
    crt: '340200.xyz_bundle.crt',
  },
};

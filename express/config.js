module.exports = {
  proxy: {
    path: '/api',
    //后端 api 地址
    target: 'http://0.0.0.0:7001/',
    changeOrigoin: false,
    pathRewrite: { '^/api': '/' },
    xfwd: true,
  },
  //流量限制
  limiter: {
    //重置时间间隔 10 分钟
    windowMs: 10 * 60 * 1000,
    //最大访问次数
    max: 500,
    message: '访问次数过多,请稍后再试!!!',
    standardHeaders: true,
    legacyHeaders: false,
  },
  // http 端口
  httpPort: 5000,
  // https 端口 , 未部署不生效
  httpsPort: 5001,
  maxAge: 86400000,
  setTimeout: 30 * 1000,
  ssl: {
    key: '',
    crt: '',
  },
};

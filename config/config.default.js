/**
 * eslint valid-jsdoc: "off"
 *
 * @format
 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');
//  pkg打包配置 begin
const process = require('process');

const I18n = require('i18n');

I18n.configure({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  directory: __dirname + '/locale',
});

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/

  //自定义中间件

  const db = new Map();

  const qjson = require('qjson-db');
  const configDb = new qjson(path.join(__dirname, '../config.json'));
  const { jwt, captcha, startupTime, ratelimit, firewalld, accessLog, clean, believe } = configDb.JSON();

  const config = (exports = {
    middleware: ['ratelimit'],
    configs: {},
    firewalld,
    accessLog,
    clean,
    believe,
    jwt: {
      enable: false, //false 表示非全局,路由上生效
      expiresIn: `${jwt.expiresIn}d`,
      secret: jwt.secret,
    },
    captcha: {
      expiresIn: captcha.expiresIn,
      secret: captcha.secret,
    },
    startupTime,
    cluster: {
      listen: {
        port: 7001,
        hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
        // path: '/var/run/egg.sock',
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    security: {
      csrf: {
        enable: false,
      },
      ctoken: false,
      domainWhiteList: ['340200.xyz:8013'], //允许跨域的白名单,为false时不限制跨域
    },
    sequelize: {
      sync: true,
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database/sqlite-default.db'), //我这里用的是绝对路径
    },
    onerror: {
      all(err, ctx) {
        ctx.status = 200;
        let message = ctx.helper.status[err.name](err) ?? '未知错误';
        ctx.helper.response({ success: false, message });
      },
      html(err, ctx) {
        // html hander
        ctx.body = '<h3>error</h3>';
        ctx.status = 500;
      },
      json(err, ctx) {
        // json hander
        ctx.body = { message: 'error' };
        ctx.status = 500;
      },
      jsonp(err, ctx) {
        // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
      },
    },
    validate: {
      // 配置参数校验器，基于parameter
      convert: true, // 对参数可以使用 convertType 规则进行类型转换
      // validateRoot: false,   // 限制被验证值必须是一个对象。
      widelyUndefined: false,
      translate() {
        const args = Array.prototype.slice.call(arguments);
        return I18n.__.apply(I18n, args);
      },
    },
    logrotator: {
      filesRotateBySize: [path.join(appInfo.root, 'logs', appInfo.name, 'egg-web.log')],
      maxFileSize: 100 * 1024 * 1024,
    },
    customLogger: {
      system: {
        file: path.join(__dirname, '../logs/system/system.log'),
        maxFileSize: 100 * 1024 * 1024,
      },
      drop: {
        file: path.join(__dirname, '../logs/drop/drop.log'),
        maxFileSize: 100 * 1024 * 1024,
      },
    },
    ratelimit: {
      db,
      driver: 'memory',
      duration: ratelimit.duration * 60 * 1000,
      max: ratelimit.max,
      errorMessage: '访问限制,请稍后再试!',
      id: ctx => ctx.ip,
      headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total',
      },
      disableHeader: false,
      whitelist: ctx => {
        // some logic that returns a boolean
      },
      blacklist: ctx => {
        // some logic that returns a boolean
      },
    },
    // compress: {
    //   threshold: 2048,
    // },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1670808067708_8840';

  // add your user config here
  const userConfig = {
    appName: 'myWaf',
  };

  return {
    ...config,
    ...userConfig,
  };
};

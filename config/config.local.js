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

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    cluster: {
      listen: {
        port: 7002,
        hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
        // path: '/var/run/egg.sock',
      },
    },
    sequelize: {
      sync: true,
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database/sqlite-local.db'), //我这里用的是绝对路径
    },
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

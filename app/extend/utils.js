/** @format */

'use strict';

const fs = require('fs');
const path = require('path');

// const seq = require('sequelize');
// const Op = seq.Op;
let isTcpkill = false;

const status = require(path.join(__dirname, './status'));

const { exec } = require('child_process');

const qjson = require('qjson-db');
const configDb = new qjson(path.join(__dirname, '../../config.json'));
// ctx.helper.configDb.set('key', 'value');
// console.log(ctx.helper.configDb.JSON());
// console.log(configDb.get('key'));

const _ = require('lodash');

// const search = searcher.binarySearchSync(ip);
const searcher = require('dy-node-ip2region').create();

const NodeRSA = require('node-rsa');
const cache = require('memory-cache');
const ipsCache = new cache.Cache();
const logCache = new cache.Cache();
const captchaCache = new cache.Cache();

const priKeyToken = fs.readFileSync(path.join(__dirname, '../../secretKey/token/PRIVATE-KEY.txt')).toString();
const pubKeyToken = fs.readFileSync(path.join(__dirname, '../../secretKey/token/PUBLIC-KEY.txt')).toString();
const privateKeyToken = new NodeRSA(priKeyToken);
privateKeyToken.setOptions({ encryptionScheme: 'pkcs1' });
const publicKeyToken = new NodeRSA(pubKeyToken);
publicKeyToken.setOptions({ encryptionScheme: 'pkcs1' });

const priKeyFingerprint = fs.readFileSync(path.join(__dirname, '../../secretKey/fingerprint/PRIVATE-KEY.txt')).toString();
const pubKeyFingerprint = fs.readFileSync(path.join(__dirname, '../../secretKey/fingerprint/PUBLIC-KEY.txt')).toString();
const privateKeyFingerprint = new NodeRSA(priKeyFingerprint);
privateKeyFingerprint.setOptions({ encryptionScheme: 'pkcs1' });
const publicKeyFingerprint = new NodeRSA(pubKeyFingerprint);
publicKeyFingerprint.setOptions({ encryptionScheme: 'pkcs1' });

module.exports = {
  //lodash
  _,
  configDb,
  seq() {
    return this.app.Sequelize;
  },
  async seqTransaction(resolve = async () => {}, reject = async () => {}) {
    const { ctx } = this;
    const transaction = await ctx.model.transaction();
    try {
      const response = await resolve();
      await transaction.commit();
      return response;
    } catch (error) {
      console.log(error);
      const message = `事务执行失败 ${error.toString()}`;
      await transaction.rollback();
      this.serviceAddSystem(13, message);
      this.app.getLogger('system').info('', message);
      reject && reject();
      return { data: null };
    }
  },
  status,
  searcher,
  throw(message, callBack) {
    const err = new Error(message);
    err.name = 'custom';
    try {
      callBack && callBack();
    } catch (error) {
      console.log('同时发生错误');
      console.log(error);
      throw err;
    }
    throw err;
  },
  delay(time = 500, callBack) {
    return new Promise(resolve1 => {
      new Promise(resolve2 => {
        var timer = setTimeout(() => {
          resolve2(timer);
        }, time);
      }).then(result => {
        resolve1();
        callBack && callBack();
        clearTimeout(result);
      });
    });
  },
  getXwf() {
    const { ctx, app } = this;
    const xwf = (ctx.request.header?.['x-forwarded-for']?.split?.(',') ?? []).pop();
    return xwf ? app.ipMatch(xwf).join('') : ctx.ip;
  },
  getFormatNowDate(format = 'yyyy-MM-dd hh:mm:ss') {
    return new Date().Format(format);
  },
  getFormatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
    return new Date(date).Format(format);
  },
  betweenTime(startTime, endTime) {
    return [new Date(`${startTime} 00:00:00`).Format('yyyy-MM-dd hh:mm:ss'), new Date(`${endTime} 23:59:59`).Format('yyyy-MM-dd hh:mm:ss')];
  },
  captchaCheck(playload, code) {
    const { ctx, app } = this;
    const captcha = playload.split('|')[0];
    captchaCache.get(playload) != null && ctx.helper.throw('验证码已被使用');
    ctx.helper._.toUpper(captcha) !== ctx.helper._.toUpper(code) && ctx.helper.throw('验证码错误');
    captchaCache.put(playload, new Date(), app.config?.captcha?.expiresIn * 600000 ?? 600000);
  },
  isInLogCache(ip, port) {
    return logCache.get(`${ip}-${port}`) != null;
  },
  logCacheKeys() {
    return logCache.keys();
  },
  logCachePut(ip, port, res, expirationTime) {
    const log = `${res.type}   ${res.port}  ${res.ip}   ${res.fullSite}`;
    logCache.put(`${ip}-${port}`, log, expirationTime * 1000, (key, value) => {
      //这是缓存失效的回调不是插入成功的回调
    });
  },
  ipsCacheKeys() {
    return ipsCache.keys();
  },
  ipsCacheGet(ip) {
    return ipsCache.get(`ip-${ip}`);
  },
  isInIpsCache(ip) {
    return ipsCache.get(`ip-${ip}`) != null;
  },
  ipsCachePut(ip, data, expirationTime) {
    const { ctx } = this;
    try {
      ipsCache.del(`ip-${ip}`);
      //解决定时器溢出问题
      const time = 100000;
      if (expirationTime > time) {
        data.expirationTimeSplit = expirationTime - time;
        ipsCache.put(`ip-${ip}`, data, time * 1000, (key, value) => {
          ctx.helper.ipsCachePut(value.ip, value, data.expirationTimeSplit);
        });
      } else {
        ipsCache.put(`ip-${ip}`, data, expirationTime * 1000, (key, value) => {
          //这是缓存失效的回调,不是插入成功的回调
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  ipsCacheDel(ip) {
    return ipsCache.del(`ip-${ip}`);
  },
  async blacklistCreate({ ip, expirationTime, site, port, time, expirationTimeFormat }) {
    const { ctx } = this;
    if (await ctx.helper.dropCommand(ip, expirationTime)) {
      await ctx.model.Blacklist.sync();
      const blacklist = await ctx.model.Blacklist.create({ ip, expirationTime, site, port, time, expirationTimeFormat });
      await blacklist.save();
      ctx.helper.ipsCachePut(ip, { ip, port, fullSite: site, expirationTime }, expirationTime);
      this.serviceAddSystem(4, `加入黑名单 IP: ${ip} 地点: ${site} 端口: ${port} 屏蔽时间 ${expirationTimeFormat}`);
      return { ip, success: true, message: '加入黑名单成功' };
    } else {
      this.serviceAddSystem(4, `加入黑名单失败,可能已经用其他方式加入防火墙 IP: ${ip} 地点: ${site} 端口: ${port}`);
      return { ip, success: false, message: '加入黑名单失败,可能已经用其他方式加入防火墙' };
    }
  },
  drop(ip, time) {
    return new Promise((resolve, reject) => {
      const command = `firewall-cmd  --add-rich-rule='rule family=ipv4 source address="${ip}"  drop' --timeout=${time}`;
      exec(command, (err, stdout, stderr) => {
        resolve({ err, stdout, stderr, success: stderr || err ? false : true });
      });
    });
  },
  async dropCommand(ip, expirationTime) {
    const { stdout, stderr, err } = await this.drop(ip, expirationTime);
    stdout && this.app.getLogger('drop').info('黑名单', `ip ${ip}  禁止时间  ${expirationTime} 秒`);
    stderr && this.app.getLogger('drop').info('黑名单', `重复加入 ${ip}`);
    err && this.app.getLogger('drop').info('黑名单', `加入黑名单失败 ${ip}`);
    return stderr || err ? false : true;
  },
  ipsCacheKeys() {
    return ipsCache.keys();
  },
  async queryNodeVersion() {
    const version = (await this.command('node -v'))?.replace(/\n+/g, '');
    const isReturn = version?.replace(/[A-Za-z]+/g, '').split('.')[0] < 16;
    isReturn && console.log('node 版本需要大于等于 16');
    return isReturn;
  },
  millisecondToDay(millisecond = 86400000) {
    return parseInt(millisecond / 86400000);
  },
  dayToMillisecond(day = 1) {
    return parseInt(day * 86400000);
  },
  async getFirewalldStatus() {
    const { ctx } = this;
    const { success, stdout } = await ctx.helper.command('firewall-cmd --state');
    return success ? (stdout.indexOf('running') == -1 ? false : true) : false;
  },
  command(command = '') {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        resolve({ stdout, stderr, err, success: stderr || err ? false : true });
      });
    });
  },
  tcpkill(ip, timeout = 300000) {
    return new Promise((resolve, reject) => {
      if (isTcpkill) return resolve(true);
      console.log('kaishizhixing');
      let timer;
      try {
        const response = exec(`tcpkill -i any -9 host ${ip}`, { timeout: timeout * 2, maxBuffer: 50 * 1024 });
        response.on('close', code => resolve(true));
        response.on('error', code => {
          isTcpkill = true;
          resolve(true);
        });
        response.on('exit', code => {
          code != null && (isTcpkill = true);
          resolve(true);
        });
        timer = setTimeout(() => {
          response?.kill();
          resolve(true);
          clearTimeout(timer);
        }, timeout);
      } catch (error) {
        timer && clearTimeout(timer);
        reject(false);
      }
    });
  },
  boolFormat(num) {
    const bool =
      num === 1 || num === '1' || num === true || num === 'true' ? true : num === 0 || num === '0' || num === false || num === 'false' ? false : '';
    return bool;
  },
  notEmpty(params) {
    return Array.isArray(params) ? params.map(item => (Array.isArray(item) ? item.every(item => item !== '') : item !== '')) : params !== '';
  },
  async commandQueryportStatus(data) {
    if (Array.isArray(data)) {
      const { success, stdout } = await this.command(`firewall-cmd --list-ports`);
      const listPorts = success
        ? stdout?.split(/\s{1,}/).map(item => {
            item = item.split('/');
            return [item[0].indexOf('-') != -1 ? item[0].split('-') : item[0], item[1]];
          })
        : [];

      data.forEach(item1 => {
        const port = item1.getDataValue('port');
        item1.setDataValue('tcpPort', false);
        item1.setDataValue('udpPort', false);
        listPorts.forEach(item2 => {
          item2[1] === 'tcp' &&
            (Array.isArray(item2[0]) ? item2[0][0] <= port && port <= item2[0][1] : port == item2[0]) &&
            item1.setDataValue('tcpPort', true);

          item2[1] === 'udp' &&
            (Array.isArray(item2[0]) ? item2[0][0] <= port && port <= item2[0][1] : port == item2[0]) &&
            item1.setDataValue('udpPort', true);
        });
      });
      return data;
    } else return [];
  },
  async commandQueryIpRule(ip) {
    const { success, stdout } = await this.command(`firewall-cmd --list-rich-rules | grep '"${ip}"' | grep drop`);
    return success ? (stdout == '' ? false : true) : false;
  },
  async isCustomDrop() {
    const { err, stdout, stderr } = await this.command('firewall-cmd --permanent --get-ipsets');
    const isDrop = stdout.indexOf('CUSTOM-DROP') != -1;
    this.app.getLogger('system').info('', `------------------自定义 ipsets CUSTOM-DROP ${isDrop ? '已存在' : '不存在'} ---------------`);
    return isDrop;
  },
  async triggerChangePort(status, port, protocol) {
    const { ctx } = this;
    let success = false;
    if (status) {
      const { success: querySuccess, stdout } = await ctx.helper.command(`firewall-cmd --query-port=${port}/${protocol}`);

      if (querySuccess && stdout.indexOf('yes') != -1) return true;

      const add = await ctx.helper.command(`firewall-cmd --add-port=${port}/${protocol}`);
      const addPermanent = await ctx.helper.command(`firewall-cmd --add-port=${port}/${protocol} --permanent`);
      success = add.success && addPermanent.success;
    } else {
      const remove = await ctx.helper.command(`firewall-cmd --remove-port=${port}/${protocol}`);
      const removePermanent = await ctx.helper.command(`firewall-cmd --remove-port=${port}/${protocol} --permanent`);
      success = remove.success && removePermanent.success;
    }
    return success;
  },
  async newIpset() {
    this.app.getLogger('system').info('', `------------------即将新建 ipsets CUSTOM-DROP---------------`);
    const { err, stdout, stderr } = await this.command('firewall-cmd --permanent --new-ipset=CUSTOM-DROP --type=hash:ip');
    stdout && this.app.getLogger('system').info('', `------------------新建成功---------------`);
    (stderr || err) && this.app.getLogger('system').info('', `------------------新建失败---------------`);
    return stdout != null;
  },
  deleteFolder(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(file => {
        const curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          deleteFolder(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  },
  //rsa 解密
  decrypt(msg, type = 1) {
    try {
      const rsa = type == 1 ? privateKeyToken : privateKeyFingerprint;
      const decrypted = rsa.decrypt(msg);
      return decrypted.toString();
    } catch (error) {
      return new Date().getTime();
    }
  },
  //rsa 加密
  encrypt(msg, type = 1) {
    try {
      const rsa = type == 1 ? publicKeyToken : publicKeyFingerprint;
      const encrypt = rsa.encrypt(msg, 'base64', 'utf8');
      return encrypt.toString();
    } catch (error) {
      return new Date().getTime();
    }
  },
  // jwt 生成 token
  jwtSecret(playload) {
    const { app, ctx } = this;
    const jwtSecret = app.config?.jwt.secret ?? '';
    const token = app.jwt.sign({ playload }, jwtSecret, {
      expiresIn: app.config?.jwt.expiresIn,
    });
    return ctx.helper.encrypt(token);
  },
  // jwt 验签
  jwtVerify(token) {
    const { app, ctx } = this;
    const jwtSecret = app.config?.jwt.secret ?? '';
    //先解 token 的 rsa 加密
    token = ctx.helper.decrypt(token);
    //解码 jwt token
    const decode = app.jwt.verify(token, jwtSecret);
    return decode;
  },
  //验证码 生成 jwt token
  captchaJwtSecret(playload) {
    const { ctx, app } = this;
    const jwtSecret = app.config?.captcha.secret ?? '';
    const token = app.jwt.sign({ playload }, jwtSecret, {
      expiresIn: `${app.config?.captcha.expiresIn}m`,
    });
    return ctx.helper.encrypt(token);
  },
  //验证码 jwt 验签
  captchaJwtVerify(token) {
    const { ctx, app } = this;
    const jwtSecret = app.config?.captcha.secret ?? '';
    //先解 token 的 rsa 加密
    token = ctx.helper.decrypt(token);
    //解码 jwt token
    const decode = app.jwt.verify(token, jwtSecret);
    return decode;
  },
  getPublicKey() {
    return pubKeyToken;
  },
  getPublicKeyFingerprint() {
    return pubKeyFingerprint;
  },
  systemStart() {
    console.log('');
    this.app.getLogger('system').info('', `------------------${this.app.env} 环境已启动---------------`);
    console.log('');
    this.serviceAddSystem(1, `${this.app.env} 环境已启动`);
  },
  systemStop() {
    console.log('');
    this.app.getLogger('system').info('', `------------------${this.app.env} 环境已停止---------------`);
    console.log('');
  },
  systemTimeOut() {
    console.log('');
    this.app.getLogger('system').info('', `------------------启动超时---------------`);
    console.log('');
    this.serviceAddSystem(0, `${this.app.env} 启动超时`);
  },
  async serviceAddSystem(type, details, callBack) {
    const {
      ctx,
      ctx: { header },
    } = this;
    try {
      const ip = this.getXwf();
      const jwt = header?.token ? ctx.helper.jwtVerify(header.token) : {};
      const json = jwt?.playload ? JSON.parse(jwt.playload) : {};
      const user = json.username ?? '系统默认';
      await ctx.service.system.addSystem({ ip, user, type, details });
      callBack && callBack();
    } catch (error) {
      console.log(error);
    }
  },
  controllerGetOverview(startTime, endTime) {
    const { ctx } = this;
    const str =
      new Date(startTime == '' ? new Date(new Date().Format('yyyy-MM-dd')).getTime() - ctx.helper.dayToMillisecond(15) : `${startTime}`).getTime() -
      ctx.helper.dayToMillisecond();

    const end = new Date(endTime == '' ? ctx.helper.getFormatNowDate('yyyy-MM-dd') : `${endTime}`).getTime();

    const day = Math.floor((end - str) / (24 * 3600 * 1000));

    const rangeDate = Array.from({ length: day }).map((item, index) => {
      const date = end - ctx.helper.dayToMillisecond() * index;
      return {
        date: ctx.helper.getFormatDate(date, 'yyyy-MM-dd'),
        startTime: ctx.helper.getFormatDate(date, 'yyyy-MM-dd 00:00:00'),
        endTime: ctx.helper.getFormatDate(date, 'yyyy-MM-dd 23:59:59'),
      };
    });

    return { str, end, day, rangeDate };
  },
};

Array.prototype.syncEach = async function (callBack = async () => {}) {
  try {
    const data = Array.isArray(this) ? this : [];
    for await (let item of data) {
      const res = await callBack(item);
      if (res !== undefined) {
        if (res === true) {
          break;
        } else {
          continue;
        }
      }
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

Array.prototype.syncMap = async function (callBack = async () => {}) {
  try {
    const data = Array.isArray(this) ? this : [];
    const response = [];
    for await (let item of data) {
      const res = await callBack(item, response.length);
      response.push(res);
    }
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};

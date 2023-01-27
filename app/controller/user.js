/** @format */

'use strict';

const { Controller } = require('egg');
const svgCaptcha = require('svg-captcha');
const crypto = require('crypto');
const stringRandom = require('string-random');

class UserController extends Controller {
  async register() {
    const { ctx } = this;

    ctx.validate({
      username: 'username',
      password: 'password',
      secret: { type: 'string', required: true },
      captchaSecret: { type: 'string', required: true },
      code: { type: 'string', required: true },
    });

    const { username, password, secret, captchaSecret, code } = ctx.request.body;

    const { playload } = ctx.helper.captchaJwtVerify(captchaSecret);

    ctx.helper.captchaCheck(playload, code);

    const { equalNull } = await ctx.service.user.findUserOne({ username });

    const { data } = await ctx.service.user.findUserCount();

    if (!equalNull || data.count != 0) return ctx.helper.response({ success: false, message: '已经注册过' });

    const response = await ctx.service.user.register({ username, password, secret });
    ctx.helper.response({ data: response.data });
  }
  async updatePass() {
    const { ctx } = this;

    ctx.validate({
      username: 'username',
      password: 'password',
      secret: { type: 'string', required: true },
      code: { type: 'string', required: true },
      captchaSecret: { type: 'string', required: true },
      jwtSecret: { type: 'string', required: true },
    });

    const { username, secret, jwtSecret, password, code, captchaSecret } = ctx.request.body;

    const { playload } = ctx.helper.captchaJwtVerify(captchaSecret);

    ctx.helper.captchaCheck(playload, code);

    if (jwtSecret !== ctx.app.config.jwt.secret) return;
    const data = await ctx.service.user.updateUserOne({ username, password, secret });
    ctx.helper.response(data);
  }
  async login() {
    const { ctx } = this;

    ctx.validate({
      captchaSecret: { type: 'string', required: true },
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      code: { type: 'string', required: true },
    });

    ctx.validate({ fingerprint: { type: 'string', required: true } }, ctx.request.header);

    const { username, password, captchaSecret, code } = ctx.request.body;

    const { fingerprint } = ctx.request.header;

    const { playload } = ctx.helper.captchaJwtVerify(captchaSecret);

    ctx.helper.captchaCheck(playload, code);

    const usernameDecrypt = ctx.helper.decrypt(username);
    const passwordDecrypt = ctx.helper.decrypt(password);

    const { data, equalNull } = await ctx.service.user.findUserOne({
      username: usernameDecrypt,
      password: crypto.createHash('md5').update(passwordDecrypt).digest('hex'),
    });

    if (equalNull) ctx.helper.throw('请检查用户名或者密码');

    data.dataValues.token = ctx.helper.jwtSecret(`${data.id}|${ctx.helper.decrypt(fingerprint, 2)}`);

    ctx.helper.response({ data });
  }
  async captcha() {
    const { ctx } = this;

    const { data: svg, text } = svgCaptcha.createMathExpr({
      mathMin: 1,
      mathMax: 9,
      mathOperator: '+',
    });

    const publicKey = ctx.helper.getPublicKey();

    const captchaSecret = ctx.helper.captchaJwtSecret(`${text}|${stringRandom(20)}`);

    ctx.helper.response({ data: { publicKey, captchaSecret, svg } });
  }
  async getPublicKeyFingerprint() {
    const { ctx } = this;
    const publicKeyFingerprint = ctx.helper.getPublicKeyFingerprint();
    ctx.helper.response({ data: publicKeyFingerprint });
  }
  async test() {
    const { ctx } = this;
    ctx.helper.response({ success: true });
  }
}

module.exports = UserController;

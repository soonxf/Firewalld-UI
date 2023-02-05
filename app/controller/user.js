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

    const {
      data: { count },
    } = await ctx.service.user.findUserCount();

    (equalNull == false || count != 0) &&
      ctx.helper.throw('已经注册过', () => ctx.helper.serviceAddSystem(16, `用户名 ${username}  注册失败,已经注册过`));

    const response = await ctx.service.user.register({ username, password, secret });
    ctx.helper.response({ data: response.data }, () => ctx.helper.serviceAddSystem(16, `用户名 ${username}  注册成功`));
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

    jwtSecret != ctx.app.config.jwt.secret && ctx.helper.throw('修改失败', () => ctx.helper.serviceAddSystem(15, `用户名 ${username}  修改密码失败`));

    const data = await ctx.service.user.updateUserOne({ username, password, secret });
    ctx.helper.response(data, () => ctx.helper.serviceAddSystem(15, `用户名 ${username}  修改密码成功`));
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

    equalNull && ctx.helper.throw('请检查用户名或者密码', () => ctx.helper.serviceAddSystem(14, `用户名 ${usernameDecrypt} 登陆失败`));

    const json = data.toJSON?.() ?? {};

    json.fingerprint = ctx.helper.decrypt(fingerprint, 2);
    json.token = ctx.helper.jwtSecret(JSON.stringify(json));

    ctx.helper.response({ data: json }, () => ctx.helper.serviceAddSystem(14, `用户名 ${usernameDecrypt} 登陆成功`));
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
    const { ctx, app } = this;
    const publicKeyFingerprint = ctx.helper.getPublicKeyFingerprint();
    ctx.helper.response({ data: { publicKeyFingerprint, xfwd: ctx.helper.getXwf() } });
  }
  async test() {
    const { ctx } = this;
    ctx.helper.response({ success: true });
  }
}

module.exports = UserController;

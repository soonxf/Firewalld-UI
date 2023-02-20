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
      ctx.helper.throw(ctx.helper.getMessage.user(0), () => ctx.helper.serviceAddSystem(16, ctx.helper.getMessage.user(1, { username })));

    const response = await ctx.service.user.register({ username, password, secret });
    ctx.helper.response({ data: response.data }, () => ctx.helper.serviceAddSystem(16, ctx.helper.getMessage.user(2, { username })));
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

    jwtSecret != ctx.app.config.jwt.secret &&
      ctx.helper.throw(ctx.helper.getMessage.user(3), () =>
        ctx.helper.serviceAddSystem(
          15,
          ctx.helper.getMessage.user(4, {
            username,
          })
        )
      );

    const data = await ctx.service.user.updateUserOne({ username, password, secret });
    ctx.helper.response(data, () =>
      ctx.helper.serviceAddSystem(
        15,
        ctx.helper.getMessage.user(5, {
          username,
        })
      )
    );
  }
  async login() {
    const { ctx, app } = this;

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
      // password: passwordDecrypt,
    });

    equalNull &&
      ctx.helper.throw(ctx.helper.getMessage.user(6), () =>
        ctx.helper.serviceAddSystem(
          14,
          ctx.helper.getMessage.user(7, {
            usernameDecrypt,
          })
        )
      );

    const getPassword = data.getDataValue('password') ?? '';

    app.matchPassword(passwordDecrypt, getPassword) ||
      ctx.helper.throw(ctx.helper.getMessage.user(6), () =>
        ctx.helper.serviceAddSystem(
          14,
          ctx.helper.getMessage.user(8, {
            usernameDecrypt,
          })
        )
      );

    data.setDataValue('fingerprint', ctx.helper.decrypt(fingerprint, 2));
    data.setDataValue('token', ctx.helper.jwtSecret(JSON.stringify(data)));
    data.setDataValue('password', undefined);
    data.setDataValue('secret', undefined);

    ctx.helper.response({ data }, () =>
      ctx.helper.serviceAddSystem(
        14,
        ctx.helper.getMessage.user(9, {
          usernameDecrypt,
        })
      )
    );
  }
  async captcha() {
    const { ctx } = this;
    await ctx.helper.delay(500);
    const { data: svg, text } = svgCaptcha.createMathExpr({
      mathMin: 1,
      mathMax: 9,
      mathOperator: '+',
    });

    const publicKey = ctx.helper.getPublicKey();

    const captchaSecret = ctx.helper.captchaJwtSecret(`${text}|${stringRandom(20)}`);

    ctx.helper.response({
      data: { publicKey, captchaSecret, svg, expiredTime: Date.now() + ctx.helper.configDb.get('captcha')?.expiresIn * 60 * 1000 ?? 60 * 1000 },
    });
  }
  async getPublicKeyFingerprint() {
    const { ctx } = this;
    const publicKeyFingerprint = ctx.helper.getPublicKeyFingerprint();
    ctx.helper.response({ data: { publicKeyFingerprint, xfwd: ctx.helper.getXwf() } });
  }
  async test() {
    const { ctx } = this;
    ctx.helper.response({ success: true });
  }
}

module.exports = UserController;

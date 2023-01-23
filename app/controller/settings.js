const { Controller } = require('egg');
const { exec } = require('child_process');
class settingsController extends Controller {
  async getSettings() {
    const { ctx, app } = this;
    const json = ctx.helper.configDb.JSON();
    ctx.helper.response({
      data: {
        startupTime: json.startupTime ?? 300,
        cleanInterval: json.clean?.interval ?? 7,
        accessLogInterval: json.accessLog?.interval ?? 30,
        firewalldInterval: json.firewalld?.interval ?? 1,
        firewalldDuration: json.firewalld?.duration ?? 1,
        ratelimitDuration: json.ratelimit?.duration ?? 10,
        ratelimitMax: json.ratelimit?.max ?? 100,
        captchaExpiresIn: json.captcha?.expiresIn ?? 1,
        captchaSecret: '',
        jwtExpiresIn: json.jwt?.expiresIn ?? 7,
        jwtSecret: '',
        believeTrust: json.believe.trust,
        believeAccess: json.believe.access,
      },
    });
  }
  async setSettings() {
    const { ctx } = this;
    ctx.validate({
      restart: { type: 'boolean', required: true },
      code: { type: 'string', required: false },
      codeSecret: { type: 'string', required: true },
      startupTime: { type: 'number', required: false },
      cleanInterval: { type: 'number', required: false },
      accessLogInterval: { type: 'number', required: false },
      firewalldInterval: { type: 'number', trim: true, required: false },
      firewalldDuration: { type: 'number', required: false },
      ratelimitDuration: { type: 'number', trim: true, required: false },
      ratelimitMax: { type: 'number', trim: true, required: false },
      captchaExpiresIn: { type: 'number', trim: true, required: false },
      captchaSecret: { type: 'string', trim: true, required: false },
      jwtExpiresIn: { type: 'number', trim: true, required: false },
      jwtSecret: { type: 'string', trim: true, required: false },
    });
    const {
      restart,
      startupTime,
      accessLogInterval,
      firewalldInterval,
      firewalldDuration,
      ratelimitDuration,
      ratelimitMax,
      captchaExpiresIn,
      captchaSecret,
      jwtExpiresIn,
      jwtSecret,
      cleanInterval,
      believeTrust,
      believeAccess,
      codeSecret,
      code,
    } = ctx.request.body;

    const { playload } = ctx.helper.captchaJwtVerify(codeSecret);

    ctx.helper.captchaCheck(playload, code);

    ctx.helper.configDb.set('startupTime', startupTime);
    ctx.helper.configDb.set('clean', {
      interval: cleanInterval,
    });
    ctx.helper.configDb.set('accessLog', {
      interval: accessLogInterval,
    });
    ctx.helper.configDb.set('firewalld', {
      interval: firewalldInterval,
      duration: firewalldDuration,
    });
    ctx.helper.configDb.set('ratelimit', {
      max: ratelimitMax,
      duration: ratelimitDuration,
    });

    ctx.helper.configDb.set('captcha', {
      expiresIn: captchaExpiresIn,
      secret: captchaSecret == '' ? ctx.helper.configDb.get('captcha').secret : captchaSecret,
    });

    ctx.helper.configDb.set('jwt', {
      expiresIn: jwtExpiresIn,
      secret: jwtSecret == '' ? ctx.helper.configDb.get('jwt').secret : jwtSecret,
    });
    ctx.helper.configDb.set('believe', {
      trust: believeTrust,
      access: believeAccess,
    });
    if (restart) {
      ctx.helper.response({
        success: true,
        data: '服务即将重启',
      });
      ctx.helper.command(`sh ${this.app.baseDir}/shell/reload.sh &`);
      // exec(`reboot`);
      // setTimeout(async () => await ctx.helper.command(`shutdown -r now`), 5000);
    } else {
      ctx.helper.response({
        data: '成功',
      });
    }
  }
}

module.exports = settingsController;

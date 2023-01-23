/** @format */

const Service = require('egg').Service;

class UserService extends Service {
  async register(params) {
    const { ctx } = this;

    const { username, password, secret } = params;

    const { config } = ctx.app.config;

    await ctx.model.User.sync({ force: true });

    const data = await ctx.model.User.create({ username, password, secret, config });
    delete data['password'];
    delete data['secret'];
    return ctx.helper.success(data);
  }
  async updateUserOne(params) {
    const { ctx } = this;

    const { username, password, secret } = params;

    const data = await ctx.model.User.update({ password }, { where: { username, secret } });

    return ctx.helper.success(data);
  }
  async findUserOne(params) {
    const { ctx } = this;
    const data = await ctx.model.User.findOne({
      where: params,
      attributes: {
        exclude: ['secret'],
      },
    });
    return ctx.helper.success(data);
  }
  async findUserCount() {
    const { ctx } = this;
    const data = await ctx.model.User.findAndCountAll({ where: {} });
    return ctx.helper.success(data);
  }
}

module.exports = UserService;

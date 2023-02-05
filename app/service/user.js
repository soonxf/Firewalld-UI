/** @format */

const Service = require('egg').Service;

class UserService extends Service {
  async register({ username, password, secret }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { config } = ctx.app.config;

      await ctx.model.User.sync({ force: true });

      const data = await ctx.model.User.create({ username, password, secret, config });
      delete data['password'];
      delete data['secret'];
      return ctx.helper.success(data);
    });
  }
  async updateUserOne({ username, password, secret }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.User.update({ password }, { where: { username, secret } });

      return ctx.helper.success(data);
    });
  }
  async findUserOne(query) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.User.findOne({
        where: query,
        attributes: {
          exclude: ['secret'],
        },
      });
      return ctx.helper.success(data);
    });
  }
  async findUserCount() {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.User.findAndCountAll({ where: {} });
      return ctx.helper.success(data);
    });
  }
}

module.exports = UserService;

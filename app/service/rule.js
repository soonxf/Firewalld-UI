/** @format */

const Service = require('egg').Service;

class RuleService extends Service {
  async addRule(body) {
    const { ctx, app } = this;
    await ctx.model.Rule.sync();
    // await ctx.model.Rule.sync({ force: true });
    const time = new Date().Format('yyyy-MM-dd hh:mm:ss');
    const data = await ctx.model.Rule.create({
      ...body,
      sort: (await ctx.model.Rule.max('sort')) + 1,
      time,
    });
    await ctx.service.system.addSystem(9, `新建规则 时间${time}`);
    return ctx.helper.success(data);
  }
  async getRule({ page = 1, pageSize = 10 }) {
    const { ctx } = this;
    const data = await ctx.model.Rule.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['sort', 'DESC']],
    });
    return ctx.helper.success(data);
  }
  async updateSortRule({ sorts }) {
    const { ctx } = this;
    for await (let item of sorts) {
      await ctx.model.Rule.update(
        {
          sort: item.sort,
        },
        {
          where: {
            id: item.id,
          },
        }
      );
    }
    return ctx.helper.success({
      data: '成功',
    });
  }
  async deleteRule({ ids }) {
    const { ctx } = this;
    for await (let id of ids) {
      await ctx.model.Rule.destroy({
        where: { id },
      });
      // await ctx.model.Access.sync({ force: true });
    }
    await ctx.service.system.addSystem(10, `删除规则 ${ids.length} 条`);
    return ctx.helper.success({
      data: '成功',
    });
  }
}

module.exports = RuleService;
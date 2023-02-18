/** @format */

const Service = require('egg').Service;

class RuleService extends Service {
  async addRule(body) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Rule.sync();
      // await ctx.model.Rule.sync({ force: true });
      const time = ctx.helper.getFormatNowDate();
      const data = await ctx.model.Rule.create({
        ...body,
        sort: (await ctx.model.Rule.max('sort')) + 1,
        time,
      });
      return ctx.helper.success(data, () => ctx.helper.serviceAddSystem(9, ctx.helper.getMessage.rule(0, { time })));
    });
  }
  async updateRuleEffective({ effective = '', id = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Rule.update(
        {
          effective,
        },
        {
          where: {
            id,
          },
        }
      );
      return ctx.helper.success(ctx.helper.getMessage.common(1));
    });
  }
  async getRule({ page = 1, pageSize = 10, effective = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Rule.findAndCountAll({
        where: ctx.helper.where(
          [ctx.helper.notEmpty(effective)],
          [
            {
              effective: ctx.helper.boolFormat(effective),
            },
          ]
        ),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [['sort', 'DESC']],
      });
      return ctx.helper.success(data);
    });
  }
  async updateSortRule({ sorts }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await sorts.syncEach(
        async item =>
          await ctx.model.Rule.update(
            {
              sort: item.sort,
            },
            {
              where: {
                id: item.id,
              },
            }
          )
      );
      return ctx.helper.success(ctx.helper.getMessage.common(1));
    });
  }
  async deleteRule({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Rule.destroy({
        where: { id: ids },
      });
      ctx.helper.serviceAddSystem(10, ctx.helper.getMessage.rule(1, { count: ids.length }));
      return ctx.helper.success(ctx.helper.getMessage.common(1));
    });
  }
}

module.exports = RuleService;

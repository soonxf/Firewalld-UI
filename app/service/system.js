/** @format */

const Service = require('egg').Service;

class SystemService extends Service {
  async addSystem(type, details) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.System.sync();
      // await ctx.model.Ip.sync();
      // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
      await ctx.model.System.create({
        type,
        details,
        time: new Date().Format('yyyy-MM-dd hh:mm:ss'),
      });
    });
  }
  async getSystem({ page = 1, pageSize = 10, startTime, endTime }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.System.findAndCountAll({
        where: ctx.helper.where(
          [startTime && endTime],
          [
            {
              time: {
                [ctx.helper.seq.Op.between]: ctx.helper.betweenTime(startTime, endTime),
              },
            },
          ]
        ),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [['id', 'DESC']],
      });
      return ctx.helper.success(data);
    });
  }
  async deleteSystem({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      for await (let id of ids) {
        await ctx.model.System.destroy({
          where: { id },
        });
        // await ctx.model.Access.sync({ force: true });
      }
      return ctx.helper.success({
        data: '成功',
      });
    });
  }
}

module.exports = SystemService;

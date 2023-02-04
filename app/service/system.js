/** @format */

const Service = require('egg').Service;

class SystemService extends Service {
  async addSystem({ type = '', details = '', ip = '', user = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.System.sync();
      await ctx.model.System.create({
        ip,
        user,
        type,
        details,
        time: ctx.helper.getFormatNowDate(),
      });
    });
  }
  async getSystem({ page = 1, pageSize = 10, startTime = '', endTime = '', ip = '', type = '', sortProp = 'id', sortOrder = 'DESC' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.System.findAndCountAll({
        where: ctx.helper.where(
          [startTime != '' && endTime != '', ip != '', type != ''],
          [
            {
              time: {
                [ctx.helper.seq().Op.between]: ctx.helper.betweenTime(startTime, endTime),
              },
            },
            {
              ip: {
                [ctx.helper.seq().Op.like]: `%${ip}%`,
              },
            },
            {
              type,
            },
          ]
        ),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [[sortProp, sortOrder]],
      });
      return ctx.helper.success(data);
    });
  }
  async deleteSystem({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.System.destroy({
        where: { id: ids },
      });
      return ctx.helper.success('成功');
    });
  }
}

module.exports = SystemService;

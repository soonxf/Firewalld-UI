/** @format */

const Service = require('egg').Service;

class AccessService extends Service {
  async getAccessLog({ page = 1, site = '', pageSize = 10, ip = '', port = '', startTime = '', endTime = '', sortProp = 'id', sortOrder = 'DESC' }) {
    const { ctx, app } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Access.findAndCountAll({
        raw: true,
        include: [
          {
            attributes: [app.Sequelize.literal('project.name')],
            model: ctx.model.Project,
            as: 'project',
          },
        ],
        where: ctx.helper.where(ctx.helper.notEmpty([[startTime, endTime], port, ip, site]), [
          {
            time: {
              [ctx.helper.seq().Op.between]: ctx.helper.betweenTime(startTime, endTime),
            },
          },
          { port },
          {
            ip: {
              [ctx.helper.seq().Op.like]: `%${ip}%`,
            },
          },
          {
            [ctx.helper.seq().Op.and]: site.split('').map(item => {
              return {
                site: {
                  [ctx.helper.seq().Op.like]: `%${item}%`,
                },
              };
            }),
          },
        ]),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [[sortProp, sortOrder]],
      });
      return ctx.helper.success(data);
    });
  }
  async findAllAccessLog({ ip, startTime = '', endTime = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Access.findAndCountAll({
        where: ctx.helper.where(ctx.helper.notEmpty([[startTime, endTime], ip]), [
          {
            time: {
              [ctx.helper.seq().Op.between]: [startTime, endTime],
            },
          },
          {
            ip,
          },
        ]),
        order: [['id', 'DESC']],
      });
      return ctx.helper.success(data);
    });
  }
  async addAccessLog(body) {
    const { ctx } = this;
    await ctx.model.Access.sync();
    // await ctx.model.Ip.sync();
    // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
    await ctx.model.Access.create({
      ...body,
      num:
        (await ctx.model.Access.count({
          where: {
            ip: body.ip,
          },
        })) + 1,
    });
  }
  async deleteAccessLog({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const count = await ctx.model.Access.destroy({
        where: { id: ids },
      });
      return ctx.helper.success(ctx.helper.getMessage.common(1), () => ctx.helper.serviceAddSystem(8, ctx.helper.getMessage.access(0, { count })));
    });
  }
}

module.exports = AccessService;

const Service = require('egg').Service;

class ProjectService extends Service {
  async creatdProject(params) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Project.sync();
      // await ctx.model.Ip.sync();
      // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
      const findOne = await ctx.model.Project.findOne({ where: { port: params.port } });
      findOne != null && ctx.helper.throw(ctx.helper.getMessage.project(2));

      const data = await ctx.model.Project.create({
        ...params,
        sort: (await ctx.model.Project.max('sort')) + 1,
        time: ctx.helper.getFormatNowDate(),
      });
      return ctx.helper.success(data, () =>
        ctx.helper.serviceAddSystem(
          6,
          ctx.helper.getMessage.project(0, {
            name: params.name,
            port: params.port,
          })
        )
      );
    });
  }
  async getProject({ page = 1, pageSize = 10, portStatus = true }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Project.findAndCountAll({
        // attributes: ['id', 'name', 'port', 'remarks', 'time'],
        // include: [
        //   {
        //     // attributes: [],
        //     model: ctx.model.Access,
        //     as: 'access',
        //   },
        // ],
        // raw: true,
        offset: (page - 1) * pageSize,
        limit: pageSize,
        // group: ['Project.port'],
        order: [['sort', 'DESC']],
      });

      portStatus && (data.rows = await ctx.helper.commandQueryportStatus(data.rows));

      return ctx.helper.success(data);
    });
  }
  async updateProject({ id = '', name = '', remarks = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Project.update(ctx.helper.where(ctx.helper.notEmpty([name, remarks]), [{ name }, { remarks }]), {
        where: {
          id,
        },
      });
      return ctx.helper.success(data);
    });
  }
  async updateSortProject({ sorts }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await sorts.forEach(
        async item =>
          await ctx.model.Project.update(
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
  async deleteProject({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { rows } = await ctx.model.Project.findAndCountAll({
        where: { id: ids },
      });

      rows.forEach(item =>
        ctx.helper.serviceAddSystem(
          7,
          ctx.helper.getMessage.project(1, {
            name: item.name,
            port: item.port,
          })
        )
      );

      await ctx.model.Project.destroy({
        where: { id: ids },
      });

      return ctx.helper.success(ctx.helper.getMessage.common(1));
    });
  }
}

module.exports = ProjectService;

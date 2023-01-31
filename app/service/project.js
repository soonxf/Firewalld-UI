const Service = require('egg').Service;

class ProjectService extends Service {
  async creatdProject(params) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Project.sync();
      // await ctx.model.Ip.sync();
      // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
      const findOne = await ctx.model.Project.findOne({ where: { port: params.port } });
      findOne != null && ctx.helper.throw(`已经绑定过端口${params.port}`);

      const data = await ctx.model.Project.create({
        ...params,
        sort: (await ctx.model.Project.max('sort')) + 1,
        time: ctx.helper.getFormatNowDate(),
      });
      return ctx.helper.success(data, () => ctx.helper.serviceAddSystem(6, `新建项目,项目名称:${params.name} 项目端口:${params.port}`));
    });
  }
  async getProject({ page = 1, pageSize = 10 }) {
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
      return ctx.helper.success(data);
    });
  }
  async updateProject({ id, name, remarks }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Project.update(ctx.helper.where([name, remarks], [{ name }, { remarks }]), {
        where: ctx.helper.where([id], [{ id }]),
      });

      return ctx.helper.success(data);
    });
  }
  async updateSortProject({ sorts }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      for await (let item of sorts) {
        await ctx.model.Project.update(
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
      return ctx.helper.success('成功');
    });
  }
  async deleteProject({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { rows } = await ctx.model.Project.findAndCountAll({
        where: { id: ids },
      });

      rows.forEach(item => ctx.helper.serviceAddSystem(7, `删除项目,项目名称:${item.name} 项目端口:${item.port}`));

      await ctx.model.Project.destroy({
        where: { id: ids },
      });

      return ctx.helper.success('成功');
    });
  }
}

module.exports = ProjectService;

const Service = require('egg').Service;

class ProjectService extends Service {
  async creatdProject(params) {
    const { ctx } = this;
    const { port } = params;
    await ctx.model.Project.sync();
    // await ctx.model.Ip.sync();
    // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
    const findOne = await ctx.model.Project.findOne({ where: { port: port } });
    findOne != null && ctx.helper.throw(`已经绑定过端口${port}`);

    const data = await ctx.model.Project.create({
      ...params,
      sort: (await ctx.model.Project.max('sort')) + 1,
      time: ctx.helper.getFormatNowDate(),
    });
    ctx.service.system.addSystem(6, `新建项目,项目名称:${params.name} 项目端口:${params.port}`);
    return ctx.helper.success(data);
  }
  async getProject({ page = 1, pageSize = 10 }) {
    const { ctx } = this;

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
  }
  async updateProject({ id, name, remarks }) {
    const { ctx } = this;

    const data = await ctx.model.Project.update(ctx.helper.where([name, remarks], [{ name }, { remarks }]), {
      where: ctx.helper.where([id], [{ id }]),
    });

    return ctx.helper.success(data);
  }
  async updateSortProject({ sorts }) {
    const { ctx } = this;
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
    return ctx.helper.success({
      data: '成功',
    });
  }
  async deleteProject({ ids }) {
    const { ctx } = this;
    for await (let id of ids) {
      const response = await ctx.model.Project.findOne({
        where: { id },
      });
      await ctx.service.system.addSystem(7, `删除项目,项目名称:${response.name} 项目端口:${response.port}`);
      await ctx.model.Project.destroy({
        where: { id },
      });
    }
    return ctx.helper.success({
      data: '成功',
    });
  }
}

module.exports = ProjectService;

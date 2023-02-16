/** @format */

'use strict';

const { Controller } = require('egg');

class ProjectController extends Controller {
  async creatdProject() {
    const { ctx } = this;

    ctx.validate({
      name: { type: 'string', required: true },
      port: { type: 'number', required: true },
      remarks: { type: 'string', required: false },
      portStatus: { type: 'array', required: false },
    });

    const body = ctx.request.body;
    const { portStatus = [], port } = body;

    const success = ctx.helper._.isEmpty(portStatus)
      ? true
      : (await portStatus.syncMap(async protocol => await ctx.helper.triggerChangePort(true, port, protocol))).every(item => item);

    // console.log(success);
    success || ctx.helper.throw('创建失败');

    const { data } = await ctx.service.project.creatdProject(body);

    ctx.helper.response({ data });
  }
  async getProject() {
    const { ctx } = this;

    ctx.validate(
      {
        page: { type: 'number', required: false },
        pageSize: { type: 'number', required: false },
        portStatus: { type: 'boolean', required: false },
      },
      ctx.request.query
    );

    const query = ctx.request.query;

    const { data } = await ctx.service.project.getProject(query);
    ctx.helper.response({ data });
  }
  async updateProject() {
    const { ctx } = this;

    ctx.validate({
      id: { type: 'string', required: true },
      remarks: { type: 'string', required: false },
      name: { type: 'string', required: false },
    });

    const params = ctx.request.body;

    const { data } = await ctx.service.project.updateProject(params);
    ctx.helper.response({ data });
  }
  async deleteProject() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array', required: true },
      removePorts: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { removePorts = [] } = body;

    const message = [];
    const success = ctx.helper._.isEmpty(removePorts)
      ? true
      : (
          await removePorts.syncMap(async item => {
            let tcp = true;
            let udp = true;
            if (item.protocol[0] === 'tcp') {
              tcp = await ctx.helper.triggerChangePort(false, item.port, item.protocol[0]);
              tcp || message.push(`${item.protocol[0]} ${item.port}`);
            }
            if (item.protocol[1] === 'udp') {
              udp = await ctx.helper.triggerChangePort(false, item.port, item.protocol[1]);
              udp || message.push(`${item.protocol[1]} ${item.port}`);
            }
            return tcp && udp;
          })
        ).every(item => item);

    success || ctx.helper.throw(`失败,错误原因:${message.join(',')}`);

    const { data } = await ctx.service.project.deleteProject(body);

    ctx.helper.response({ data });
  }
  async updateSortProject() {
    const { ctx } = this;
    ctx.validate({
      sorts: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.project.updateSortProject(body);
    ctx.helper.response({ data });
  }
  async updateProjectPortStatus() {
    const { ctx } = this;
    ctx.validate({
      status: { type: 'boolean', required: true },
      port: { type: 'number', required: true },
      protocol: { type: 'string', required: true },
    });
    const { port, protocol = 'tcp', status = true } = ctx.request.body;
    const success = await ctx.helper.triggerChangePort(status, port, protocol);
    ctx.helper.response({ data: success });
  }
}

module.exports = ProjectController;

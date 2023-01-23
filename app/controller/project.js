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
    });

    const { name, port, remarks } = ctx.request.body;

    const response = await ctx.service.project.creatdProject({ name, port, remarks });
    ctx.helper.response({ data: response.data });
  }
  async getProject() {
    const { ctx } = this;

    ctx.validate(
      {
        page: { type: 'number', required: false },
        pageSize: { type: 'number', required: false },
      },
      ctx.request.query
    );

    const query = ctx.request.query;

    const response = await ctx.service.project.getProject(query);
    ctx.helper.response({ data: response.data });
  }
  async updateProject() {
    const { ctx } = this;

    ctx.validate({
      id: { type: 'number', required: true },
      remarks: { type: 'string', required: false },
      name: { type: 'string', required: false },
    });

    const params = ctx.request.body;

    const response = await ctx.service.project.updateProject(params);
    ctx.helper.response({ data: response.data });
  }
  async deleteProject() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array', required: true },
    });
    const body = ctx.request.body;
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
}

module.exports = ProjectController;

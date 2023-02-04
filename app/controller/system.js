/** @format */

'use strict';

const { Controller } = require('egg');

class SystemController extends Controller {
  async getSystem() {
    const { ctx } = this;
    ctx.validate(
      {
        type: { type: 'string', required: false },
        ip: { type: 'string', required: false },
        page: { type: 'number', required: false },
        pageSize: { type: 'number', required: false },
        startTime: { type: 'date', trim: true, required: false },
        endTime: { type: 'date', trim: true, required: false },
        sortProp: { type: 'string', required: false },
        sortOrder: { type: 'string', required: false },
      },
      ctx.request.query
    );
    const query = ctx.request.query;
    const { data } = await ctx.service.system.getSystem(query);
    ctx.helper.response({ data });
  }
  async deleteSystem() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.system.deleteSystem(body);
    ctx.helper.response({ data });
  }
}

module.exports = SystemController;

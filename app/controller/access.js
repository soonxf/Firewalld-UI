/** @format */

'use strict';

const { Controller } = require('egg');

class AccessController extends Controller {
  async getAccessLog() {
    const { ctx } = this;
    ctx.validate(
      {
        page: { type: 'number', required: false },
        pageSize: { type: 'number', required: false },
        ip: { type: 'string', trim: true, required: false },
        port: { type: 'number', required: false },
        startTime: { type: 'date', trim: true, required: false },
        endTime: { type: 'date', trim: true, required: false },
      },
      ctx.request.query
    );
    const query = ctx.request.query;
    const { data } = await ctx.service.access.getAccessLog(query);
    ctx.helper.response({ data });
  }
  async deleteAccessLog() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.access.deleteAccessLog(body);
    ctx.helper.response({ data });
  }
}

module.exports = AccessController;

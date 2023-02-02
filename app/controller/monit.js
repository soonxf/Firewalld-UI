/** @format */

'use strict';

const { Controller } = require('egg');

class MonitController extends Controller {
  async getMonitData() {
    const { ctx } = this;
    ctx.validate(
      {
        endTime: { type: 'date', trim: true, required: false },
        endTime: { type: 'date', trim: true, required: false },
      },
      ctx.request.query
    );
    const query = ctx.request.query;
    const { data } = await ctx.service.monit.getMonitData(query);
    ctx.helper.response({ data });
  }
}

module.exports = MonitController;

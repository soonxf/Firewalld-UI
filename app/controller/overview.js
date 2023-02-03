/** @format */

'use strict';

const { Controller } = require('egg');

class OverviewController extends Controller {
  async getOverview() {
    const { ctx } = this;
    ctx.validate(
      {
        endTime: { type: 'date', trim: true, required: false },
        endTime: { type: 'date', trim: true, required: false },
      },
      ctx.request.query
    );
    const query = ctx.request.query;
    const { data } = await ctx.service.overview.getOverview(query);
    ctx.helper.response({ data });
  }
  async overviewStartFirewall() {
    const { ctx } = this;
    const { data } = await ctx.service.overview.overviewStartFirewall();
    ctx.helper.response({ data });
  }
  async overviewStopFirewall() {
    const { ctx } = this;
    const { data } = await ctx.service.overview.overviewStopFirewall();
    ctx.helper.response({ data });
  }
}

module.exports = OverviewController;

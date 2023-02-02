/** @format */

'use strict';

const { Controller } = require('egg');

class MonitController extends Controller {
  async getMonitData() {
    const { ctx } = this;
    const { data } = await ctx.service.monit.getMonitData();
    ctx.helper.response({ data });
  }
}

module.exports = MonitController;

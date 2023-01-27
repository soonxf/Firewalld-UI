/** @format */

'use strict';

const { Controller } = require('egg');

class BlacklistController extends Controller {
  async getBlacklist() {
    const { ctx } = this;
    ctx.validate(
      {
        page: { type: 'number', required: false },
        pageSize: { type: 'number', required: false },
        port: { type: 'number', required: false },
        ip: { type: 'string', trim: true, required: false },
        startTime: { type: 'date', trim: true, required: false },
        endTime: { type: 'date', trim: true, required: false },
        sortProp: { type: 'string', required: false },
        sortOrder: { type: 'string', required: false },
      },
      ctx.query
    );
    const query = ctx.request.query;
    const { data } = await ctx.service.blacklist.getBlacklist(query);
    ctx.helper.response({ data });
  }
  async deleteBlacklist() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.blacklist.deleteBlacklist(body);
    ctx.helper.response({ data });
  }
  async findBlacklistOne() {
    const { ctx } = this;
    ctx.validate(
      {
        ip: { type: 'string', required: true },
      },
      ctx.request.query
    );
    const query = ctx.request.query;
    const { data } = await ctx.service.blacklist.findBlacklistOne(query);
    ctx.helper.response({ data });
  }
  async addBlacklist() {
    const { ctx } = this;
    ctx.validate({
      ip: { type: 'string', required: true },
      port: { type: 'number', required: false },
      expirationTime: { type: 'string', required: true },
      site: { type: 'string', required: false },
      time: { type: 'string', required: true },
    });

    const body = ctx.request.body;
    const site = ctx.request.body?.site ?? ctx.helper.searcher.memorySearchSync(body.ip);
    const { data } = await ctx.service.blacklist.addBlacklist({
      ...body,
      site,
    });
    ctx.helper.response({ data });
  }
  async addMultipleBlacklists() {
    const { ctx } = this;

    ctx.validate({
      list: {
        type: 'array',
        itemType: 'object',
        rule: {
          ip: { type: 'string', required: true },
          port: { type: 'number', required: false },
          expirationTime: { type: 'string', required: true },
          site: { type: 'string', required: false },
          time: { type: 'string', required: true },
        },
      },
    });

    const body = ctx.request.body.list;
    body.forEach((item, index) => item.site || (item.site = ctx.helper.searcher.memorySearchSync(body.ip)));
    const { data } = await ctx.service.blacklist.addMultipleBlacklists(body);
    ctx.helper.response({ data });
  }
  async updateBlacklistone() {
    const { ctx } = this;
    ctx.validate({
      ip: { type: 'string', required: true },
      expirationTime: { type: 'string', required: true },
      time: { type: 'string', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.blacklist.updateBlacklistOne(body);
    ctx.helper.response({ data });
  }
}

module.exports = BlacklistController;

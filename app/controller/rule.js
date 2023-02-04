/** @format */

'use strict';

const { Controller } = require('egg');

class RuleController extends Controller {
  async getRule() {
    const { ctx } = this;
    const query = ctx.request.query;
    const { data } = await ctx.service.rule.getRule(query);
    ctx.helper.response({ data });
  }
  async addRule() {
    const { ctx } = this;
    ctx.validate({
      ips: { type: 'array', required: true },
      sites: { type: 'array', trim: true, required: true },
      ports: { type: 'array', trim: true, required: true },
      limitShield: { type: 'number', trim: true, required: true },
      limitTotal: { type: 'number', trim: true, required: true },
      unblocked: { type: 'boolean', required: true },
      limitDisabled: { type: 'boolean', trim: true, required: true },
      abroadDisabled: { type: 'boolean', required: true },
      effective: { type: 'boolean', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.rule.addRule(body);
    ctx.helper.response({ data });
  }
  async updateRuleEffective() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'number', trim: true, required: true },
      effective: { type: 'boolean', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.rule.updateRuleEffective(body);
    ctx.helper.response({ data });
  }
  async updateSortRule() {
    const { ctx } = this;
    ctx.validate({
      sorts: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.rule.updateSortRule(body);
    ctx.helper.response({ data });
  }
  async deleteRule() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array', required: true },
    });
    const body = ctx.request.body;
    const { data } = await ctx.service.rule.deleteRule(body);
    ctx.helper.response({ data });
  }
}

module.exports = RuleController;

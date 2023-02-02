/** @format */

'use strict';

const Service = require('egg').Service;
const path = require('path');
const CN = require(path.join(__dirname, '../../CN.json'));
class MonitController extends Service {
  async getMonitData() {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const properties = CN.features.map(item => {
        return {
          site: item.properties.name.replace(/[\\市,\\省,\\特别行政区\\回族自治区]/, ''),
          name: item.properties.name,
        };
      });
      const response = [];
      for await (let item of properties) {
        const count = await ctx.model.Access.count({
          where: {
            site: { [ctx.helper.seq().Op.like]: `%${item.site}%` },
          },
          order: [['id', 'DESC']],
        });
        item.name != '' &&
          response.push({
            name: item.name,
            value: count,
          });
      }
      return ctx.helper.success({ data: response, CN });
    });
  }
}

module.exports = MonitController;

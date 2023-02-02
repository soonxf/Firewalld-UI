/** @format */

'use strict';

const Service = require('egg').Service;
const path = require('path');
const CN = require(path.join(__dirname, '../../CN.json'));
class MonitController extends Service {
  async getMonitData({ startTime = '', endTime = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const properties = CN.features.map(item => ({
        site: item.properties.name?.replace?.(/[\"市",\"省",\"特别行政区",\"自治区",\"回族",\"壮族",\"维吾尔"]/g, ''),
        name: item.properties.name,
      }));
      const response = [];
      for await (let item of properties) {
        if (item.name == '') continue;
        const count = await ctx.model.Access.count({
          where: ctx.helper.where(
            [true, startTime != '' && endTime != ''],
            [
              {
                site: {
                  [ctx.helper.seq().Op.like]: `%${item.site}%`,
                },
              },
              {
                time: {
                  [ctx.helper.seq().Op.between]: [startTime, endTime],
                },
              },
            ]
          ),
        });
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

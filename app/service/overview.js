/** @format */

'use strict';

const Service = require('egg').Service;

class OverviewController extends Service {
  async getOverview({ startTime = '', endTime = '' }) {
    const { ctx } = this;

    return await ctx.helper.seqTransaction(async () => {
      const nameListCount = await ctx.model.Blacklist.count();
      const accessCount = await ctx.model.Access.count();
      const ruleCount = await ctx.model.Rule.count();

      const firewalldStatus = await ctx.helper.getFirewalldStatus();

      const { rangeDate } = ctx.helper.controllerGetOverview(startTime, endTime);

      const access = (
        await rangeDate.syncMap(async item => ({
          date: item.date,
          count: await ctx.model.Access.count({
            where: ctx.helper.where(
              [true],
              [
                {
                  time: {
                    [ctx.helper.seq().Op.between]: [item.startTime, item.endTime],
                  },
                },
              ]
            ),
          }),
        }))
      ).reverse();

      const response = { firewalldStatus, nameListCount, accessCount, access, ruleCount };

      return ctx.helper.success(response);
    });
  }
  async overviewStartFirewall() {
    const { ctx, app } = this;
    return await ctx.helper.seqTransaction(
      async () => {
        const { success } = await ctx.helper.command('systemctl start firewalld');
        await app.startUp(false);
        return ctx.helper.success(success, () =>
          ctx.helper.serviceAddSystem(12, `开启防火墙${success ? '成功' : '失败'} 时间:${ctx.helper.getFormatNowDate()}`)
        );
      },
      async () => await ctx.helper.command('systemctl stop firewalld')
    );
  }
  async overviewStopFirewall() {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { success } = await ctx.helper.command('systemctl stop firewalld');
      return ctx.helper.success(success, () =>
        ctx.helper.serviceAddSystem(12, `关闭防火墙${success ? '成功' : '失败'} 时间:${ctx.helper.getFormatNowDate()}`)
      );
    });
  }
}

module.exports = OverviewController;

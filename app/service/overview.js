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

      const { stdout, stderr, err } = await ctx.helper.command('firewall-cmd --state');

      const firewalldStatus = stderr && err ? false : stdout.indexOf('running') == -1 ? false : true;

      const str = new Date(startTime == '' ? new Date(new Date().Format('yyyy-MM-dd')).getTime() - 1296000000 : `${startTime}`).getTime() - 86400000;

      const end = new Date(endTime == '' ? ctx.helper.getFormatNowDate('yyyy-MM-dd') : `${endTime}`).getTime();

      const day = Math.floor((end - str) / (24 * 3600 * 1000));

      const rangeDate = Array.from({ length: day }).map((item, index) => {
        const date = end - 86400000 * index;
        return {
          date: new Date(date).Format('yyyy-MM-dd'),
          startTime: ctx.helper.getFormatDate(date, 'yyyy-MM-dd 00:00:00'),
          endTime: ctx.helper.getFormatDate(date, 'yyyy-MM-dd 23:59:59'),
        };
      });

      const access = await rangeDate.syncMap(async item => ({
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
      }));

      const response = { firewalldStatus, nameListCount, accessCount, access: access.reverse(), ruleCount };

      return ctx.helper.success(response);
    });
  }
  async overviewStartFirewall() {
    const { ctx, app } = this;
    return await ctx.helper.seqTransaction(
      async () => {
        const { stdout, stderr, err } = await ctx.helper.command('systemctl start firewalld');
        await app.startUp(false);
        const response = stderr && err ? false : stdout == '' ? true : false;
        return ctx.helper.success(response, () =>
          ctx.helper.serviceAddSystem(12, `开启防火墙${response ? '成功' : '失败'} 时间:${ctx.helper.getFormatNowDate()}`)
        );
      },
      async () => await ctx.helper.command('systemctl stop firewalld')
    );
  }
  async overviewStopFirewall() {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { stdout, stderr, err } = await ctx.helper.command('systemctl stop firewalld');
      const response = stderr && err ? false : stdout == '' ? true : false;
      return ctx.helper.success(response, () =>
        ctx.helper.serviceAddSystem(12, `关闭防火墙${response ? '成功' : '失败'} 时间:${ctx.helper.getFormatNowDate()}`)
      );
    });
  }
}

module.exports = OverviewController;

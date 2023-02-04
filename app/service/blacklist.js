/** @format */
const Service = require('egg').Service;

class BlacklistService extends Service {
  async addMultipleBlacklists(body = []) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const success = await body.syncMap(async item => await ctx.service.blacklist.addBlacklist(item));
      return ctx.helper.success(success.map(item => item.data));
    });
  }
  async addBlacklist({ ip = '', time = '', expirationTime = '', site = '', port = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      ctx.helper.tcpkill(ip);

      const expirationTimeFormat = ctx.helper.getFormatDate(new Date(time).getTime() + expirationTime * 1000);

      const response = await ctx.service.blacklist.findBlacklistOne({ ip }, true);

      if (response.equalNull)
        return ctx.helper.success(await ctx.helper.blacklistCreate({ ip, expirationTime, site, port, time, expirationTimeFormat }));

      const unblocked = response?.data?.unblocked ?? false;

      const message = unblocked ? '重新加入黑名单成功' : '修改还在屏蔽中的黑名单时间成功';

      const systemMessage = unblocked
        ? `重新加入黑名单 IP: ${ip} 地点: ${site} 端口: ${port} 屏蔽时间 ${expirationTimeFormat}`
        : `修改还在屏蔽黑名单的时间 IP: ${ip} 地点: ${site} 端口: ${port} 屏蔽时间 ${expirationTimeFormat}`;

      const { data: success } = await ctx.service.blacklist.updateBlacklistOne({ ip, expirationTime, time, remove: unblocked == false });

      return ctx.helper.success({ ip, success, message: success ? message : '重新加入或者修改还在屏蔽中的黑名单时间失败' }, () =>
        ctx.helper.serviceAddSystem(4, systemMessage)
      );
    });
  }
  async findBlacklistOne({ ip }, raw = false) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const response = await ctx.model.Blacklist.findOne({ where: { ip } });
      if (raw) return ctx.helper.success(response);
      const firewallStatus = await ctx.helper.commandQueryIpRule(ip);
      response?.setDataValue?.('firewallStatus', firewallStatus);
      return ctx.helper.success(response == null ? { firewallStatus } : response);
    });
  }
  // unblocked true 是超过屏蔽时间 false 是正在屏蔽
  async updateBlacklistOne({ ip = '', expirationTime = '', time = '', remove = false }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Blacklist.update(
        { time, expirationTime, expirationTimeFormat: ctx.helper.getFormatDate(new Date(time).getTime() + expirationTime * 1000) },
        { where: { ip } }
      );

      ctx.helper.ipsCachePut(ip, { ip, expirationTime, time }, expirationTime);

      remove && (await ctx.helper.command(`firewall-cmd  --remove-rich-rule "rule family="ipv4" source address="${ip}" drop"`));

      return ctx.helper.success(await ctx.helper.dropCommand(ip, expirationTime));
    });
  }
  async getBlacklist({
    page = 1,
    pageSize = 10,
    ip = '',
    site = '',
    port = '',
    startTime = '',
    endTime = '',
    unblocked = '',
    sortProp = 'id',
    sortOrder = 'DESC',
  }) {
    const { ctx, app } = this;
    return await ctx.helper.seqTransaction(async () => {
      const response = await ctx.model.Blacklist.findAndCountAll({
        attributes: [
          'expirationTime',
          'expirationTimeFormat',
          'id',
          'ip',
          'port',
          'site',
          'time',
          'unblockedText',
          'unblocked',
          [app.Sequelize.col('project.name'), 'name'],
        ],
        include: [
          {
            attributes: [],
            model: ctx.model.Project,
            as: 'project',
          },
        ],
        where: ctx.helper.where(
          [startTime != '' && endTime != '', port != '', ip != '', unblocked != '', site != ''],
          [
            {
              time: {
                [ctx.helper.seq().Op.between]: ctx.helper.betweenTime(startTime, endTime),
              },
            },
            { port },
            {
              ip: {
                [ctx.helper.seq().Op.like]: `%${ip}%`,
              },
            },
            {
              expirationTimeFormat: {
                [unblocked == 'true' ? ctx.helper.seq().Op.lte : ctx.helper.seq().Op.gte]: ctx.helper.getFormatNowDate(),
              },
            },
            {
              [ctx.helper.seq().Op.and]: site.split('').map(item => {
                return {
                  site: {
                    [ctx.helper.seq().Op.like]: `%${item}%`,
                  },
                };
              }),
            },
          ]
        ),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [[sortProp, sortOrder]],
      });
      return ctx.helper.success(response);
    });
  }
  async deleteBlacklist({ ids }) {
    const { ctx, app } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { rows } = await ctx.model.Blacklist.findAndCountAll({
        where: {
          id: ids,
        },
      });

      await rows?.syncEach(async item => {
        ctx.helper.ipsCacheDel(item.ip);

        item?.unblocked || (await ctx.helper.command(`firewall-cmd  --remove-rich-rule "rule family="ipv4" source address="${item.ip}" drop"`));

        ctx.helper.serviceAddSystem(5, item?.unblocked ? `移除已解禁黑名单 IP ${item.ip}` : `移除屏蔽中黑名单 IP ${item.ip}`);
      });

      const response = await ctx.model.Blacklist.destroy({
        where: { id: ids },
      });

      return ctx.helper.success(response);
    });
  }
}

module.exports = BlacklistService;

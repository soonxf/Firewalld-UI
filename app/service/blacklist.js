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

      const remove = await ctx.helper.commandQueryIpRule(ip);

      if (response.equalNull)
        return ctx.helper.success(await ctx.helper.blacklistCreate({ ip, expirationTime, site, port, time, expirationTimeFormat }));

      const unblocked = response?.data?.unblocked ?? false;

      const message = unblocked ? ctx.helper.getMessage.blacklist(0) : ctx.helper.getMessage.blacklist(1);

      const { data: success } = await ctx.service.blacklist.updateBlacklistOne({ ip, expirationTime, time, remove: unblocked == false || remove });

      return ctx.helper.success({ ip, success, message: success ? message : ctx.helper.getMessage.blacklist(4) }, () =>
        ctx.helper.serviceAddSystem(
          4,
          unblocked
            ? ctx.helper.getMessage.blacklist(2, {
                ip,
                site,
                port,
                expirationTimeFormat,
              })
            : ctx.helper.getMessage.blacklist(3, {
                ip,
                site,
                port,
                expirationTimeFormat,
              })
        )
      );
    });
  }
  async findBlacklistOne({ ip }, raw = false) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Blacklist.findOne({ where: { ip } });
      if (raw) return ctx.helper.success(data);
      const firewallStatus = await ctx.helper.commandQueryIpRule(ip);
      data?.setDataValue?.('firewallStatus', firewallStatus);
      return ctx.helper.success(data == null ? { firewallStatus } : data);
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

      remove && (await ctx.helper.removeDrop(ip));

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
        where: ctx.helper.where(ctx.helper.notEmpty([[startTime, endTime], port, ip, unblocked, site]), [
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
              [ctx.helper.boolFormat(unblocked) ? ctx.helper.seq().Op.lte : ctx.helper.seq().Op.gte]: ctx.helper.getFormatNowDate(),
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
        ]),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [[sortProp, sortOrder]],
      });
      return ctx.helper.success(response);
    });
  }
  async deleteBlacklist({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const { rows } = await ctx.model.Blacklist.findAndCountAll({
        where: {
          id: ids,
        },
      });

      await rows?.syncEach(async item => await ctx.helper.removeDrop(item.ip, item?.unblocked == false));

      const response = await ctx.model.Blacklist.destroy({
        where: { id: ids },
      });

      return ctx.helper.success(response);
    });
  }
}

module.exports = BlacklistService;

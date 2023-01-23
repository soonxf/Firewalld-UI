/** @format */

const Service = require('egg').Service;

class BlacklistService extends Service {
  async addBlacklist({ ip = '', time = '', expirationTime = '', site = '', port = '' }) {
    const { app, ctx } = this;
    const expirationTimeFormat = ctx.helper.getFormatDate(new Date(time).getTime() + expirationTime * 1000);
    const response = await ctx.service.blacklist.findBlacklistOne({ ip });

    const drop = async () => {
      const { stdout, stderr, err } = await ctx.helper.drop(ip, expirationTime);
      stdout && app.getLogger('drop').info('黑名单', `ip ${ip}  禁止时间  ${expirationTime} 秒`);
      stderr && app.getLogger('drop').info('黑名单', `重复加入 ${ip}`);
      err && app.getLogger('drop').info('黑名单', `加入黑名单失败 ${ip}`);
      return stderr || err ? false : true;
    };

    if (response.equalNull) {
      if (await drop()) {
        await ctx.model.Blacklist.sync();
        // await ctx.model.Ip.sync();
        // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
        const blacklist = await ctx.model.Blacklist.create({ ip, expirationTime, site, port, time, expirationTimeFormat });
        await blacklist.save();
        ctx.helper.ipsCacheDel(ip);
        ctx.helper.ipsCachePut(ip, { ip, port, fullSite: site, expirationTime }, expirationTime);
        await ctx.service.system.addSystem(4, `加入黑名单 IP: ${ip} 地点: ${site} 端口: ${port} 屏蔽时间 ${expirationTimeFormat}`);
        return ctx.helper.success({ ip, success: true, message: '成功' });
      } else {
        await this.ctx.service.system.addSystem(4, `加入黑名单失败,可能已经加入防火墙 IP: ${ip} 地点: ${site} 端口: ${port}`);
        return ctx.helper.success({ ip, success: true, message: '成功' });
      }
    } else if (response.data?.unblocked) {
      await ctx.service.blacklist.updateBlacklistOne({ ip, expirationTime, time, remove: false });
      await ctx.service.system.addSystem(4, `重新加入黑名单 IP: ${ip} 地点: ${site} 端口: ${port} 屏蔽时间 ${expirationTimeFormat}`);
      return ctx.helper.success({ ip, success: true, message: '重新加入黑名单成功' });
    } else {
      await ctx.service.blacklist.updateBlacklistOne({ ip, expirationTime, time, remove: true });
      await ctx.service.system.addSystem(4, `修改还在屏蔽黑名单的时间 IP: ${ip} 地点: ${site} 端口: ${port} 屏蔽时间 ${expirationTimeFormat}`);
      return ctx.helper.success({ ip, success: true, message: '修改还在屏蔽黑名单的时间成功' });
    }
  }
  async findBlacklistOne({ ip }) {
    const { ctx } = this;
    const response = await ctx.model.Blacklist.findOne({ where: { ip } });
    return ctx.helper.success(response);
  }
  // unblocked true 是超过屏蔽时间 false 是正在屏蔽
  async updateBlacklistOne({ ip = '', expirationTime = '', time = '', remove = false }) {
    const { app, ctx } = this;

    await ctx.model.Blacklist.update(
      { time, expirationTime, expirationTimeFormat: ctx.helper.getFormatDate(new Date(time).getTime() + expirationTime * 1000) },
      { where: { ip } }
    );

    ctx.helper.ipsCacheDel(ip);
    ctx.helper.ipsCachePut(ip, { ip, expirationTime, time }, expirationTime);

    remove && (await ctx.helper.command(`firewall-cmd  --remove-rich-rule "rule family="ipv4" source address="${ip}" drop"`));

    const drop = async () => {
      const { stdout, stderr, err } = await ctx.helper.drop(ip, expirationTime);
      stdout && app.getLogger('drop').info('黑名单', `ip ${ip}  禁止时间  ${expirationTime} 秒`);
      stderr && app.getLogger('drop').info('黑名单', `重复加入 ${ip}`);
      err && app.getLogger('drop').info('黑名单', `加入黑名单失败 ${ip}`);
      return stderr || err ? false : true;
    };

    ctx.helper.success((await drop()) ? '失败' : '成功');
  }
  async getBlacklist({ page = 1, pageSize = 10, ip = '', port = '', startTime = '', endTime = '', unblocked }) {
    const { ctx, app } = this;
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
        [startTime && endTime, port, ip, unblocked != ''],
        [
          {
            time: {
              [ctx.helper.seq.Op.between]: ctx.helper.betweenTime(startTime, endTime),
            },
          },
          { port },
          {
            ip: {
              [ctx.helper.seq.Op.like]: `%${ip}%`,
            },
          },
          {
            expirationTimeFormat: {
              [unblocked == 'true' ? ctx.helper.seq.Op.lte : ctx.helper.seq.Op.gte]: ctx.helper.getFormatNowDate(),
            },
          },
        ]
      ),
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
    });
    return ctx.helper.success(response);
  }
  async deleteBlacklist({ ids }) {
    const { ctx, app } = this;

    for await (let id of ids) {
      const data = await ctx.model.Blacklist.findOne({
        where: { id },
      });

      await ctx.helper.command(`firewall-cmd  --remove-rich-rule "rule family="ipv4" source address="${data.ip}" drop"`);

      await ctx.model.Blacklist.destroy({
        where: { id },
      });
      ctx.helper.ipsCacheDel(data.ip);

      await this.ctx.service.system.addSystem(5, `移除黑名单 IP ${data.ip}`);
      app.getLogger('drop').info('黑名单', `删除 IP ${data.ip}`);
    }

    // const res = stderr || err ? false : true;
    // res && (await app.startUp(false));

    return ctx.helper.success({
      data: '成功',
    });
  }
}

module.exports = BlacklistService;

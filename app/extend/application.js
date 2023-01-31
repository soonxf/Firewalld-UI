const path = require('path');
const { exec } = require('child_process');
const directory = path.join(__dirname, '../validate');

module.exports = {
  //查询是否刚开机查询黑名单(开机180秒内启动即算刚开机),
  ipsCache: [],
  isStartUp() {
    const { ctx } = this;
    return new Promise(async (resolve, reject) => {
      if (this.env == 'prod') {
        try {
          const { stdout, stderr, err } = await ctx.helper.command(`cat /proc/uptime`);
          if (stderr || err) {
            ctx.helper.serviceAddSystem(11, `查询开机时间失败,请检查 cat /proc/uptime 命令是否正常`);
            resolve(false);
          } else {
            const time = this.config?.startupTime ?? 300;
            const startTime = stdout.split(/\s{1,}/)?.[0] ?? 1000000;
            ctx.helper.serviceAddSystem(11, `查询开机时间成功,开机时间 ${startTime} 秒`);
            resolve(startTime < time ? true : false);
          }
        } catch (e) {
          console.log('');
          this.getLogger('system').info('', `------------------查询开机时间失败 err------------------`);
          console.log('');
          ctx.helper.serviceAddSystem(11, `查询开机时间失败,请检查 cat /proc/uptime 命令是否正常`);
          resolve(false);
        }
      } else {
        console.log('');
        this.getLogger('system').info('', `------------------${this.env} 环境不校验开机时间------------------`);
        console.log('');
        resolve(false);
      }
    });
  },
  async startUp(del = true) {
    if (this.env == 'local') return;
    let reload = false;
    const { ctx } = this;
    const startUp = await this.isStartUp();
    startUp == false && del && (reload = true);
    //在数据库中查询黑名单,查询到的重新添加到防火墙规则中(因为开机会丢失非永久性的防火墙富规则)
    const { data } = await ctx.service.blacklist.getBlacklist({ page: 1, pageSize: 10000 });
    data.rows = data?.rows ?? [];
    for await (let item of data?.rows) {
      //0表示永久禁用
      if (item.expirationTime == 0) continue;

      //小于0表示已经解封
      if (item.unblocked) continue;

      let surplus = parseInt((item.expirationTime * 1000 - (new Date().getTime() - new Date(item.time).getTime()) / 1000) / 1000);

      ctx.helper.ipsCachePut(item.ip, { ip: item.ip, port: item.port, fullSite: item.site, expirationTime: surplus }, surplus);

      if (reload) {
        this.getLogger('drop').info('重启服务在数据库中查询到黑名单', `${item.port}  ${item.ip}  ${item.site} 禁止时间  ${surplus} 秒`);
        ctx.helper.serviceAddSystem(3, `重启检测到黑名单, IP :${item.ip} 禁止时间:${surplus} 秒`);
      } else {
        const { err, stdout, stderr } = await ctx.helper.drop(item.ip, surplus);
        stdout && del && this.getLogger('drop').info('开机在数据库中查询到黑名单', `${item.port}  ${item.ip}  ${item.site} 禁止时间  ${surplus} 秒`);
        stderr && this.getLogger('drop').info('黑名单', `重复加入 ${item.ip} ${stderr}`);
        err && this.getLogger('drop').info('黑名单', `加入黑名单失败 ${item.ip}`);
        stdout && del && ctx.helper.serviceAddSystem(3, `开机检测到黑名单, IP :${item.ip} 禁止时间:${surplus} 秒`);
      }
    }
  },
  parseIpSite(ip) {
    const { ctx } = this;
    const search = ctx.helper.searcher.memorySearchSync(ip);
    const region = search?.region.split('|').filter(item => item) ?? [];
    const cityNo = search?.city ?? '未知城市编号';
    const country = region[0] ?? '未知国家';
    const province = region[2] ?? '未知省份';
    const city = region[3] ?? '未知城市';
    const isp = region[4] ?? '未知网络';
    const fullSite = `${country}-${province}-${city}-${isp}`;
    return {
      country,
      province,
      city,
      cityNo,
      isp,
      fullSite,
    };
  },
  ipMatch: str => str?.match?.(/(\d{1,3}\.){3}\d{1,3}/g) ?? [],
  parseIp(value) {
    const data = value.split(/\s/);
    const connectionTime = `${data[5]} ${data[6]}`;
    const ip = this.ipMatch(data?.[3] ?? '')?.[0];
    return {
      type: data[0] ?? '连接类型未知',
      localIp: data[1] ?? '本地IP未知',
      localPort: data[2] ? parseInt(data[2]) : '本地端口未知',
      remoteIp: ip ?? '远程IP未知',
      remotePort: data[4] ?? '远程端口未知',
      connectionTime: new Date(connectionTime).toString() != 'Invalid Date' ? connectionTime : new Date().Format('yyyy-MM-dd hh:mm:ss'),
    };
  },
  async addIpsCache(item) {
    const { ctx } = this;
    const parseIp = this.parseIp(item);

    const isInips = ctx.helper.isInIpsCache(parseIp.remoteIp);

    if (ctx.helper.isInLogCache(parseIp.remoteIp, parseIp.localPort) || isInips) return;

    const site = this.parseIpSite(parseIp.remoteIp);
    const parse = {
      time: new Date().Format('yyyy-MM-dd hh:mm:ss'),
      type: parseIp.type,
      ip: parseIp.remoteIp,
      port: parseIp.localPort,
      fullSite: site.fullSite,
      site,
    };
    isInips || this.ipsCache.some(item => item.ip == parse.ip) || this.ipsCache.push(parse);
    //过滤连接日志输出,规定时间内已经输出的或加入黑名单内的不再输出
    await ctx.service.access.addAccessLog({ ...parse, site: parse.fullSite });
    ctx.helper.logCachePut(parse.ip, parse.port, parse, this.config?.accessLog?.interval ?? 30);
  },
  async addIpset() {
    const { ctx } = this;
    let success = true;
    const isDrop = await ctx.helper.isCustomDrop();
    isDrop || (success = await ctx.helper.newIpset());
    return success;
  },
  parseIp(value) {
    const { ctx } = this;
    const data = value.split(/\s/);
    const connectionTime = `${data[5]} ${data[6]}`;
    const ip = this.ipMatch(data?.[3] ?? '')?.[0];
    return {
      type: data[0] ?? '连接类型未知',
      localIp: data[1] ?? '本地IP未知',
      localPort: data[2] ? parseInt(data[2]) : '本地端口未知',
      remoteIp: ip ?? '远程IP未知',
      remotePort: data[4] ?? '远程端口未知',
      connectionTime: new Date(connectionTime).toString() != 'Invalid Date' ? connectionTime : ctx.helper.getFormatNowDate(),
    };
  },
  isIpSkip(ip, site) {
    return this.ipInSegment(ip) || site.country.indexOf('保留') != -1 || site == null ? true : false;
  },
  ipInSegment(ip, believeAccess) {
    if (believeAccess.length == 1 && believeAccess[0] == '全部') return true;
    try {
      const iParse = ip.split('.').map(item => parseInt(item));
      const ipIn = believeAccess.some(item => {
        return (
          /\-|\//g.test(item) &&
          item.split('.').every((item, index) => {
            const ipSegment = item.split(/\-|\//).map(item => parseInt(item));
            const ipIn = ipSegment.length == 1 ? ipSegment[0] == iParse[index] : ipSegment[0] <= iParse[index] && iParse[index] <= ipSegment[1];
            return ipIn;
          })
        );
      });
      return ipIn;
    } catch (error) {
      return true;
    }
  },
  async drop(ip, port, fullSite, expirationTime) {
    const { ctx } = this;
    const time = ctx.helper.getFormatNowDate();
    const {
      data: { success, message },
    } = await ctx.service.blacklist.addBlacklist({ ip, port, expirationTime, site: fullSite, time });
    success
      ? ctx.helper.serviceAddSystem(4, `加入黑名单成功, IP :${ip} 封禁时间 ${expirationTime} 秒`)
      : ctx.helper.serviceAddSystem(4, `加入黑名单失败, IP :${ip} ${message}`);
    return true;
  },
  async addRule(item, expirationTime = 259200) {
    const { ctx } = this;
    const { ip, port, fullSite } = item;

    const believeAccess = this.config?.believe?.access ?? [];
    if (this.ipInSegment(ip, believeAccess)) return;

    const { data, equalNull } = await ctx.service.rule.getRule({
      page: 1,
      pageSize: 10000,
    });

    if (equalNull) return;

    for await (let rowItem of data.rows) {
      const ports = rowItem.ports.includes(item.port) || rowItem.ports.length == 0;
      const ips = rowItem.ips.includes(item.ip) || rowItem.ips.length == 0;
      const sites = rowItem.sites.some(site => item.fullSite.indexOf(site) != -1) || rowItem.sites.length == 0;

      const checkRule = async type => {
        if (type) {
          const sitesDisabled = rowItem.sitesDisabled == false || (rowItem.sitesDisabled && sites);
          const ipsDisabled = rowItem.ipsDisabled == false || (rowItem.ipsDisabled && ips);
          const portsDisabled = rowItem.portsDisabled == false || (rowItem.portsDisabled && ports);
          if (sitesDisabled && ipsDisabled && portsDisabled) return true;
        } else {
          const sitesDisabled = rowItem.sitesDisabled && sites;
          const ipsDisabled = rowItem.ipsDisabled && ips;
          const portsDisabled = rowItem.portsDisabled && ports;
          const abroadDisabled = rowItem.abroadDisabled && item.fullSite.indexOf('中国') == -1;
          const limitDisabled = rowItem.limitDisabled;

          if (sitesDisabled || ipsDisabled || portsDisabled || abroadDisabled || limitDisabled) {
            if (limitDisabled) {
              const {
                data: { rows = [] },
                equalNull,
              } = await ctx.service.access.findAllAccessLog({
                ip: item.ip,
                startTime: ctx.helper.getFormatDate(new Date().getTime() - rowItem.limitShield * 60 * 1000),
                endTime: ctx.helper.getFormatNowDate(),
              });

              if (equalNull == false && rows?.[0]?.num - rows?.[rows.length - 1]?.num >= rowItem.limitTotal)
                return await this.drop(ip, port, fullSite, rowItem.shieldTime ?? expirationTime);
            } else return await this.drop(ip, port, fullSite, rowItem.shieldTime ?? expirationTime);
          }
        }
      };
      if (await checkRule(rowItem.unblocked)) return;
    }
  },
  async checkIpsCache() {
    if (this.ipsCache.length == 0) return;
    const item = this.ipsCache[0];
    await this.addRule(item);
    this.ipsCache.splice(0, 1);
    await this.checkIpsCache();
  },
  async serverDidReady() {
    this.server.on('timeout', socket => this.ctx.helper.systemTimeOut());
    this.loader.loadToApp(directory, 'validate');
    await this.startUp();
    this.ctx.helper.systemStart();
    this.messenger.on('netstat', data =>
      this.ctx.runInBackground(async () => {
        for await (let item of data) await this.addIpsCache(item);
      })
    );
  },
  beforeClose() {
    this.ctx = this.createAnonymousContext();
    this.ctx.helper.systemStop();
  },
};

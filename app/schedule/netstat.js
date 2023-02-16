/** @format */
const { exec } = require('child_process');

module.exports = app => {
  return {
    schedule: {
      interval: `${app.config?.firewalld?.duration ?? 1}s`,
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: false,
    },
    async task(ctx) {
      const believeTrust = app.config?.believe?.trust ?? [];
      const skipIp = believeTrust
        .map((item, index) => (index == 0 ? `^(${item.replaceAll('.', `\\.`)})` : `|^(${item.replaceAll('.', '\\.')})`))
        .join('')
        .replace(/\s+/g, '');
      try {
        const response = exec(
          `netstat -ntu | awk '$5!~/${skipIp}/ { print $0}' | grep 'ESTABLISHED' | sed 's/:/ /g' | awk '{ print $1,$4,$5,$6,$7 }'`
        );
        let list = '';
        response.stdout.on('data', data => (list = list + data));
        response.on('close', code => {
          const data = list?.split(/\n{1,}/g) ?? [];
          data?.[data.length - 1] == '' && data.pop();
          ctx.app.messenger.sendToApp('netstat', data);
        });
      } catch (error) {
        ctx.logger.error(error);
      }
    },
  };
};

/** @format */

module.exports = app => {
  return {
    schedule: {
      interval: `${app.config?.clean?.interval ?? 7}d`,
      immediate: false,
      // cron: '0 0 */24 * * *',
      type: 'worker', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      ctx.helper.command(`sh ${ctx.app.baseDir}/shell/clean.sh &`);
    },
  };
};

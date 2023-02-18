/** @format */
module.exports = app => {
  return {
    schedule: {
      interval: `${app.config?.firewalld?.interval ?? 1}m`,
      // interval: `10s`,
      type: 'all',
      immediate: false,
    },
    async task(ctx) {
      try {
        app.checkIpsCache();
      } catch (error) {
        ctx.logger.error(error);
      }
    },
  };
};

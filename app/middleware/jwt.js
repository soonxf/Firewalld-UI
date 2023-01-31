/** @format */

module.exports = options => {
  return async function jwt(ctx, next) {
    const { token, fingerprint = Date.now().toString() } = ctx.request.header;
    try {
      // 解码token
      const { playload } = ctx.helper.jwtVerify(token);

      const json = JSON.parse(playload);

      json.fingerprint == ctx.helper.decrypt(fingerprint, 2)
        ? await next()
        : ctx.helper.response({
            code: 401,
            success: false,
            message: 'fingerprint error',
          });
      console.log('jwt 验签成功:' + json.fingerprint);
    } catch (error) {
      const keys = ['TokenExpiredError', 'JsonWebTokenError'];
      ctx.helper.response({
        code: keys.includes(error.name) ? 401 : 200,
        success: false,
        message: error.errors ?? error.message,
      });
    }
  };
};

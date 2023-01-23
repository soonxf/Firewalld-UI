/** @format */

module.exports = options => {
  return async function jwt(ctx, next) {
    const { token, fingerprint } = ctx.request.header;
    try {
      // 解码token
      const { playload } = ctx.helper.jwtVerify(token);

      const playloadFingerprint = playload.split('|')[1];

      playloadFingerprint == ctx.helper.decrypt(fingerprint, 2)
        ? await next()
        : ctx.helper.response({
            code: 401,
            success: false,
            message: 'fingerprint error',
          });
      console.log('jwt 验签成功:' + playloadFingerprint);
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

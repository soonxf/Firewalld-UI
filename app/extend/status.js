/** @format */

const UnprocessableEntityError = error => {
  const err = error.errors[0];
  return `${err.code} ${err.field} ${err.message}`;
};

const TokenExpiredError = error => {
  const msg = {
    'jwt expired': '验证码过期',
  };
  return msg[error.message];
};

const custom = error => {
  return error.message;
};

const TypeError = error => {
  return error.message;
};

module.exports.custom = custom;
module.exports.UnprocessableEntityError = UnprocessableEntityError;
module.exports.TokenExpiredError = TokenExpiredError;
module.exports.TypeError = TypeError;

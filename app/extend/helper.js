/**
 * @format
 * @Author: doramart
 * @Date: 2019-08-15 14:23:19
 * @Last Modified by: doramart
 * @Last Modified time: 2021-04-18 18:09:06
 */

// require('module-alias/register');

'use strict';
const path = require('path');
const utils = require(path.join(__dirname, './utils'));

module.exports = {
  ...utils,
  async install() {
    return await queryNodeVersion('node -v');
  },
  //响应前端
  response(params) {
    let { data, success, message, code } = params ?? { data: null, success: false, message: '失败', code: 200 };
    data && params != undefined ? (success = true) : params?.success ? (success = true) : (success = false);
    if (data === null || data === undefined || data === NaN || data === 0 || data[0] === 0 || data[0] === 1) data = null;
    Array.isArray(params?.data) && params.data[0] == 0 && (success = false);
    this.ctx.body = {
      code: code ?? 200,
      success,
      message: success ? '成功' : message ?? '失败',
      data,
    };
  },
  //数据库响应查询
  success(data, exclude) {
    return {
      data: data ?? {},
      equalNull: data || !this._.isEmpty(data) ? false : true,
    };
  },
  whereOr(arr) {
    return arr.map(item => {
      return {
        [this.seq.Op.or]: item,
      };
    });
  },
  where(where, condition) {
    let query = {};
    where.length == condition.length
      ? where.forEach((item, index) => {
          if (item && item != null && item != undefined && item != '' && item != 0 && item != '0' && item != false) {
            query = {
              ...query,
              ...condition[index],
            };
          }
        })
      : (query = {});
    return query;
  },
};

/** @format */

'use strict';

const { Controller } = require('egg');
const path = require('path');
const { systemTypes } = require(path.join(__dirname, '../extend/variable.js'));

class OperationController extends Controller {
  async getOperationTypes() {
    const { ctx } = this;
    ctx.helper.response({ data: systemTypes });
  }
}

module.exports = OperationController;

/** @format */

'use strict';
// const stringRandom = require('string-random');
const crypto = require('crypto');
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const User = app.model.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // get() {
        //   return crypto.createHash('md5').update(this.getDataValue('password')).digest('hex');
        // },
        set(value) {
          this.setDataValue('password', crypto.createHash('md5').update(value).digest('hex'));
        },
      },
      secret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      config: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      // MySQL数据库表名
      tableName: 'users',
      // 不使用created_at , updated_at
      timestamps: false,
      defaultScope: {
        dataValues: {
          // 排除密码，不返回密码
          exclude: ['password'],
        },
        attributes: {
          // 排除密码，不返回密码
          exclude: ['password'],
        },
      },
    }
  );
  return User;
};

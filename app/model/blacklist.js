/** @format */

'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  try {
    const Blacklist = app.model.define(
      'blacklist',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        expirationTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expirationTimeFormat: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // expirationTimeFormat: {
        //   type: DataTypes.VIRTUAL,
        //   get() {
        //     // return new Date(new Date(this.time).getTime() + this.expirationTime * 1000).Format('yyyy-MM-dd hh:mm:ss');
        //     return new Date(new Date(this.getDataValue('time')).getTime() + this.getDataValue('expirationTime') * 1000).Format('yyyy-MM-dd hh:mm:ss');
        //   },
        //   set(value) {
        //     throw new Error('不要尝试设置 expirationTimeFormat 的值!');
        //   },
        // },
        time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ip: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        port: {
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        site: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        unblocked: {
          type: DataTypes.VIRTUAL,
          get() {
            return Date.now() - new Date(this.time).getTime() > this.expirationTime * 1000;
          },
          set(value) {
            throw new Error('不要尝试设置 unblocked 的值!');
          },
        },
        unblockedText: {
          type: DataTypes.VIRTUAL,
          get() {
            return this.unblocked ? '允许' : '屏蔽';
          },
          set(value) {
            throw new Error('不要尝试设置 `unblockedText` 的值!');
          },
        },
      },
      {
        // MySQL数据库表名
        tableName: 'blacklists',
        // 不使用created_at , updated_at
        timestamps: false,
      }
    );
    Blacklist.associate = () => {
      Blacklist.belongsTo(app.model.Project, {
        as: 'project',
        foreignKey: 'port',
        targetKey: 'port',
      });
    };
    return Blacklist;
  } catch (error) {}
};

/** @format */

'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Rule = app.model.define(
    'rule',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sort: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      limitShield: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      limitTotal: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unblocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      abroadDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      limitDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      ipsDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      portsDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      sitesDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      shieldTimeDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      shieldTime: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      unblockedText: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('unblocked') ? '允许' : '屏蔽';
          // return this.getDataValue('unblocked') ? '允许' : '屏蔽';
        },
        set(value) {
          throw new Error('不要尝试设置 `unblockedText` 的值!');
        },
      },
      ips: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const ips = this.getDataValue('ips');
          return ips?.split?.(',').filter(item => item != '') ?? [];
        },
        set(value) {
          return this.setDataValue('ips', value.join(','));
        },
      },
      sites: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const sites = this.getDataValue('sites');
          return sites?.split?.(',').filter(item => item != '') ?? [];
        },
        set(value) {
          return this.setDataValue('sites', value.join(','));
        },
      },
      ports: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const ports = this.getDataValue('ports');
          return (
            ports
              ?.split?.(',')
              .filter(item => item != '')
              .map(item => parseInt(item)) ?? []
          );
        },
        set(value) {
          return this.setDataValue('ports', value.join(','));
        },
      },
    },
    {
      // MySQL数据库表名
      tableName: 'rules',
      // 不使用created_at , updated_at
      timestamps: false,
    }
  );
  return Rule;
};

/** @format */

'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Access = app.model.define(
    'access',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
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
      num: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
        // async get() {
        //   return await app.model.Log.count({
        //     where: {
        //       ip: this.ip,
        //     },
        //   });
        // },
      },
      site: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // MySQL数据库表名
      tableName: 'accesss',
      // 不使用created_at , updated_at
      timestamps: false,
    }
  );
  try {
    Access.associate = () => {
      Access.belongsTo(app.model.Project, {
        as: 'project',
        foreignKey: 'port',
        targetKey: 'port',
      });
    };
  } catch (error) {}
  return Access;
};

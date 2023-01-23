/** @format */

'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Project = app.model.define(
    'project',
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
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      port: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // MySQL数据库表名
      tableName: 'projects',
      // 不使用created_at , updated_at
      timestamps: false,
    }
  );
  try {
    Project.associate = () => {
      Project.hasMany(app.model.Access, {
        as: 'access',
        foreignKey: 'port',
        targetKey: 'port',
      });
    };
  } catch (error) {}
  return Project;
};

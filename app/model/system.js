/** @format */

'use strict';

//开机 1,关闭 2,开机加入黑名单 3  新建项目 4,加入黑名单 5,移除 黑名单 6,删除 日志 7,增加规则 8
const types = new Map([
  [0, '启动超时'],
  [1, '启动环境'],
  [2, '关闭环境'],
  [3, '开机黑名单'],
  [4, '加入黑名单'],
  [5, '移除黑名单'],
  [6, '新建项目'],
  [7, '删除项目'],
  [8, '删除日志'],
  [9, '新建规则'],
  [10, '删除规则'],
  [11, '查询开机时间'],
  [12, '防火墙状态'],
]);

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const System = app.model.define(
    'system',
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
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      typeText: {
        type: DataTypes.VIRTUAL,
        get() {
          return types.get(this.type);
        },
        set(value) {
          throw new Error('不要尝试设置 `unblockedText` 的值!');
        },
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // MySQL数据库表名
      tableName: 'systems',
      // 不使用created_at , updated_at
      timestamps: false,
    }
  );

  return System;
};

// const Op = Sequelize.Op

// [Op.and]: {a: 5}           // 且 (a = 5)
// [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 或 a = 6)
// [Op.gt]: 6,                // id > 6
// [Op.gte]: 6,               // id >= 6
// [Op.lt]: 10,               // id < 10
// [Op.lte]: 10,              // id <= 10
// [Op.ne]: 20,               // id != 20
// [Op.eq]: 3,                // = 3
// [Op.not]: true,            // 不是 TRUE
// [Op.between]: [6, 10],     // 在 6 和 10 之间
// [Op.notBetween]: [11, 15], // 不在 11 和 15 之间
// [Op.in]: [1, 2],           // 在 [1, 2] 之中
// [Op.notIn]: [1, 2],        // 不在 [1, 2] 之中
// [Op.like]: '%hat',         // 包含 '%hat'
// [Op.notLike]: '%hat'       // 不包含 '%hat'
// [Op.iLike]: '%hat'         // 包含 '%hat' (不区分大小写)  (仅限 PG)
// [Op.notILike]: '%hat'      // 不包含 '%hat'  (仅限 PG)
// [Op.regexp]: '^[h|a|t]'    // 匹配正则表达式/~ '^[h|a|t]' (仅限 MySQL/PG)
// [Op.notRegexp]: '^[h|a|t]' // 不匹配正则表达式/!~ '^[h|a|t]' (仅限 MySQL/PG)
// [Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (仅限 PG)
// [Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (仅限 PG)
// [Op.like]: { [Op.any]: ['cat', 'hat']} // 包含任何数组['cat', 'hat'] - 同样适用于 iLike 和 notLike
// [Op.overlap]: [1, 2]       // && [1, 2] (PG数组重叠运算符)
// [Op.contains]: [1, 2]      // @> [1, 2] (PG数组包含运算符)
// [Op.contained]: [1, 2]     // <@ [1, 2] (PG数组包含于运算符)
// [Op.any]: [2,3]            // 任何数组[2, 3]::INTEGER (仅限PG)
// [Op.col]: 'user.organization_id' // = 'user'.'organization_id', 使用数据库语言特定的列标识符, 本例使用 PG

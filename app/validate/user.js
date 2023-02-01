/** @format */

module.exports = app => {
  let { validator } = app;
  // 校验用户名是否正确
  validator.addRule('username', (rule, value) => {
    if (/^\d+$/.test(value)) return 'must string';
    if (value.length < 4 || value.length > 10) return '用户名的长度应该在4-10之间';
  });
  // 添加自定义参数校验规则
  validator.addRule('password', (rule, value) => {
    const pass = !/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(value);
    if (pass) return '最少6位,包括至少1个大写字母,1个小写字母,1个数字,!@#$%^&*?其中一个';
  });

  validator.addRule('getbool', (rule, value) => {
    const pass = value == '' || value == 0 || value == '0' || value == null || value == 'null' ? false : true;
    return pass;
  });
};

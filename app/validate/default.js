module.exports = app => {
  let { validator } = app;
  validator.addRule('userdate', (rule, value) => {
    console.log(value);
    return '111111111111111111111';
  });
};

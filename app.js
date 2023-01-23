/** @format */

class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  async serverDidReady() {
    this.app.serverDidReady();
  }
  async beforeClose() {
    this.app.beforeClose();
    // 请将您的 app.beforeClose 中的代码置于此处
  }
}

module.exports = AppBootHook;

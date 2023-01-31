/** @format */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);

  router.get('/captcha', controller.user.captcha);
  router.get('/getPublicKeyFingerprint', controller.user.getPublicKeyFingerprint);
  router.get('/getOperationTypes', controller.operation.getOperationTypes);
  router.post('/updatePass', controller.user.updatePass);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.post('/test', jwt, controller.user.test);
  router.get('/getAccessLog', jwt, controller.access.getAccessLog);
  router.post('/deleteAccessLog', jwt, controller.access.deleteAccessLog);
  router.get('/getBlacklist', jwt, controller.blacklist.getBlacklist);
  router.get('/findBlacklistOne', jwt, controller.blacklist.findBlacklistOne);
  router.post('/addBlacklist', jwt, controller.blacklist.addBlacklist);
  router.post('/addMultipleBlacklists', jwt, controller.blacklist.addMultipleBlacklists);
  router.post('/updateBlacklistOne', jwt, controller.blacklist.updateBlacklistone);
  router.post('/deleteBlacklist', jwt, controller.blacklist.deleteBlacklist);
  router.post('/creatdProject', jwt, controller.project.creatdProject);
  router.get('/getProject', jwt, controller.project.getProject);
  router.post('/updateSortProject', jwt, controller.project.updateSortProject);
  router.post('/updateProject', jwt, controller.project.updateProject);
  router.post('/deleteProject', jwt, controller.project.deleteProject);
  router.get('/getSystem', jwt, controller.system.getSystem);
  router.post('/deleteSystem', jwt, controller.system.deleteSystem);
  router.get('/getOverview', jwt, controller.overview.getOverview);
  router.post('/overviewStartFirewall', jwt, controller.overview.overviewStartFirewall);
  router.post('/overviewStopFirewall', jwt, controller.overview.overviewStopFirewall);
  router.get('/getSettings', jwt, controller.settings.getSettings);
  router.post('/setSettings', jwt, controller.settings.setSettings);
  router.post('/addRule', jwt, controller.rule.addRule);
  router.get('/getRule', jwt, controller.rule.getRule);
  router.post('/updateSortRule', jwt, controller.rule.updateSortRule);
  router.post('/deleteRule', jwt, controller.rule.deleteRule);
};

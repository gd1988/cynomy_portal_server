/**
  * afterloe - cynomy_portal_server/routers/index.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-11 14:28:12
  */
"use strict";

const {resolve} = require("path");
const interceptors = resolve(__dirname, "..", "interceptors");
const [user, workflow, goodses, portal, node] = [require(resolve(__dirname, "user")), require(resolve(__dirname, "workflow")),
  require(resolve(__dirname, "goodses")), require(resolve(__dirname, "portal")), require(resolve(__dirname, "nodeManager"))];
const [authentication] = [require(resolve(interceptors, "authentication"))];

module.exports = _ => {
  /*
   * 节点 模块
   */
  _.post("/node", node.registry);

  /*
   * portal 模块
   */
  _.get("/portal/login", portal.login); // *页面跳转 -> 登录页
  _.get("/portal/home", authentication, portal.home); // *页面跳转 -> 首页
  _.get("/portal/platform", authentication, portal.platform); // *页面跳转 -> 平台
  _.get("/portal/product", authentication, portal.product); // *页面跳转 -> 产品
  _.get("/portal/directory", authentication, portal.directory); // *页面跳转 -> 公共目录

  /*
   *  用户模块
   */
  _.get("/user/list", user.list); // 用户信息列表
  _.get("/user/:mail/loginPermit", user.permit); // 登录申请
  _.post("/user/login", user.login); // 登录

  /*
   *  工作流模块
   */
  _.get("/workflow/list", workflow.list); // 工作流信息列表

  /*
   *  文件系统模块
   */
  _.get("/fs/list", goodses.list); // 更新文件信息列表

  /*
   *  测试：开发者信息
   */
  _.post("/test/echo", function* (next) {
    const {info} = this.request.body;
    process.emit("sendCynomyCommunication", info);
    this.body = this.success("send success");
    return yield next;
  });
  _.post("/test/call", function* (next) {
    const {info} = this.request.body;
    process.emit("sendRemotesInfo", info);
    this.body = this.success("send " + info + "success");
    return yield next;
  });
  _.get("/author", function* (next) {
    this.body = JSON.stringify({
        name: "afterloe",
        mail: "lm6289511@gmail.com",
    });

    return yield next;
  });
};

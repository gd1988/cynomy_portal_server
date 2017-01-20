/**
  * afterloe - cynomy_portal_server/test/workflowService_test.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-19 23:23:55
  */
"use strict";

const [{resolve}, {deepStrictEqual}, co] = [require("path"), require('assert'), require("co")];
const workflowService = require(resolve(__dirname, "..", "services", "workflowService"));

describe("workflowService", () => {

  before(done => {
    co(function* () {
      yield workflowService.cleanDocuments();
    }).then(() => done()).catch(err => done(err));
  });

  describe("#createWorkFlowNode", () => {
    it("normal treatment", done => {
      co(function* () {
        const node = {
          name: "设计"
        };
        const _ = yield workflowService.createWorkFlowNode(node);
        deepStrictEqual(1, _.result.ok);
        done();
      }).catch(err => done(err));
    });

    it("same node can't save to the db", done => {
      co(function* () {
        const node = {
          name: "设计"
        };
        const _ = yield workflowService.createWorkFlowNode(node);
        deepStrictEqual(0, _.result.ok);
        done();
      }).catch(() => done());
    });
  });

  describe("#createWorkFlow", () => {
    it("normal treatment", done => {
      co(function* (){
        const workfolwTemplate = {
          name: "研发设计流程",
          chainNodes: [{
            name: "设计"
          },{
            name: "开发"
          },{
            name: "测试"
          },{
            name: "发布"
          }],
        };

        const _ = yield workflowService.createWorkFlow(workfolwTemplate);
        deepStrictEqual(1, _.result.ok);
        done();
      }).catch(err => done(err));
    });

    it("with same chainNodes items", done => {
      co(function* () {
        const workfolwTemplate = {
          name: "研发设计流程1",
          chainNodes: [{
            name: "设计"
          },{
            name: "开发"
          },{
            name: "测试"
          },{
            name: "开发"
          }],
        };

        const _ = yield workflowService.createWorkFlow(workfolwTemplate);
        deepStrictEqual(0, _.result.ok);

      }).catch(() => done());
    });

    it("with same name template", done => {
      co(function* () {
        const workfolwTemplate = {
          name : "研发设计流程",
          chainNodes: [{
            name: "设计"
          },{
            name: "研发"
          },{
            name: "测试"
          },{
            name: "发布"
          }]
        };
        const _ = yield workflowService.createWorkFlow(workfolwTemplate);
        deepStrictEqual(0, _.result.ok);
      }).catch(() => done());
    });

    it("with no chainNodes items or items length is zero", done => {
      co(function* () {
        const workfolwTemplate = {
          name : "研发设计流程2",
          chainNodes: []
        };
        const _ = yield workflowService.createWorkFlow(workfolwTemplate);
        deepStrictEqual(0, _.result.ok);
      }).catch(() => done());
    });
  });
});

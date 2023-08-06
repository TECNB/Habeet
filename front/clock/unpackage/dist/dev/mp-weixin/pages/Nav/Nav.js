"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
const store_target = require("../../store/target.js");
const _sfc_main = {
  __name: "Nav",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const time = store_time.useTimeStore();
    const tag = store_tag.useTagStore();
    const target = store_target.useTargetStore();
    const state = common_vendor.reactive({
      currentswiper: 0,
      targetNoTime: [],
      targetWithTime: [],
      targetCompleted: [],
      targetExpire: [],
      ifshowButton: true,
      ifshowTargetTaskNull0: false,
      ifshowTargetTaskNull1: false,
      ifshowTargetTaskPAT: false,
      ifshowTargetTaskPATDelete: true,
      index: 0
    });
    const WxLogin = () => {
      common_vendor.index.showLoading({
        title: "微信登录中..."
      });
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: (loginRes) => {
          user.data.code = loginRes.code;
          common_vendor.index.request({
            url: url + "/user/wxLogin",
            method: "POST",
            data: user.data.code,
            success: (res) => {
              user.data.userEmail = res.data.data.openId;
              user.data.userPassword = "Wx";
              user.data.userInfo.push({
                "ifLogin": true
              });
              common_vendor.index.request({
                url: url + "/user/home",
                method: "POST",
                data: user.data.userEmail,
                success: (res2) => {
                  if (res2.data.code != null) {
                    common_vendor.index.request({
                      url: url + "/user/login",
                      method: "POST",
                      data: {
                        userEmail: user.data.userEmail,
                        userPassword: user.data.userPassword
                      },
                      success: (res3) => {
                        user.data.userPassword = "";
                        if (res3.data.code != null) {
                          user.data.point = res3.data.data.point;
                          user.data.completeTarget = res3.data.data.completeTarget;
                          user.data.userName = res3.data.data.userName;
                          user.data.picUrl = res3.data.data.picUrl;
                          user.data.userInfo.push({
                            "userdatauserEmail": user.data.userEmail,
                            "userdatapoint": user.data.point,
                            "userdatacompleteTarget": user.data.completeTarget,
                            "userdatauserName": user.data.userName,
                            "userdatapicUrl": user.data.picUrl
                          });
                        }
                      }
                    });
                    common_vendor.index.request({
                      url: url + "/tag/get",
                      method: "POST",
                      data: user.data.userEmail,
                      success: (res3) => {
                        console.log(res3);
                        tag.data.tagName = res3.data.data[0].tagName;
                        tag.data.tagDescribe = res3.data.data[0].tagDescribe;
                        tag.data.tagPoint = res3.data.data[0].tagPoint;
                        tag.data.tagHour = res3.data.data[0].tagHour;
                        tag.data.tagMinute = res3.data.data[0].tagMinute;
                        user.data.userInfo.push({
                          "tagdatatagName": tag.data.tagName,
                          "tagdatatagDescribe": tag.data.tagDescribe,
                          "tagdatatagPoint": tag.data.tagPoint,
                          "tagdatatagHour": tag.data.tagHour,
                          "tagdatatagMinute": tag.data.tagMinute
                        });
                        time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
                      }
                    });
                    common_vendor.index.request({
                      url: url + "/target/get",
                      method: "POST",
                      data: {
                        userEmail: user.data.userEmail,
                        ifTargetUpdate: 1
                      },
                      success: (res3) => {
                        target.data.deadlineDate = [];
                        for (let i = 0; i < res3.data.data.length; i++) {
                          if (res3.data.data[i].status == 0) {
                            state.targetNoTime.push({
                              "targetName": res3.data.data[i].targetName,
                              "targetDescribe": res3.data.data[i].targetDescribe,
                              "targetPoint": res3.data.data[i].targetPoint,
                              "deadline": res3.data.data[i].deadline,
                              "targetId": res3.data.data[i].targetId
                            });
                          } else if (res3.data.data[i].status == 1) {
                            let deadline = new Date(res3.data.data[i].deadline);
                            if (!target.data.deadlineDate.includes(
                              deadline
                            )) {
                              target.data.deadlineDate.push(
                                deadline
                              );
                            }
                            state.targetWithTime.push({
                              "targetName": res3.data.data[i].targetName,
                              "targetDescribe": res3.data.data[i].targetDescribe,
                              "targetPoint": res3.data.data[i].targetPoint,
                              "deadline": res3.data.data[i].deadline,
                              "targetId": res3.data.data[i].targetId
                            });
                          }
                        }
                        user.data.userInfo.push({
                          "statetargetNoTime": state.targetNoTime,
                          "statetargetWithTime": state.targetWithTime,
                          "targetdatadeadlineDate": target.data.deadlineDate
                        });
                        common_vendor.index.setStorage({
                          key: "userInfo",
                          data: user.data.userInfo
                        });
                        common_vendor.index.hideLoading();
                        common_vendor.index.redirectTo({
                          url: "../../pages/index/Time"
                        });
                      }
                    });
                  } else {
                    common_vendor.index.redirectTo({
                      url: "../../pages/Wx/Wx"
                    });
                    user.data.ifUpdate = 2;
                  }
                }
              });
            }
          });
        }
      });
    };
    const QQLogin = () => {
      common_vendor.index.showToast({
        icon: "none",
        title: "功能开发中"
      });
    };
    const home = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/Home/Home"
      });
    };
    const UserAgreement = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/UserAgreement/UserAgreement"
      });
    };
    const PrivacyPolicy = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/PrivacyPolicy/PrivacyPolicy"
      });
    };
    common_vendor.onMounted(() => {
      user.data.userEmail = "";
      common_vendor.index.getStorage({
        key: "userInfo",
        success: (res) => {
          user.data.userInfo = res.data;
          if (user.data.userInfo[0].ifLogin == true) {
            user.data.completeTarget = res.data[1].userdatacompleteTarget;
            user.data.picUrl = res.data[1].userdatapicUrl;
            user.data.point = res.data[1].userdatapoint;
            user.data.userEmail = res.data[1].userdatauserEmail;
            user.data.userName = res.data[1].userdatauserName;
            tag.data.tagDescribe = res.data[2].tagdatatagDescribe;
            tag.data.tagHour = res.data[2].tagdatatagHour;
            tag.data.tagMinute = res.data[2].tagdatatagMinute;
            tag.data.tagName = res.data[2].tagdatatagName;
            tag.data.tagPoint = res.data[2].tagdatatagPoint;
            state.targetNoTime = res.data[3].statetargetNoTime;
            state.targetWithTime = res.data[3].statetargetWithTime;
            target.data.deadlineDate = res.data[3].targetdatadeadlineDate;
            common_vendor.index.redirectTo({
              url: "../../pages/index/Time"
            });
          }
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_assets._imports_1$1,
        c: common_assets._imports_2$1,
        d: common_assets._imports_3,
        e: common_vendor.o((...args) => _ctx.changeswiper && _ctx.changeswiper(...args)),
        f: state.currentswiper,
        g: common_assets._imports_2$2,
        h: common_vendor.o(home),
        i: common_assets._imports_5,
        j: common_vendor.o(QQLogin),
        k: common_assets._imports_6,
        l: common_vendor.o(WxLogin),
        m: common_vendor.o(UserAgreement),
        n: common_vendor.o(PrivacyPolicy)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Nav/Nav.vue"]]);
wx.createPage(MiniProgramPage);

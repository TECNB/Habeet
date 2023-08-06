"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
const store_target = require("../../store/target.js");
const _sfc_main = {
  __name: "Logo",
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
    common_vendor.onMounted(() => {
      user.data.userEmail = "";
      common_vendor.index.getStorage({
        key: "userInfo",
        success: (res) => {
          console.log(res.data);
          user.data.userInfo = res.data;
          console.log(user.data.userInfo);
          user.data.userEmail = res.data[1].userdatauserEmail;
          getUserInfo(user.data.userInfo);
          common_vendor.index.getStorage({
            key: "userInfo",
            success: (res2) => {
              user.data.completeTarget = res2.data[1].userdatacompleteTarget;
              user.data.picUrl = res2.data[1].userdatapicUrl;
              user.data.point = res2.data[1].userdatapoint;
              user.data.userName = res2.data[1].userdatauserName;
              tag.data.tagDescribe = res2.data[2].tagdatatagDescribe;
              tag.data.tagHour = res2.data[2].tagdatatagHour;
              tag.data.tagMinute = res2.data[2].tagdatatagMinute;
              tag.data.tagName = res2.data[2].tagdatatagName;
              tag.data.tagPoint = res2.data[2].tagdatatagPoint;
              target.data.deadlineDate = res2.data[3].targetdatadeadlineDate;
              setTimeout(() => {
                common_vendor.index.redirectTo({
                  url: "../../pages/index/Time"
                });
              }, 500);
            }
          });
        },
        fail: (res) => {
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "../../pages/Nav/Nav"
            });
          }, 500);
        }
      });
    });
    const getUserInfo = (e) => {
      user.data.userPassword = "Wx";
      common_vendor.index.request({
        url: url + "/user/login",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          userPassword: user.data.userPassword
        },
        success: (res) => {
          user.data.userPassword = "";
          if (res.data.code != null) {
            user.data.point = res.data.data.point;
            user.data.completeTarget = res.data.data.completeTarget;
            user.data.userName = res.data.data.userName;
            user.data.picUrl = res.data.data.picUrl;
            e[1].userdatauserEmail = user.data.userEmail;
            e[1].userdatapoint = user.data.point;
            e[1].userdatacompleteTarget = user.data.completeTarget;
            e[1].userdatauserName = user.data.userName;
            e[1].userdatapicUrl = user.data.picUrl;
          }
        }
      });
      common_vendor.index.request({
        url: url + "/tag/get",
        method: "POST",
        data: user.data.userEmail,
        success: (res) => {
          console.log(res);
          tag.data.tagName = res.data.data[0].tagName;
          tag.data.tagDescribe = res.data.data[0].tagDescribe;
          tag.data.tagPoint = res.data.data[0].tagPoint;
          tag.data.tagHour = res.data.data[0].tagHour;
          tag.data.tagMinute = res.data.data[0].tagMinute;
          e[2].tagdatatagName = tag.data.tagName;
          e[2].tagdatatagDescribe = tag.data.tagDescribe;
          e[2].tagdatatagPoint = tag.data.tagPoint;
          e[2].tagdatatagHour = tag.data.tagHour;
          e[2].tagdatatagMinute = tag.data.tagMinute;
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
        success: (res) => {
          target.data.deadlineDate = [];
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].status == 0) {
              state.targetNoTime.push({
                "targetName": res.data.data[i].targetName,
                "targetDescribe": res.data.data[i].targetDescribe,
                "targetPoint": res.data.data[i].targetPoint,
                "deadline": res.data.data[i].deadline,
                "targetId": res.data.data[i].targetId
              });
            } else if (res.data.data[i].status == 1) {
              let deadline = new Date(res.data.data[i].deadline);
              if (!target.data.deadlineDate.includes(deadline)) {
                target.data.deadlineDate.push(
                  deadline
                );
              }
              state.targetWithTime.push({
                "targetName": res.data.data[i].targetName,
                "targetDescribe": res.data.data[i].targetDescribe,
                "targetPoint": res.data.data[i].targetPoint,
                "deadline": res.data.data[i].deadline,
                "targetId": res.data.data[i].targetId
              });
            }
          }
          e[3].statetargetNoTime = state.targetNoTime;
          e[3].statetargetWithTime = state.targetWithTime;
          e[3].targetdatadeadlineDate = target.data.deadlineDate;
          common_vendor.index.setStorage({
            key: "userInfo",
            data: user.data.userInfo
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Logo/Logo.vue"]]);
wx.createPage(MiniProgramPage);

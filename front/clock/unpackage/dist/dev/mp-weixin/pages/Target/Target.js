"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_user = require("../../store/user.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_target_day2 = common_vendor.resolveComponent("target-day");
  const _easycom_target_nav2 = common_vendor.resolveComponent("target-nav");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_navbar2 + _easycom_target_day2 + _easycom_target_nav2 + _easycom_uni_transition2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_target_day = () => "../../components/target-day/target-day.js";
const _easycom_target_nav = () => "../../components/target-nav/target-nav.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_navbar + _easycom_target_day + _easycom_target_nav + _easycom_uni_transition + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "Target",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const state = common_vendor.reactive({
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
    const target = store_target.useTargetStore();
    if (target.data.Done || target.data.Expire) {
      target.data.ifshowTargetTaskNull0 = false;
      target.data.ifshowTargetTaskNull1 = false;
    }
    common_vendor.onMounted(() => {
      target.data.targetName = "";
      target.data.targetDescribe = "";
      target.data.targetHour = "";
      target.data.deadline = "";
      target.data.targetPoint = 0;
      target.data.ifTargetUpdate = 0;
      common_vendor.index.request({
        url: url + "/target/get",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          ifTargetUpdate: 0
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
                target.data.deadlineDate.push(deadline);
              }
              target.data.dayDiff = [];
              target.data.ifshowDay = [];
              target.data.deadlineDate.forEach((item) => {
                console.log("在这里");
                let currentTime = new Date(target.data.currentTime);
                let timeDiff = item.getTime() - currentTime.getTime();
                let dayDiff = Math.floor(timeDiff / (1e3 * 3600 * 24));
                if (dayDiff > 0) {
                  target.data.ifshowDay.push(true);
                } else if (dayDiff < 0) {
                  const month = item.getMonth() + 1;
                  const date = item.getDate();
                  dayDiff = `${month}.${date}`;
                  target.data.ifshowDay.push(false);
                } else {
                  const hours = item.getHours();
                  const minutes = item.getMinutes();
                  const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`;
                  dayDiff = timeString;
                  target.data.ifshowDay.push(false);
                }
                target.data.dayDiff.push(dayDiff);
              });
              state.targetWithTime.push({
                "targetName": res.data.data[i].targetName,
                "targetDescribe": res.data.data[i].targetDescribe,
                "targetPoint": res.data.data[i].targetPoint,
                "deadline": res.data.data[i].deadline,
                "targetId": res.data.data[i].targetId
              });
              console.log(state.targetWithTime);
            } else if (res.data.data[i].status == 2) {
              state.targetCompleted.push({
                "targetName": res.data.data[i].targetName,
                "targetDescribe": res.data.data[i].targetDescribe,
                "targetPoint": res.data.data[i].targetPoint,
                "deadline": res.data.data[i].deadline,
                "targetId": res.data.data[i].targetId
              });
            } else if (res.data.data[i].status == 3) {
              state.targetExpire.push({
                "targetName": res.data.data[i].targetName,
                "targetDescribe": res.data.data[i].targetDescribe,
                "targetPoint": res.data.data[i].targetPoint,
                "deadline": res.data.data[i].deadline,
                "targetId": res.data.data[i].targetId
              });
            }
          }
          target.data.targetNoTimeLength = state.targetNoTime.length;
          target.data.targetWithTimeLength = state.targetWithTime.length;
          target.data.targetCompletedLength = state.targetCompleted.length;
          target.data.targetExpireLength = state.targetExpire.length;
          if (target.data.Doing == true) {
            target.data.ifshowTargetTaskNull2 = false;
            target.data.ifshowTargetTaskNull3 = false;
            if (target.data.targetNoTimeLength == 0) {
              target.data.ifshowTargetTaskNull0 = true;
            }
            if (target.data.targetWithTimeLength == 0) {
              target.data.ifshowTargetTaskNull1 = true;
            }
          }
          if (target.data.Done == true) {
            target.data.ifshowTargetTaskNull0 = false;
            target.data.ifshowTargetTaskNull1 = false;
            target.data.ifshowTargetTaskNull3 = false;
            if (target.data.targetCompletedLength == 0) {
              target.data.ifshowTargetTaskNull2 = true;
            }
          }
          if (target.data.Expire == true) {
            target.data.ifshowTargetTaskNull0 = false;
            target.data.ifshowTargetTaskNull1 = false;
            target.data.ifshowTargetTaskNull2 = false;
            if (target.data.targetExpireLength == 0) {
              target.data.ifshowTargetTaskNull3 = true;
            }
          }
        }
      });
    });
    const tosaveTargetNoTime = (index) => {
      target.data.targetName = state.targetNoTime[index].targetName;
      target.data.targetDescribe = state.targetNoTime[index].targetDescribe;
      target.data.targetPoint = state.targetNoTime[index].targetPoint;
      target.data.deadline = state.targetNoTime[index].deadline;
      target.data.ifTargetUpdate = 1;
      target.data.targetId = state.targetNoTime[index].targetId;
      common_vendor.index.redirectTo({
        url: "../../pages/TargetCreat/TargetCreat"
      });
    };
    const tosaveTargetWithTime = (index) => {
      target.data.targetName = state.targetWithTime[index].targetName;
      target.data.targetDescribe = state.targetWithTime[index].targetDescribe;
      target.data.targetPoint = state.targetWithTime[index].targetPoint;
      target.data.deadline = state.targetWithTime[index].deadline;
      target.data.ifTargetUpdate = 1;
      target.data.targetId = state.targetWithTime[index].targetId;
      common_vendor.index.redirectTo({
        url: "../../pages/TargetCreat/TargetCreat"
      });
    };
    const tosaveTargetCompleted = (index) => {
      target.data.targetName = state.targetCompleted[index].targetName;
      target.data.targetDescribe = state.targetCompleted[index].targetDescribe;
      target.data.targetPoint = state.targetCompleted[index].targetPoint;
      target.data.deadline = state.targetCompleted[index].deadline;
      target.data.ifTargetUpdate = 1;
      target.data.targetId = state.targetCompleted[index].targetId;
      common_vendor.index.redirectTo({
        url: "../../pages/TargetCreat/TargetCreat"
      });
    };
    const tosaveTargetExpire = (index) => {
      target.data.targetName = state.targetExpire[index].targetName;
      target.data.targetDescribe = state.targetExpire[index].targetDescribe;
      target.data.targetPoint = state.targetExpire[index].targetPoint;
      target.data.deadline = state.targetExpire[index].deadline;
      target.data.ifTargetUpdate = 1;
      target.data.targetId = state.targetExpire[index].targetId;
      common_vendor.index.redirectTo({
        url: "../../pages/TargetCreat/TargetCreat"
      });
    };
    let popup = common_vendor.ref(null);
    let popup2 = common_vendor.ref(null);
    let popup3 = common_vendor.ref(null);
    let popup4 = common_vendor.ref(null);
    const TargetTaskPATDelete = (index) => {
      popup.value.open();
      state.index = index;
    };
    const TargetTaskPATDelete2 = (index) => {
      popup2.value.open();
      state.index = index;
    };
    const TargetTaskPATDelete3 = (index) => {
      popup3.value.open();
      state.index = index;
    };
    const TargetTaskPATDelete4 = (index) => {
      popup4.value.open();
      state.index = index;
    };
    const confirm = () => {
      popup.value.close();
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          targetName: state.targetNoTime[state.index].targetName,
          userEmail: user.data.userEmail,
          ifPoints: 0,
          targetId: state.targetNoTime[state.index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "删除目标"
          });
          target.data.targetNoTimeLength--;
          if (target.data.targetNoTimeLength == 0) {
            target.data.ifshowTargetTaskNull0 = true;
          }
          state.targetNoTime.splice(state.index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const confirm2 = () => {
      popup2.value.close();
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          targetName: state.targetWithTime[state.index].targetName,
          userEmail: user.data.userEmail,
          ifPoints: 0,
          targetId: state.targetWithTime[state.index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "删除目标"
          });
          target.data.targetWithTimeLength--;
          if (target.data.targetWithTimeLength == 0) {
            target.data.ifshowTargetTaskNull1 = true;
          }
          state.targetWithTime.splice(state.index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const confirm3 = () => {
      popup3.value.close();
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          targetName: state.targetCompleted[state.index].targetName,
          userEmail: user.data.userEmail,
          ifPoints: 0,
          targetId: state.targetCompleted[state.index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "删除目标"
          });
          target.data.targetCompletedLength--;
          if (target.data.targetCompletedLength == 0) {
            target.data.ifshowTargetTaskNull2 = true;
          }
          state.targetCompleted.splice(state.index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const confirm4 = () => {
      popup4.value.close();
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          targetName: state.targetExpire[state.index].targetName,
          userEmail: user.data.userEmail,
          ifPoints: 0,
          targetId: state.targetExpire[state.index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "删除目标"
          });
          target.data.targetExpireLength--;
          if (target.data.targetExpireLength == 0) {
            target.data.ifshowTargetTaskNull3 = true;
          }
          state.targetExpire.splice(state.index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const close = () => {
      popup.value.close();
      popup2.value.close();
      popup3.value.close();
      popup4.value.close();
    };
    const targetNoTimeDelete = (index) => {
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          targetName: state.targetNoTime[index].targetName,
          ifPoints: 1,
          targetId: state.targetNoTime[state.index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "完成目标"
          });
          target.data.targetNoTimeLength--;
          target.data.targetCompletedLength++;
          if (target.data.targetNoTimeLength == 0) {
            target.data.ifshowTargetTaskNull0 = true;
          }
          state.targetCompleted.push({
            "targetName": state.targetNoTime[index].targetName,
            "targetDescribe": state.targetNoTime[index].targetDescribe,
            "targetPoint": state.targetNoTime[index].targetPoint,
            "deadline": state.targetNoTime[index].deadline,
            "targetId": state.targetNoTime[index].targetId
          });
          state.targetNoTime.splice(index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const targetWithTimeDelete = (index) => {
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          targetName: state.targetWithTime[index].targetName,
          ifPoints: 1,
          targetId: state.targetWithTime[state.index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "完成目标"
          });
          target.data.targetWithTimeLength--;
          target.data.targetCompletedLength++;
          if (target.data.targetWithTimeLength == 0) {
            target.data.ifshowTargetTaskNull1 = true;
          }
          state.targetCompleted.push({
            "targetName": state.targetWithTime[index].targetName,
            "targetDescribe": state.targetWithTime[index].targetDescribe,
            "targetPoint": state.targetWithTime[index].targetPoint,
            "deadline": state.targetWithTime[index].deadline,
            "targetId": state.targetWithTime[index].targetId
          });
          state.targetWithTime.splice(index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const targetCompletedDelete = (index) => {
      common_vendor.index.showToast({
        icon: "none",
        title: "已经完成啦"
      });
    };
    const targetExpireDelete = (index) => {
      common_vendor.index.showToast({
        icon: "none",
        title: "已经过期啦"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          navbarTo: "/menu/2"
        }),
        b: common_vendor.unref(target).data.Doing
      }, common_vendor.unref(target).data.Doing ? {} : {}, {
        c: common_vendor.unref(target).data.Doing
      }, common_vendor.unref(target).data.Doing ? {
        d: common_vendor.f(state.targetNoTime, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.o(($event) => tosaveTargetNoTime(index), index),
            b: common_vendor.t(item.targetName),
            c: common_vendor.t(item.targetDescribe),
            d: common_vendor.o(($event) => tosaveTargetNoTime(index), index)
          }, common_vendor.unref(target).data.ifshowTargetTaskPAT ? {
            e: common_assets._imports_4,
            f: common_vendor.t(item.targetPoint),
            g: common_vendor.o(($event) => targetNoTimeDelete(index), index)
          } : {}, {
            h: "4accddd1-3-" + i0,
            i: common_vendor.o(($event) => TargetTaskPATDelete(index), index),
            j: "4accddd1-4-" + i0,
            k: index
          });
        }),
        e: common_assets._imports_0$6,
        f: common_vendor.unref(target).data.ifshowTargetTaskPAT,
        g: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPAT
        }),
        h: common_assets._imports_2$4,
        i: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPATDelete
        })
      } : {}, {
        j: common_vendor.unref(target).data.ifshowTargetTaskNull0
      }, common_vendor.unref(target).data.ifshowTargetTaskNull0 ? {
        k: common_assets._imports_0$6
      } : {}, {
        l: common_vendor.unref(target).data.Doing
      }, common_vendor.unref(target).data.Doing ? {} : {}, {
        m: common_vendor.unref(target).data.Doing
      }, common_vendor.unref(target).data.Doing ? {
        n: common_vendor.f(state.targetWithTime, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => tosaveTargetWithTime(index), index),
            b: common_vendor.t(item.targetName),
            c: common_vendor.t(item.targetDescribe),
            d: common_vendor.o(($event) => tosaveTargetWithTime(index), index),
            e: common_vendor.t(item.targetPoint),
            f: common_vendor.o(($event) => targetWithTimeDelete(index), index),
            g: common_vendor.t(common_vendor.unref(target).data.dayDiff[index]),
            h: common_vendor.unref(target).data.ifshowDay[index],
            i: "4accddd1-5-" + i0,
            j: common_vendor.o(($event) => TargetTaskPATDelete2(index), index),
            k: "4accddd1-6-" + i0,
            l: index
          };
        }),
        o: common_assets._imports_0$6,
        p: common_assets._imports_4,
        q: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPAT
        }),
        r: common_assets._imports_2$4,
        s: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPATDelete
        })
      } : {}, {
        t: common_vendor.unref(target).data.ifshowTargetTaskNull1
      }, common_vendor.unref(target).data.ifshowTargetTaskNull1 ? {
        v: common_assets._imports_0$6
      } : {}, {
        w: common_vendor.unref(target).data.Done
      }, common_vendor.unref(target).data.Done ? {} : {}, {
        x: common_vendor.unref(target).data.Done
      }, common_vendor.unref(target).data.Done ? {
        y: common_vendor.f(state.targetCompleted, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => tosaveTargetCompleted(index), index),
            b: common_vendor.t(item.targetName),
            c: common_vendor.t(item.targetDescribe),
            d: common_vendor.o(($event) => tosaveTargetCompleted(index), index),
            e: common_vendor.t(item.targetPoint),
            f: common_vendor.o(($event) => targetCompletedDelete(), index),
            g: "4accddd1-7-" + i0,
            h: common_vendor.o(($event) => TargetTaskPATDelete3(index), index),
            i: "4accddd1-8-" + i0,
            j: index
          };
        }),
        z: common_assets._imports_0$6,
        A: common_assets._imports_4,
        B: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPAT
        }),
        C: common_assets._imports_2$4,
        D: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPATDelete
        })
      } : {}, {
        E: common_vendor.unref(target).data.ifshowTargetTaskNull2
      }, common_vendor.unref(target).data.ifshowTargetTaskNull2 ? {
        F: common_assets._imports_0$6
      } : {}, {
        G: common_vendor.unref(target).data.Expire
      }, common_vendor.unref(target).data.Expire ? {} : {}, {
        H: common_vendor.unref(target).data.Expire
      }, common_vendor.unref(target).data.Expire ? {
        I: common_vendor.f(state.targetExpire, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => tosaveTargetExpire(index), index),
            b: common_vendor.t(item.targetName),
            c: common_vendor.t(item.targetDescribe),
            d: common_vendor.o(($event) => tosaveTargetExpire(index), index),
            e: common_vendor.t(item.targetPoint),
            f: common_vendor.o(($event) => targetExpireDelete(), index),
            g: "4accddd1-9-" + i0,
            h: common_vendor.o(($event) => TargetTaskPATDelete4(index), index),
            i: "4accddd1-10-" + i0,
            j: index
          };
        }),
        J: common_assets._imports_0$6,
        K: common_assets._imports_4,
        L: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPAT
        }),
        M: common_assets._imports_2$4,
        N: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(target).data.ifshowTargetTaskPATDelete
        })
      } : {}, {
        O: common_vendor.unref(target).data.ifshowTargetTaskNull3
      }, common_vendor.unref(target).data.ifshowTargetTaskNull3 ? {
        P: common_assets._imports_0$6
      } : {}, {
        Q: state.ifshowButton
      }, state.ifshowButton ? {
        R: common_assets._imports_3$1
      } : {}, {
        S: common_vendor.o(close),
        T: common_vendor.o(confirm),
        U: common_vendor.p({
          type: "error",
          mode: "base",
          title: "确定要删除吗?",
          content: "删除后将会从您的目标移除数据",
          duration: 2e3,
          ["before-close"]: true
        }),
        V: common_vendor.sr(popup, "4accddd1-11", {
          "k": "popup"
        }),
        W: common_vendor.p({
          type: "dialog"
        }),
        X: common_vendor.o(close),
        Y: common_vendor.o(confirm2),
        Z: common_vendor.p({
          type: "error",
          mode: "base",
          title: "确定要删除吗?",
          content: "删除后将会从您的目标移除数据",
          duration: 2e3,
          ["before-close"]: true
        }),
        aa: common_vendor.sr(popup2, "4accddd1-13", {
          "k": "popup2"
        }),
        ab: common_vendor.p({
          type: "dialog"
        }),
        ac: common_vendor.o(close),
        ad: common_vendor.o(confirm3),
        ae: common_vendor.p({
          type: "error",
          mode: "base",
          title: "确定要删除吗?",
          content: "删除后将会从您的目标移除数据",
          duration: 2e3,
          ["before-close"]: true
        }),
        af: common_vendor.sr(popup3, "4accddd1-15", {
          "k": "popup3"
        }),
        ag: common_vendor.p({
          type: "dialog"
        }),
        ah: common_vendor.o(close),
        ai: common_vendor.o(confirm4),
        aj: common_vendor.p({
          type: "error",
          mode: "base",
          title: "确定要删除吗?",
          content: "删除后将会从您的目标移除数据",
          duration: 2e3,
          ["before-close"]: true
        }),
        ak: common_vendor.sr(popup4, "4accddd1-17", {
          "k": "popup4"
        }),
        al: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Target/Target.vue"]]);
wx.createPage(MiniProgramPage);

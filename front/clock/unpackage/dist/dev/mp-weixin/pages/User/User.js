"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_navbar2 + _easycom_uni_transition2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_transition)();
}
const _sfc_main = {
  __name: "User",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    store_target.useTargetStore();
    store_time.useTimeStore();
    store_tag.useTagStore();
    const state = common_vendor.reactive({
      showtargetMenuDetail: false,
      showtargetArrowUp: true,
      showtargetArrowDown: false,
      UserTimeP: "过去一周",
      UserTimeP1: "过去一天",
      UserTimeP2: "过去一月",
      completeTarget: 0,
      completeTargetRate: 0,
      pointAll: 0,
      pointAverage: 0,
      pointInsistence: 0,
      progress: 0,
      ifUserProgressDP: true,
      ifUserProgressDPNull: false
    });
    common_vendor.index.request({
      url: url + "/pointRecord/get",
      method: "POST",
      data: {
        userEmail: user.data.userEmail,
        userTimeP: state.UserTimeP
      },
      success: (res) => {
        console.log(res);
        state.completeTarget = res.data.data.completeTarget;
        state.completeTargetRate = res.data.data.completeTargetRate;
        state.pointAll = res.data.data.pointAll;
        state.pointAverage = res.data.data.pointAverage;
        state.pointInsistence = res.data.data.pointInsistence;
        state.progress = res.data.data.progress;
        if (res.data.data.ifProgress == 0) {
          state.ifUserProgressDPNull = true;
          state.ifUserProgressDP = false;
        } else {
          state.ifUserProgressDPNull = false;
          state.ifUserProgressDP = true;
        }
      }
    });
    let UserTimeP = "";
    const targetMenuDetail = () => {
      state.showtargetMenuDetail = !state.showtargetMenuDetail;
      state.showtargetArrowUp = !state.showtargetArrowUp;
      state.showtargetArrowDown = !state.showtargetArrowDown;
    };
    const UserTimeP1 = () => {
      state.showtargetMenuDetail = !state.showtargetMenuDetail;
      state.showtargetArrowUp = !state.showtargetArrowUp;
      state.showtargetArrowDown = !state.showtargetArrowDown;
      UserTimeP = state.UserTimeP;
      state.UserTimeP = state.UserTimeP1;
      state.UserTimeP1 = UserTimeP;
      common_vendor.index.request({
        url: url + "/pointRecord/get",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          userTimeP: state.UserTimeP
        },
        success: (res) => {
          console.log(res);
          state.completeTarget = res.data.data.completeTarget;
          state.completeTargetRate = res.data.data.completeTargetRate;
          state.pointAll = res.data.data.pointAll;
          state.pointAverage = res.data.data.pointAverage;
          state.pointInsistence = res.data.data.pointInsistence;
          state.progress = res.data.data.progress;
          if (res.data.data.ifProgress == 0) {
            state.ifUserProgressDPNull = true;
            state.ifUserProgressDP = false;
          } else {
            state.ifUserProgressDPNull = false;
            state.ifUserProgressDP = true;
          }
        }
      });
    };
    const UserTimeP2 = () => {
      state.showtargetMenuDetail = !state.showtargetMenuDetail;
      state.showtargetArrowUp = !state.showtargetArrowUp;
      state.showtargetArrowDown = !state.showtargetArrowDown;
      UserTimeP = state.UserTimeP;
      state.UserTimeP = state.UserTimeP2;
      state.UserTimeP2 = UserTimeP;
      common_vendor.index.request({
        url: url + "/pointRecord/get",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          userTimeP: state.UserTimeP
        },
        success: (res) => {
          console.log(res);
          state.completeTarget = res.data.data.completeTarget;
          state.completeTargetRate = res.data.data.completeTargetRate;
          state.pointAll = res.data.data.pointAll;
          state.pointAverage = res.data.data.pointAverage;
          state.pointInsistence = res.data.data.pointInsistence;
          state.progress = res.data.data.progress;
          if (res.data.data.ifProgress == 0) {
            state.ifUserProgressDPNull = true;
            state.ifUserProgressDP = false;
          } else {
            state.ifUserProgressDPNull = false;
            state.ifUserProgressDP = true;
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          navbarTo: "/menu/5"
        }),
        b: common_vendor.t(state.UserTimeP),
        c: state.showtargetArrowUp
      }, state.showtargetArrowUp ? {
        d: common_assets._imports_0$8,
        e: common_vendor.o(targetMenuDetail)
      } : {}, {
        f: state.showtargetArrowDown
      }, state.showtargetArrowDown ? {
        g: common_assets._imports_1$4,
        h: common_vendor.o(targetMenuDetail)
      } : {}, {
        i: common_vendor.t(state.UserTimeP1),
        j: common_vendor.o(UserTimeP1),
        k: common_vendor.t(state.UserTimeP2),
        l: common_vendor.o(UserTimeP2),
        m: common_vendor.p({
          ["mode-class"]: "fade",
          show: state.showtargetMenuDetail,
          duration: "300"
        }),
        n: common_vendor.t(state.pointAll),
        o: common_assets._imports_4,
        p: common_vendor.t(state.UserTimeP.substr(-2)),
        q: common_assets._imports_3$2,
        r: state.ifUserProgressDP
      }, state.ifUserProgressDP ? {} : {}, {
        s: state.ifUserProgressDPNull
      }, state.ifUserProgressDPNull ? {} : {}, {
        t: common_vendor.t(state.progress),
        v: common_vendor.t(state.UserTimeP.substr(-2)),
        w: common_assets._imports_4$1,
        x: common_vendor.t(state.pointInsistence),
        y: common_assets._imports_5$1,
        z: common_assets._imports_6$1,
        A: common_vendor.t(state.completeTargetRate),
        B: common_assets._imports_5$1,
        C: common_assets._imports_0$7,
        D: common_vendor.t(state.pointAverage),
        E: common_assets._imports_5$1,
        F: common_assets._imports_8,
        G: common_vendor.t(state.completeTarget),
        H: common_assets._imports_5$1,
        I: common_assets._imports_6$1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/User/User.vue"]]);
wx.createPage(MiniProgramPage);

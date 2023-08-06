"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_target_menu2 = common_vendor.resolveComponent("target-menu");
  const _easycom_time_timer2 = common_vendor.resolveComponent("time-timer");
  (_easycom_navbar2 + _easycom_target_menu2 + _easycom_time_timer2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_target_menu = () => "../../components/target-menu/target-menu.js";
const _easycom_time_timer = () => "../../components/time-timer/time-timer.js";
if (!Math) {
  (_easycom_navbar + _easycom_target_menu + _easycom_time_timer)();
}
const _sfc_main = {
  __name: "Time",
  setup(__props) {
    common_vendor.inject("url");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          navbarTo: "/menu/1"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/index/Time.vue"]]);
wx.createPage(MiniProgramPage);

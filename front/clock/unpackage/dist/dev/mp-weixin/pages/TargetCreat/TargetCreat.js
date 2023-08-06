"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_target_creat_menu2 = common_vendor.resolveComponent("target-creat-menu");
  _easycom_target_creat_menu2();
}
const _easycom_target_creat_menu = () => "../../components/target-creat-menu/target-creat-menu.js";
if (!Math) {
  _easycom_target_creat_menu();
}
const _sfc_main = {
  __name: "TargetCreat",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/TargetCreat/TargetCreat.vue"]]);
wx.createPage(MiniProgramPage);

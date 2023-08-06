"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "Setting",
  setup(__props) {
    common_vendor.useRoute();
    common_vendor.useRouter();
    common_vendor.reactive({});
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          navbarTo: "/menu/6"
        }),
        b: common_assets._imports_0$3,
        c: common_assets._imports_1$2,
        d: common_assets._imports_1$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Setting/Setting.vue"]]);
wx.createPage(MiniProgramPage);
